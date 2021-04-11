function t(t) {
    var e = "";
    return 1 == t ? e = "旅行" : 2 == t ? e = "游戏" : 3 == t ? e = "电影" : 4 == t ? e = "音乐" : 5 == t ? e = "读书" : 6 == t ? e = "竞赛" : 7 == t ? e = "运动" : 8 == t ? e = "其他" : 9 == t && (e = "公告"), 
    e;
}

require("../../utils/common.js");

var e = require("../../utils/bmob.js"), i = require("../../utils/util.js"), a = getApp(), n = 0, s = wx.getStorageSync("my_nick"), o = wx.getStorageSync("my_sex"), c = wx.getStorageSync("my_avatar");

Page({
    data: {
        my_nick: s,
        my_sex: o,
        my_avatar: c,
        userInfo: [],
        dialog: !1,
        autoplay: !1,
        ui: {
            windowWidth: 0,
            menuWidth: 0,
            offsetLeft: 0,
            tStart: !0
        },
        buttonClicked: !1,
        postsList: [],
        postsShowSwiperList: [],
        currentPage: 0,
        limitPage: 3,
        isEmpty: !1,
        totalCount: 0,
        endPage: 0,
        totalPage: 0,
        curIndex: 0,
        windowHeight1: 0,
        windowWidth1: 0
    },
    onSwiperChange: function(t) {
        n = t.detail.current, this.changeCurIndex();
    },
    changeCurIndex: function() {
        this.setData({
            curIndex: n
        });
    },
    onHide: function() {
        this.setData({
            autoplay: !1
        });
    },
    gotoMap: function() {
        this.buttonClicked || (i.buttonClicked(this), wx.navigateTo({
            url: "/pages/showinmap/showinmap"
        }));
    },
    onLoad: function(t) {
        try {
            var e = wx.getSystemInfoSync();
            this.windowWidth = e.windowWidth, this.data.ui.menuWidth = .82 * this.windowWidth, 
            this.data.ui.offsetLeft = 0, this.data.ui.windowWidth = e.windowWidth, this.setData({
                ui: this.data.ui
            });
        } catch (t) {}
    },
    onShow: function(t) {
        var e = this;
        this.getAll(), this.fetchTopThreePosts(), console.log("加载头像");
        var i = this;
        a.getUserInfo(function(t) {
            i.setData({
                userInfo: t
            });
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    windowHeight1: t.windowHeight,
                    windowWidth1: t.windowWidth,
                    autoplay: !0
                });
            }
        });
    },
    onSetData: function(t) {
        console.log(t.length);
        var e = this.data.currentPage + 1;
        t = t || [], this.setData({
            postsList: 1 === e || void 0 === e ? t : this.data.postsList.concat(t)
        }), console.log(this.data.postsList, e);
    },
    getAll: function() {
        self = this;
        var t = e.Object.extend("Events"), i = new e.Query(t);
        i.equalTo("isShow", 1), i.count({
            success: function(t) {
                var e = 0, i = 0;
                if (t % self.data.limitPage == 0) e = parseInt(t / self.data.limitPage); else {
                    var a = parseInt(t / self.data.limitPage);
                    i = t - a * self.data.limitPage, e = a + 1;
                }
                self.setData({
                    totalCount: t,
                    endPage: i,
                    totalPage: e
                }), console.log("共有" + t + " 条记录"), console.log("共有" + e + "页"), console.log("最后一页加载" + i + "条");
            }
        });
    },
    fetchTopThreePosts: function() {
        var t = this, a = new Array(), n = e.Object.extend("Events"), s = new e.Query(n);
        s.equalTo("isShow", 1), s.descending("likenum"), s.include("publisher"), s.limit(3), 
        s.find({
            success: function(e) {
                for (var n = 0; n < e.length; n++) {
                    var s, o = e[n].get("publisher").objectId, c = e[n].get("title"), u = e[n].get("content"), r = e[n].get("acttype"), d = e[n].get("isShow"), l = e[n].get("endtime"), h = e[n].get("address"), g = e[n].get("addressdetail"), f = e[n].get("peoplenum"), m = e[n].get("likenum"), p = (e[n].get("liker"), 
                    e[n].get("commentnum")), w = e[n].id, b = e[n].createdAt, y = i.getDateDiff(b);
                    s = e[n].get("actpic") ? e[n].get("actpic")._url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png";
                    var k, v = e[n].get("publisher").nickname, P = e[n].get("publisher").userPic;
                    k = {
                        title: c || "",
                        content: u || "",
                        acttype: r || "",
                        isShow: d,
                        endtime: l || "",
                        address: h || "",
                        addressdetail: g || "",
                        peoplenum: f || "",
                        id: w || "",
                        publisherPic: P || "",
                        publisherName: v || "",
                        publisherId: o || "",
                        pubtime: y || "",
                        actPic: s || "",
                        likenum: m,
                        commentnum: p,
                        is_liked: ""
                    }, a.push(k);
                }
                t.setData({
                    postsShowSwiperList: a
                }), t.fetchPostsData(t.data);
            },
            error: function(t) {
                console.log(t);
            }
        });
    },
    fetchPostsData: function(a) {
        var n = this, s = new Array(), o = e.Object.extend("Events"), c = new e.Query(o);
        c.equalTo("isShow", 1), c.limit(n.data.limitPage), console.log(n.data.limitPage), 
        c.skip(3 * n.data.currentPage), c.descending("createdAt"), c.include("publisher"), 
        c.find({
            success: function(e) {
                for (var a = 0; a < e.length; a++) {
                    var o, c = e[a].get("publisher").objectId, u = e[a].get("title"), r = e[a].get("content"), d = e[a].get("acttype"), l = e[a].get("endtime"), h = e[a].get("address"), g = t(d), f = e[a].get("isShow"), m = e[a].get("peoplenum"), p = e[a].get("likenum"), w = (e[a].get("liker"), 
                    e[a].get("commentnum")), b = e[a].id, y = e[a].createdAt, k = i.getDateDiff(y);
                    o = e[a].get("actpic") ? e[a].get("actpic")._url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png";
                    var v, P = e[a].get("publisher").nickname, S = e[a].get("publisher").userPic;
                    v = {
                        title: u || "",
                        content: r || "",
                        acttype: d || "",
                        acttypename: g || "",
                        isShow: f,
                        endtime: l || "",
                        address: h || "",
                        peoplenum: m || "",
                        id: b || "",
                        publisherPic: S || "",
                        publisherName: P || "",
                        publisherId: c || "",
                        pubtime: k || "",
                        actPic: o || "",
                        likenum: p,
                        commentnum: w,
                        is_liked: ""
                    }, s.push(v);
                }
                n.onSetData(s, n.data.currentPage), setTimeout(function() {
                    wx.hideLoading();
                }, 900);
            },
            error: function(t) {
                console.log(t);
            }
        });
    },
    loadMore: function() {
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), setTimeout(function() {
            wx.hideLoading();
        }, 1e3);
        var t = this;
        t.setData({
            currentPage: t.data.currentPage + 1
        }), console.log("当前页" + t.data.currentPage), t.data.currentPage + 1 == t.data.totalPage ? (t.setData({
            isEmpty: !0
        }), 0 != t.data.endPage && t.setData({
            limitPage: t.data.endPage
        }), this.fetchPostsData(t.data)) : this.fetchPostsData(t.data);
    },
    refresh: function() {
        this.setData({
            postsList: [],
            postsShowSwiperList: [],
            currentPage: 0,
            limitPage: 3,
            isEmpty: !1,
            totalCount: 0,
            endPage: 0,
            totalPage: 0,
            curIndex: 0,
            windowHeight1: 0,
            windowWidth1: 0
        }), this.onShow();
    },
    click_activity: function(t) {
        if (!this.buttonClicked) {
            i.buttonClicked(this);
            var e = t.currentTarget.dataset.actid, a = t.currentTarget.dataset.pubid;
            wx.getStorageSync("user_key");
            wx.navigateTo({
                url: "/pages/detail/detail?actid=" + e + "&pubid=" + a
            });
        }
    },
    click_search: function() {
        this.buttonClicked || (i.buttonClicked(this), console.log(getCurrentPages()), wx.navigateTo({
            url: "/pages/search/search"
        }));
    },
    click_myLaunch: function() {
        this.buttonClicked || (i.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/mylaunch/mylaunch"
        }));
    },
    click_myJoin: function() {
        this.buttonClicked || (i.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/myjoin/myjoin"
        }));
    },
    click_myCollection: function() {
        this.buttonClicked || (i.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/mycollection/mycollection"
        }));
    },
    click_projectBrief: function() {
        this.buttonClicked || (i.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/projectbrief/projectbrief"
        }));
    },
    click_Tick: function() {
        this.buttonClicked || (i.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/issues/issues"
        }));
    },
    click_more: function() {
        this.buttonClicked || (i.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/more/more"
        }));
    },
    click_aboutUs: function() {
        this.buttonClicked || (i.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/aboutus/aboutus"
        }));
    },
    handlerStart: function(t) {
        var e = t.touches[0], i = e.clientX, a = e.clientY;
        this.tapStartX = i, this.tapStartY = a, this.tapStartTime = t.timeStamp, this.startX = i, 
        this.data.ui.tStart = !0, this.setData({
            ui: this.data.ui
        });
    },
    handlerMove: function(t) {
        var e = t.touches[0].clientX, i = this.data.ui, a = this.startX - e;
        this.startX = e, i.offsetLeft -= a, i.offsetLeft <= 0 ? i.offsetLeft = 0 : i.offsetLeft >= i.menuWidth && (i.offsetLeft = i.menuWidth), 
        this.setData({
            ui: i
        });
    },
    handlerCancel: function(t) {},
    handlerEnd: function(t) {
        this.data.ui.tStart = !1, this.setData({
            ui: this.data.ui
        });
        var e = this.data.ui, i = t.changedTouches[0], a = i.clientX, n = i.clientY;
        t.timeStamp - this.tapStartTime <= 300 ? this.tapStartX - a > 5 ? e.offsetLeft = 0 : this.tapStartX - a < -5 && Math.abs(this.tapStartY - n) < 50 ? e.offsetLeft = e.menuWidth : e.offsetLeft >= e.menuWidth / 2 ? e.offsetLeft = e.menuWidth : e.offsetLeft = 0 : e.offsetLeft >= e.menuWidth / 2 ? e.offsetLeft = e.menuWidth : e.offsetLeft = 0, 
        this.setData({
            ui: e
        });
    },
    handlerPageTap: function(t) {
        var e = this.data.ui;
        0 != e.offsetLeft && (e.offsetLeft = 0, this.setData({
            ui: e
        }));
    },
    handlerAvatarTap: function(t) {
        var e = this.data.ui;
        0 == e.offsetLeft && (e.offsetLeft = e.menuWidth, this.setData({
            ui: e
        }));
    }
});