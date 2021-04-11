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
    onLoad: function() {},
    onSetData: function(t) {
        var e = this.data.currentPage + 1;
        t = t || [], this.setData({
            postsList: 1 === e || void 0 === e ? t : this.data.postsList.concat(t)
        });
    },
    getAll: function() {
        self = this;
        var e = t.Object.extend("Favos"), a = new t.Query(e);
        a.equalTo("favor", wx.getStorageSync("user_id")), a.count({
            success: function(t) {
                var e = 0, a = 0;
                if (t % self.data.limitPage == 0) e = parseInt(t / self.data.limitPage); else {
                    var n = parseInt(t / self.data.limitPage);
                    a = t - n * self.data.limitPage, e = n + 1;
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
    fetchPostsData: function(a, n) {
        var i = this, s = new Array(), o = t.Object.extend("Favos"), c = new t.Query(o);
        c.limit(i.data.limitPage), c.skip(3 * i.data.currentPage), c.equalTo("favor", wx.getStorageSync("user_id")), 
        c.include("event"), c.descending("createAt"), c.include("favor"), c.find({
            success: function(t) {
                for (var a = 0; a < t.length; a++) {
                    var n, o = t[a].get("event").publisher.objectId, c = t[a].get("event").title, r = t[a].get("event").content, g = t[a].get("event").acttype, l = t[a].get("event").endtime, u = t[a].get("event").address, d = t[a].get("event").acttypename, m = t[a].get("event").peoplenum, v = t[a].get("event").likenum, f = (t[a].get("event").liker, 
                    t[a].get("event").commentnum), p = t[a].get("event").objectId, P = t[a].createdAt, h = e.getDateDiff(P), b = t[a].get("favor").nickname, y = t[a].get("favor").userPic;
                    n = t[a].get("event").actpic ? t[a].get("event").actpic.url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png";
                    var D;
                    D = {
                        title: c || "",
                        content: r || "",
                        acttype: g || "",
                        acttypename: d || "",
                        endtime: l || "",
                        address: u || "",
                        peoplenum: m || "",
                        id: p || "",
                        publisherPic: y || "",
                        publisherName: b || "",
                        publisherId: o || "",
                        pubtime: h || "",
                        actPic: n || "",
                        likenum: v,
                        commentnum: f,
                        is_liked: ""
                    }, s.push(D);
                }
                i.onSetData(s, i.data.currentPage), setTimeout(function() {
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
    onShow: function() {
        this.getAll(), this.fetchPostsData();
    },
    click_activity: function(t) {
        var e = t.currentTarget.dataset.actid, a = t.currentTarget.dataset.pubid;
        wx.getStorageSync("user_key");
        wx.navigateTo({
            url: "/pages/detail/detail?actid=" + e + "&pubid=" + a
        });
    }
});