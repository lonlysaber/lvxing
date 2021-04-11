require("../../../utils/common.js");

var t = require("../../../utils/bmob.js"), e = require("../../../utils/util.js");

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
    onSetData: function(t) {
        var e = this.data.currentPage + 1;
        t = t || [], this.setData({
            postsList: 1 === e || void 0 === e ? t : this.data.postsList.concat(t)
        });
    },
    getAll: function() {
        self = this;
        var e = t.Object.extend("Events"), a = new t.Query(e);
        a.equalTo("publisher", wx.getStorageSync("user_id")), a.count({
            success: function(t) {
                var e = 0, a = 0;
                if (t % self.data.limitPage == 0) e = parseInt(t / self.data.limitPage); else {
                    var i = parseInt(t / self.data.limitPage);
                    a = t - i * self.data.limitPage, e = i + 1;
                }
                self.setData({
                    totalCount: t,
                    endPage: a,
                    totalPage: e
                }), self.data.currentPage + 1 == self.data.totalPage && self.setData({
                    isEmpty: !0
                }), console.log("共有" + t + " 条记录"), console.log("共有" + e + "页"), console.log("最后一页加载" + a + "条");
            }
        });
    },
    fetchPostsData: function(a, i) {
        var s = this, n = new Array(), o = t.Object.extend("Events"), c = new t.Query(o);
        c.limit(s.data.limitPage), c.skip(3 * s.data.currentPage), c.equalTo("publisher", wx.getStorageSync("user_id")), 
        c.descending("createAt"), c.include("publisher"), c.find({
            success: function(t) {
                for (var a = 0; a < t.length; a++) {
                    var i, o = t[a].get("publisher").objectId, c = t[a].get("title"), r = t[a].get("content"), l = t[a].get("acttype"), u = t[a].get("endtime"), g = t[a].get("address"), d = t[a].get("acttypename"), p = t[a].get("peoplenum"), m = t[a].get("likenum"), P = (t[a].get("liker"), 
                    t[a].get("commentnum")), f = t[a].id, h = t[a].createdAt, b = e.getDateDiff(h), v = t[a].get("publisher").nickname, y = t[a].get("publisher").userPic;
                    i = t[a].get("actpic") ? t[a].get("actpic").url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png";
                    var D;
                    D = {
                        title: c || "",
                        content: r || "",
                        acttype: l || "",
                        acttypename: d || "",
                        endtime: u || "",
                        address: g || "",
                        peoplenum: p || "",
                        id: f || "",
                        publisherPic: y || "",
                        publisherName: v || "",
                        publisherId: o || "",
                        pubtime: b || "",
                        actPic: i || "",
                        likenum: m,
                        commentnum: P,
                        is_liked: ""
                    }, n.push(D);
                }
                s.onSetData(n, s.data.currentPage), setTimeout(function() {
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
    onShow: function() {},
    click_activity: function(t) {
        var e = t.currentTarget.dataset.actid, a = t.currentTarget.dataset.pubid;
        wx.getStorageSync("user_key");
        wx.navigateTo({
            url: "/pages/detail/detail?actid=" + e + "&pubid=" + a
        });
    }
});