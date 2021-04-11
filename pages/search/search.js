function t(t) {
    var e = "";
    return 1 == t ? e = "运动" : 2 == t ? e = "游戏" : 3 == t ? e = "交友" : 4 == t ? e = "旅行" : 5 == t ? e = "读书" : 6 == t ? e = "竞赛" : 7 == t ? e = "电影" : 8 == t ? e = "音乐" : 9 == t && (e = "其他"), 
    e;
}

var e, a, i = require("../../wxSearch/wxSearch.js"), s = require("../../utils/common.js"), r = require("../../utils/bmob.js"), n = require("../../utils/util.js");

getApp();

Page({
    data: {
        buttonClicked: !1,
        tradeType: 0,
        moodList: [],
        isEmpty: !0,
        loading: !1
    },
    choseTradeType: function(t) {
        var e = t.currentTarget.id;
        0 == e ? this.onShow() : 1 == e ? this.setData({
            moodList: this.data.sportList
        }) : 2 == e ? this.setData({
            moodList: this.data.gameList
        }) : 3 == e ? this.setData({
            moodList: this.data.friendList
        }) : 4 == e ? this.setData({
            moodList: this.data.travelList
        }) : 5 == e ? this.setData({
            moodList: this.data.readList
        }) : 6 == e ? this.setData({
            moodList: this.data.contestlist
        }) : 7 == e ? this.setData({
            moodList: this.data.movieList
        }) : 8 == e ? this.setData({
            moodList: this.data.musicList
        }) : 9 == e && this.setData({
            moodList: this.data.otherList
        }), this.setData({
            tradeType: e
        });
    },
    onLoad: function() {
        e = this, i.init(e, 43, [ "一起", "上自习", "开黑组队", "找驴友", "晚上去嗨", "约步走起" ]), i.initMindKeys([ "一起", "上自习", "开黑组队", "找驴友", "晚上去嗨", "约步走起" ]);
    },
    onShow: function() {
        e.setData({
            loading: !1
        });
        var i = new Array(), o = r.Object.extend("Events"), c = new r.Query(o);
        c.equalTo("isShow", 1), c.descending("createdAt"), c.include("publisher"), c.find({
            success: function(s) {
                for (I = 0; I < s.length; I++) {
                    var r, o = s[I].get("publisher").objectId, c = s[I].get("title"), u = s[I].get("content"), d = s[I].get("acttype"), h = s[I].get("isShow"), l = s[I].get("endtime"), p = s[I].get("address"), g = t(d), m = s[I].get("peoplenum"), w = s[I].get("likenum"), y = (s[I].get("liker"), 
                    s[I].get("commentnum")), L = s[I].id, v = s[I].createdAt, f = n.getDateDiff(v);
                    r = s[I].get("actpic") ? s[I].get("actpic")._url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png";
                    var S, x = s[I].get("publisher").nickname, b = s[I].get("publisher").userPic;
                    S = {
                        title: c || "",
                        content: u || "",
                        acttype: d || "",
                        isShow: h,
                        acttypename: g || "",
                        endtime: l || "",
                        address: p || "",
                        peoplenum: m || "",
                        id: L || "",
                        publisherPic: b || "",
                        publisherName: x || "",
                        publisherId: o || "",
                        pubtime: f || "",
                        actPic: r || "",
                        likenum: w,
                        commentnum: y,
                        is_liked: ""
                    }, i.push(S), a = i;
                    var D = new Array(), A = new Array(), T = new Array(), k = new Array(), K = new Array(), j = new Array(), P = new Array(), q = new Array(), C = new Array();
                    for (var I in i) 1 == i[I].acttype ? D.push(i[I]) : 2 == i[I].acttype ? A.push(i[I]) : 3 == i[I].acttype ? T.push(i[I]) : 4 == i[I].acttype ? k.push(i[I]) : 5 == i[I].acttype ? K.push(i[I]) : 6 == i[I].acttype ? j.push(i[I]) : 7 == i[I].acttype ? P.push(i[I]) : 8 == i[I].acttype ? q.push(i[I]) : 9 == i[I].acttype && C.push(i[I]);
                    e.setData({
                        moodList: i,
                        sportList: D,
                        gameList: A,
                        friendList: T,
                        travelList: k,
                        readList: K,
                        contestlist: j,
                        movieList: P,
                        musicList: q,
                        otherList: C
                    });
                }
            },
            error: function(t) {
                s.dataLoading(t, "loading"), console.log(t);
            }
        });
    },
    findEach: function(t) {
        var e = this;
        i.wxSearchAddHisKey(e);
        var s = e.data.wxSearchData.value;
        if (console.log("strFind=" + s), null != s && "" != s || wx.showToast({
            title: "输入为空",
            icon: "loading"
        }), "" != s) {
            i.updateHotMindKeys(e, s);
            var r = [];
            for (var n in a) (a[n].title || "").indexOf(s) >= 0 && r.push(a[n]);
            e.setData({
                moodList: r
            });
        }
    },
    click_activity: function(t) {
        if (console.log(getCurrentPages()), !this.buttonClicked) {
            n.buttonClicked(this);
            var e = t.currentTarget.dataset.actid, a = t.currentTarget.dataset.pubid;
            wx.getStorageSync("user_key");
            wx.navigateTo({
                url: "/pages/detail/detail?actid=" + e + "&pubid=" + a
            });
        }
    },
    wxSearchInput: function(t) {
        var e = this;
        i.wxSearchInput(t, e);
    },
    wxSerchFocus: function(t) {
        var e = this;
        i.wxSearchFocus(t, e);
    },
    wxSearchBlur: function(t) {
        var e = this;
        i.wxSearchBlur(t, e);
    },
    wxSearchKeyTap: function(t) {
        var e = this;
        i.wxSearchKeyTap(t, e);
    },
    wxSearchDeleteKey: function(t) {
        var e = this;
        i.wxSearchDeleteKey(t, e);
    },
    wxSearchDeleteAll: function(t) {
        var e = this;
        i.wxSearchDeleteAll(e);
    },
    wxSearchTap: function(t) {
        var e = this;
        i.wxSearchHiddenPancel(e);
    }
});