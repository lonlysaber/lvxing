require("../../../utils/common.js");

var e = require("../../../utils/bmob.js"), t = require("../../../utils/util.js");

getApp();

Page({
    data: {
        postsList: [],
        currentPage: 0,
        limitPage: 3,
        isEmpty: !1,
        totalCount: 0,
        endPage: 0,
        totalPage: 0
    },
    onLoad: function() {
        this.getAll(), this.fetchPostsData();
    },
    onSetData: function(e) {
        var t = this.data.currentPage + 1;
        e = e || [], this.setData({
            postsList: 1 === t || void 0 === t ? e : this.data.postsList.concat(e)
        });
    },
    getAll: function() {
        self = this;
        var t = e.Object.extend("Contacts"), a = new e.Query(t);
        a.equalTo("currentUser", wx.getStorageSync("user_id")), a.count({
            success: function(e) {
                var t = 0, a = 0;
                if (e % self.data.limitPage == 0) t = parseInt(e / self.data.limitPage); else {
                    var n = parseInt(e / self.data.limitPage);
                    a = e - n * self.data.limitPage, t = n + 1;
                }
                self.setData({
                    totalCount: e,
                    endPage: a,
                    totalPage: t
                }), self.data.currentPage + 1 == self.data.totalPage && self.setData({
                    isEmpty: !0
                }), console.log("共有" + e + " 条记录"), console.log("共有" + t + "页"), console.log("最后一页加载" + a + "条");
            }
        });
    },
    fetchPostsData: function(a, n) {
        var i = this, s = new Array(), o = e.Object.extend("Contacts"), c = new e.Query(o);
        c.limit(i.data.limitPage), c.skip(3 * i.data.currentPage), c.equalTo("currentUser", wx.getStorageSync("user_id")), 
        c.include("event"), c.descending("createAt"), c.include("publisher"), c.find({
            success: function(e) {
                for (var a = 0; a < e.length; a++) {
                    var n, o = e[a].get("publisher").objectId, c = e[a].get("event").title, r = e[a].get("event").content, l = e[a].get("event").acttype, u = e[a].get("event").endtime, g = e[a].get("event").address, d = e[a].get("event").acttypename, m = e[a].get("event").peoplenum, p = e[a].get("event").likenum, P = (e[a].get("event").liker, 
                    e[a].get("event").commentnum), f = e[a].get("event").objectId, h = e[a].createdAt, v = t.getDateDiff(h), b = e[a].get("publisher").nickname, y = e[a].get("publisher").userPic;
                    n = e[a].get("event").actpic ? e[a].get("event").actpic.url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png";
                    var D;
                    D = {
                        title: c || "",
                        content: r || "",
                        acttype: l || "",
                        acttypename: d || "",
                        endtime: u || "",
                        address: g || "",
                        peoplenum: m || "",
                        id: f || "",
                        publisherPic: y || "",
                        publisherName: b || "",
                        publisherId: o || "",
                        pubtime: v || "",
                        actPic: n || "",
                        likenum: p,
                        commentnum: P,
                        is_liked: ""
                    }, s.push(D), console.log(s);
                }
                i.onSetData(s, i.data.currentPage), setTimeout(function() {
                    wx.hideLoading();
                }, 900);
            },
            error: function(e) {
                console.log(e);
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
        var e = this;
        e.setData({
            currentPage: e.data.currentPage + 1
        }), console.log("当前页" + e.data.currentPage), e.data.currentPage + 1 == e.data.totalPage ? (e.setData({
            isEmpty: !0
        }), 0 != e.data.endPage && e.setData({
            limitPage: e.data.endPage
        }), this.fetchPostsData(e.data)) : this.fetchPostsData(e.data);
    },
    onShow: function() {},
    click_activity: function(e) {
        var t = e.currentTarget.dataset.actid, a = e.currentTarget.dataset.pubid;
        wx.getStorageSync("user_key");
        wx.navigateTo({
            url: "/pages/detail/detail?actid=" + t + "&pubid=" + a
        });
    }
});