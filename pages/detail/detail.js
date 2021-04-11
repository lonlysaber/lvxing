function e(e) {
    var t = 0;
    return "微信号" == e ? t = 0 : "QQ号" == e ? t = 1 : "手机号" == e && (t = 2), t;
}

function t(e) {
    var t = "";
    return 1 == e ? t = "运动" : 2 == e ? t = "游戏" : 3 == e ? t = "交友" : 4 == e ? t = "旅行" : 5 == e ? t = "读书" : 6 == e ? t = "竞赛" : 7 == e ? t = "电影" : 8 == e ? t = "音乐" : 9 == e && (t = "其他"), 
    t;
}

var n, a, o, s, i, c, r, u, l = require("../../components/wux"), d = require("../template/getCode.js"), g = require("../../utils/bmob.js"), f = require("../../utils/util.js"), v = (getApp(), 
void 0);

Page({
    data: {
        accounts: [ "微信号", "QQ号", "手机号" ],
        accountIndex: 0,
        actStatusArray: [ "准备中", "进行中", "已结束" ],
        statusIndex: 0,
        realname: "",
        contactValue: "",
        showTopTips: !1,
        TopTips: "",
        linkmainHe: !1,
        linkjoinHe: !1,
        tag_select: 0,
        limit: 5,
        showImage: !1,
        loading: !1,
        isdisabled: !1,
        commentLoading: !1,
        isdisabled1: !1,
        recommentLoading: !1,
        commentList: [],
        joinList: [],
        likerList: [],
        agree: 0,
        favo: 0,
        join: 0,
        isMe: !1,
        isToResponse: !1,
        status: 0,
        adminId: "",
        adminname: "",
        adcontactWay: "",
        adcontactValue: "",
        showCommentDialog: !1,
        commentInputHolder: "请输入评论内容",
        index: 2,
        opened: !1,
        style_img: ""
    },
    showQrcode: function() {
        var e = "/pages/detail/detail?actid=" + a + "&pubid=" + o, t = this;
        g.generateCode({
            path: e,
            width: 40
        }).then(function(e) {
            console.log(e), t.setData({
                imageBytes: e.imageBytes,
                codeHehe: !0
            });
        }, function(e) {
            d.showTip("生成二维码失败" + e);
        });
    },
    closeCode: function() {
        this.setData({
            codeHehe: !1
        });
    },
    showqrcode: function() {
        this.setData({
            qrcodeHe: !0
        });
    },
    closeqrcode: function() {
        this.setData({
            qrcodeHe: !1
        });
    },
    showmainLink: function() {
        this.setData({
            linkmainHe: !0
        });
    },
    closemainLink: function() {
        this.setData({
            linkmainHe: !1
        });
    },
    showjoinLink: function(e) {
        var t = e.currentTarget.dataset.id;
        n.setData({
            currJoinId: t
        });
        var a = n.data.joinList;
        a.forEach(function(e) {
            e.id === t && (e.linkjoinHe = !0);
        }), this.setData({
            joinList: a
        });
    },
    closejoinLink: function() {
        var e = n.data.currJoinId, t = n.data.joinList;
        t.forEach(function(t) {
            t.id === e && (t.linkjoinHe = !1);
        }), this.setData({
            joinList: t
        });
    },
    copyLink: function(e) {
        var t = e.target.dataset.value;
        wx.setClipboardData({
            data: t,
            success: function() {
                d.dataLoading("复制成功", "success"), console.log("复制成功");
            }
        });
    },
    changePage: function(e) {
        var t = e.target.id;
        this.setData({
            status: t
        });
    },
    onLoad: function(e) {
        this.initButton(), n = this;
        wx.getStorageSync("user_openid");
        a = e.actid, o = e.pubid;
        new Array();
        wx.getStorage({
            key: "user_id",
            success: function(e) {
                o == e.data && (n.setData({
                    favo: 3,
                    join: 3,
                    isMe: !0
                }), console.log("这是我的发起"));
            }
        }), console.log("this is options.actid=" + e.actid), console.log("this is options.pubid=" + e.pubid);
    },
    onReady: function() {
        wx.hideToast();
    },
    onShow: function() {
        var e = setInterval(function() {
            wx.getStorage({
                key: "user_id",
                success: function(o) {
                    if (o.data) {
                        if (clearInterval(e), 0 == n.data.isMe) {
                            var s = new g.Query(g.User);
                            s.equalTo("objectId", o.data), s.find({
                                success: function(e) {
                                    var t = e[0].get("eventFavo"), o = e[0].get("eventJoin"), s = !1, i = !1;
                                    if (null != t && t.length > 0) for (c = 0; c < t.length; c++) if (t[c] == a) {
                                        t.splice(c, 1), s = !0;
                                        break;
                                    }
                                    if (null != o && o.length > 0) for (var c = 0; c < o.length; c++) if (o[c] == a) {
                                        o.splice(c, 1), i = !0;
                                        break;
                                    }
                                    "1" == s ? n.setData({
                                        favo: 1
                                    }) : "0" == s && n.setData({
                                        favo: 0
                                    }), "1" == i ? n.setData({
                                        join: 1
                                    }) : "0" == i && n.setData({
                                        join: 0
                                    });
                                },
                                error: function(e) {
                                    console.log(e);
                                }
                            });
                        }
                        var i = g.Object.extend("Events"), c = new g.Query(i);
                        c.equalTo("objectId", a), c.include("publisher"), c.find({
                            success: function(e) {
                                var a, s, i = e[0].get("title"), c = e[0].get("content"), r = e[0].get("publisher"), u = e[0].get("acttype"), l = t(u), d = e[0].get("isShow"), g = e[0].get("endtime"), v = e[0].createdAt, m = f.getDateDiff(v), p = e[0].get("address"), h = e[0].get("longitude"), w = e[0].get("latitude"), b = e[0].get("peoplenum"), y = e[0].get("joinnumber"), x = e[0].get("likenum"), T = e[0].get("liker"), D = e[0].get("commentnum"), j = r.nickname, k = r.id;
                                a = r.userPic ? r.userPic : "/static/images/icon/user_defaulthead@2x.png", s = e[0].get("actpic") ? e[0].get("actpic")._url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png", 
                                r.id == o.data && n.setData({
                                    isMine: !0
                                }), n.setData({
                                    listTitle: i,
                                    listContent: c,
                                    publishTime: m,
                                    listPic: s,
                                    agreeNum: x,
                                    commNum: D,
                                    acttype: u,
                                    acttypename: l,
                                    isShow: d,
                                    endtime: g,
                                    address: p,
                                    longitude: h,
                                    latitude: w,
                                    peoplenum: b,
                                    joinnumber: y,
                                    publisherPic: a,
                                    publisherName: j,
                                    objectIds: k,
                                    loading: !0
                                });
                                for (var S = 0; S < T.length; S++) {
                                    var L = 0;
                                    if (T[S] == o.data) {
                                        L = 1, n.setData({
                                            agree: L
                                        });
                                        break;
                                    }
                                }
                                n.commentQuery(e[0]), n.joinDetail(e[0]), n.likerDetail(e[0]), n.eventMore(e[0]);
                            },
                            error: function(e) {
                                n.setData({
                                    loading: !0
                                }), console.log(e);
                            }
                        });
                    }
                }
            });
        }, 500);
    },
    eventMore: function(e) {
        var t = g.Object.extend("EventMore"), a = new g.Query(t);
        a.equalTo("event", e), a.find({
            success: function(e) {
                var t = e[0].id;
                i = t;
                var a, o = e[0].get("Statusname"), s = e[0].get("Status");
                a = e[0].get("qrcode") ? e[0].get("qrcode")._url : null, n.setData({
                    eventMoreId: t,
                    statusname: o,
                    actstatus: s,
                    statusIndex: s,
                    qrcode: a
                });
            }
        });
    },
    commentQuery: function(e) {
        var t = this;
        c = new Array();
        var a = g.Object.extend("Comments"), o = new g.Query(a);
        o.equalTo("event", e), o.limit(t.data.comPage), o.skip(t.data.comPage * t.data.comCurPage), 
        o.descending("createAt"), o.include("publisher"), o.find({
            success: function(e) {
                for (var t = 0; t < e.length; t++) {
                    var a, o = e[t].id, s = e[t].get("olderComment"), i = e[t].get("publisher").objectId, r = e[t].get("content"), u = e[t].createdAt, l = f.getDateDiff(u), d = e[t].get("publisher").userPic, g = e[t].get("publisher").nickname;
                    s ? (s = s.id, a = e[t].get("olderUserName")) : (s = 0, a = "");
                    var v;
                    v = {
                        id: o || "",
                        content: r || "",
                        pid: s || "",
                        uid: i || "",
                        created_at: l || "",
                        pusername: a || "",
                        username: g || "",
                        avatar: d || ""
                    }, c.push(v), n.setData({
                        commentList: c,
                        loading: !0
                    });
                }
            },
            error: function(e) {
                d.dataLoadin(e, "loading"), console.log(e);
            }
        });
    },
    joinDetail: function(t) {
        r = new Array();
        var a = g.Object.extend("Contacts"), o = new g.Query(a);
        o.equalTo("event", t), o.include("currentUser"), o.include("publisher"), o.descending("createAt"), 
        o.find({
            success: function(t) {
                for (var a = 0; a < t.length; a++) {
                    var o = t[a].get("currentUser").objectId;
                    if (o == t[a].get("publisher").objectId) {
                        console.log("获取发起者信息成功");
                        var i = t[a].id, c = t[a].get("realname"), u = t[a].get("contactWay"), l = t[a].get("contactValue");
                        n.setData({
                            adminId: o,
                            adminname: c,
                            adcontactWay: u,
                            adcontactValue: l,
                            loading: !0
                        });
                    } else {
                        if (o == wx.getStorageSync("user_id")) {
                            console.log("获取加入者信息成功");
                            i = t[a].id;
                            s = i;
                            var d = t[a].get("realname"), g = t[a].get("contactWay"), v = t[a].get("contactValue");
                            n.setData({
                                joinId: i,
                                joinname: d,
                                jocountIndex: e(g),
                                jocontactValue: v,
                                loading: !0
                            });
                        }
                        var m, i = t[a].id, p = t[a].get("realname"), h = t[a].get("contactWay"), w = t[a].get("contactValue"), b = t[a].get("currentUser").username, y = t[a].get("currentUser").userPic, x = t[a].createdAt;
                        m = {
                            id: i,
                            realname: p,
                            joinuserid: o,
                            joinusername: b,
                            joinuserpic: y,
                            contactWay: h,
                            contactValue: w,
                            jointime: f.getDateDiff(x),
                            linkjoinHe: !1
                        }, r.push(m), n.setData({
                            joinList: r,
                            loading: !0
                        });
                    }
                }
            },
            error: function(e) {
                d.dataLoadin(e, "loading"), console.log(e);
            }
        });
    },
    likerDetail: function(e) {
        u = new Array();
        var t = g.Object.extend("Likes"), a = new g.Query(t);
        a.equalTo("event", e), a.include("liker"), a.descending("createAt"), a.find({
            success: function(e) {
                for (var t = 0; t < e.length; t++) {
                    var a, o = e[t].id, s = e[t].get("liker").objectId, i = e[t].get("liker").username, c = e[t].get("liker").userPic, r = e[t].createdAt;
                    a = '{"id":"' + o + '","likerid":"' + s + '","likername":"' + i + '","likerpic":"' + c + '","liketime":"' + f.getDateDiff(r) + '"}';
                    var l = JSON.parse(a);
                    u.push(l), n.setData({
                        likerList: u,
                        loading: !0
                    });
                }
            },
            error: function(e) {
                d.dataLoadin(e, "loading"), console.log(e);
            }
        });
    },
    changeLike: function(e) {
        n.setData({
            style_img: "transform:scale(1.5);"
        }), setTimeout(function() {
            n.setData({
                style_img: "transform:scale(1);"
            });
        }, 500);
        var t = !1, s = n.data.agree, i = parseInt(this.data.agreeNum);
        "0" == s ? (i += 1, n.setData({
            agree: 1,
            agreeNum: i
        })) : "1" == s && (i -= 1, n.setData({
            agree: 0,
            agreeNum: i
        })), wx.getStorage({
            key: "user_id",
            success: function(e) {
                var s = g.Object.extend("Events"), i = new g.Query(s);
                i.equalTo("objectId", a), i.find({
                    success: function(s) {
                        var i = s[0].get("liker"), c = !1;
                        if (i.length > 0) {
                            for (var r = 0; r < i.length; r++) if (i[r] == e.data) {
                                i.splice(r, 1), c = !0, t = !0, n.downLike(e), s[0].set("likenum", s[0].get("likenum") - 1);
                                break;
                            }
                            0 == c && (i.push(e.data), n.upLike(e), s[0].set("likenum", s[0].get("likenum") + 1));
                        } else i.push(e.data), n.upLike(e), s[0].set("likenum", s[0].get("likenum") + 1);
                        s[0].save();
                        var u = g.Object.extend("Plyre"), u = new g.Query(u), l = new g.User();
                        l.id = e.data, t ? (u.equalTo("uid", l), u.equalTo("wid", a), u.equalTo("behavior", 2), 
                        u.find({
                            success: function(e) {
                                if (console.log(e), 0 == e.length) {
                                    var t = wx.getStorageSync("my_avatar"), n = wx.getStorageSync("my_username"), s = new (g.Object.extend("Plyre"))();
                                    s.set("behavior", 2), s.set("noticetype", "取消赞"), s.set("bigtype", 1), s.set("avatar", t), 
                                    s.set("username", n), s.set("uid", l), s.set("wid", a), s.set("fid", o), s.set("is_read", 0), 
                                    s.save();
                                }
                            }
                        })) : (u.equalTo("uid", l), u.equalTo("wid", a), u.equalTo("behavior", 1), u.find({
                            success: function(e) {
                                if (console.log(e), 0 == e.length) {
                                    var t = wx.getStorageSync("my_avatar"), n = wx.getStorageSync("my_username"), s = new (g.Object.extend("Plyre"))();
                                    s.set("behavior", 1), s.set("noticetype", "点赞"), s.set("bigtype", 1), s.set("avatar", t), 
                                    s.set("username", n), s.set("uid", l), s.set("wid", a), s.set("fid", o), s.set("is_read", 0), 
                                    s.save();
                                }
                            }
                        }));
                    },
                    error: function(e) {
                        console.log("赞/取消赞失败"), console.log(e);
                    }
                }), n.onShow();
            }
        });
    },
    upLike: function(e) {
        var t = new (g.Object.extend("Likes"))(), n = new g.User();
        n.id = e.data;
        var o = new (g.Object.extend("Events"))();
        o.id = a, t.set("liker", n), t.set("event", o), t.save(null, {
            success: function() {
                console.log("写入点赞表成功");
            },
            error: function(e) {
                console.log("写入点赞表失败"), console.log(e);
            }
        });
    },
    downLike: function(e) {
        var t = new g.User();
        t.id = e.data;
        var n = new (g.Object.extend("Events"))();
        n.id = a;
        var o = g.Object.extend("Likes"), s = new g.Query(o);
        s.equalTo("liker", t), s.equalTo("event", n), s.destroyAll({
            success: function() {
                console.log("删除点赞表中的数据成功");
            },
            error: function(e) {
                console.log("删除点赞表的数据失败"), console.log(e);
            }
        });
    },
    showCommentDialog: function(e) {
        this.setData({
            showCommentDialog: !0,
            commentInputHolder: "string" == typeof e ? e : "请输入评论内容"
        });
    },
    hideCommentDialog: function() {
        this.setData({
            showCommentDialog: !1,
            isToResponse: !1
        });
    },
    commentText: function(e) {
        v = e.detail.value;
    },
    commentTap: function(e) {
        var t = this, n = e.currentTarget.dataset.item, o = void 0;
        o = n.uid == wx.getStorageSync("user_id") ? [ "删除" ] : [ "回复" ], wx.showActionSheet({
            itemList: o,
            success: function(e) {
                var s = o[e.tapIndex];
                if ("回复" == s) t.setData({
                    pid: n.uid,
                    isToResponse: !0,
                    responseName: n.username
                }), t.showCommentDialog("回复" + n.username + "："); else if ("删除" == s) {
                    var i = g.Object.extend("Comments");
                    new g.Query(i).get(n.id, {
                        success: function(e) {
                            e.destroy({
                                success: function(e) {
                                    d.dataLoading("删除成功", "success"), console.log("删除成功");
                                },
                                error: function(e) {
                                    console.log("删除评论错误");
                                }
                            });
                        }
                    });
                    var c = g.Object.extend("Events");
                    new g.Query(c).get(a, {
                        success: function(e) {
                            e.set("commentnum", e.get("commentnum") - 1), e.save();
                        }
                    }), t.onShow();
                }
            }
        });
    },
    publishComment: function(e) {
        var t = this, n = !1;
        v && 0 != v.length ? (t.setData({
            isdisabled: !0,
            commentLoading: !0
        }), wx.getStorage({
            key: "user_id",
            success: function(e) {
                t.setData({
                    commentLoading: !1
                }), new g.Query(g.User).get(e.data, {
                    success: function(s) {
                        var i = new (g.Object.extend("Comments"))(), c = g.Object.extend("Events"), r = new c();
                        r.id = a;
                        var u = new g.User();
                        if (u.id = e.data, i.set("publisher", u), i.set("event", r), i.set("content", v), 
                        console.log("commentText=" + v), t.data.isToResponse) {
                            n = !0;
                            var l = t.data.responseName, f = new (g.Object.extend("Comments"))();
                            f.id = t.data.pid, i.set("olderUserName", l), i.set("olderComment", f);
                        }
                        i.save(null, {
                            success: function(s) {
                                new g.Query(c).get(a, {
                                    success: function(s) {
                                        s.set("commentnum", s.get("commentnum") + 1), s.save();
                                        var i = new g.User();
                                        i.id = e.data;
                                        var c = wx.getStorageSync("my_avatar"), r = wx.getStorageSync("my_username"), u = new (g.Object.extend("Plyre"))();
                                        console.log("isReply=" + n), n ? (u.set("behavior", 4), u.set("noticetype", "回复")) : (u.set("behavior", 3), 
                                        u.set("noticetype", "评论")), u.set("bigtype", 1), u.set("avatar", c), u.set("username", r), 
                                        u.set("uid", i), u.set("wid", a), u.set("fid", o), u.set("is_read", 0), u.save(null, {
                                            success: function(e) {
                                                console.log("isReply3=" + n), n ? (d.dataLoading("回复成功", "success"), console.log("回复成功")) : (d.dataLoading("评论成功", "success"), 
                                                console.log("评论成功"));
                                            },
                                            error: function(e, t) {
                                                console.log("评论失败");
                                            }
                                        }), t.setData({
                                            commentText: ""
                                        }), t.hideCommentDialog(), t.onShow();
                                    },
                                    error: function(e, t) {
                                        console.log(t);
                                    }
                                }), t.setData({
                                    publishContent: "",
                                    isToResponse: !1,
                                    responeContent: "",
                                    isdisabled: !1,
                                    commentLoading: !1
                                });
                            },
                            error: function(e, n) {
                                d.dataLoading(n, "loading"), t.setData({
                                    publishContent: "",
                                    isToResponse: !1,
                                    responeContent: "",
                                    isdisabled: !1,
                                    commentLoading: !1
                                });
                            }
                        });
                    },
                    error: function(e, t) {
                        console.log(t);
                    }
                });
            }
        })) : (this.setData({
            showTopTips: !0,
            TopTips: "请输入评论内容"
        }), setTimeout(function() {
            t.setData({
                showTopTips: !1
            });
        }, 3e3)), setTimeout(function() {
            t.setData({
                showTopTips: !1
            });
        }, 1e3);
    },
    bindKeyInput: function(e) {
        this.setData({
            publishContent: e.detail.value
        });
    },
    seeActBig: function(e) {
        wx.previewImage({
            current: n.data.listPic,
            urls: [ n.data.listPic ]
        });
    },
    seeqrCodeBig: function(e) {
        wx.previewImage({
            current: n.data.qrcode,
            urls: [ n.data.qrcode ]
        });
    },
    viewActAddress: function() {
        var e = this.data.latitude, t = this.data.longitude;
        wx.openLocation({
            latitude: e,
            longitude: t
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log(this.data.listTitle), {
            title: this.data.listTitle,
            path: "/pages/detail/detail?actid=" + a + "&pubid" + o,
            imageUrl: this.data.istPic,
            success: function(e) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "转发失败",
                    icon: "fail"
                });
            }
        };
    },
    click_join: function(e) {
        var t = n.data.join;
        n.data.peoplenum > 0 && n.data.peoplenum - n.data.joinnumber <= 0 ? wx.showModal({
            title: "温馨提示",
            content: "此活动参加人数已满",
            showCancel: !0
        }) : "3" == t ? this.setData({
            showStuDialog: !0
        }) : "0" == t ? this.setData({
            showDialog: !this.data.showDialog
        }) : "1" == t && (wx, wx.showModal({
            title: "温馨提示",
            content: "确定取消加入吗？",
            showCancel: !0,
            success: function(e) {
                e.confirm && (n.setData({
                    status: 0
                }), wx.getStorage({
                    key: "user_id",
                    success: function(e) {
                        var t = new g.User();
                        t.id = e.data;
                        var s = new (g.Object.extend("Events"))();
                        s.id = a;
                        var i = g.Object.extend("Contacts"), c = new g.Query(i);
                        c.equalTo("currentUser", t), c.equalTo("event", s), c.destroyAll({
                            success: function() {
                                console.log("删除联系表中的数据成功"), n.setData({
                                    join: 0
                                });
                            },
                            error: function(e) {
                                console.log("删除联系表中的数据失败");
                            }
                        });
                        var r = new g.User();
                        r.id = e.data;
                        var u = wx.getStorageSync("my_avatar"), l = wx.getStorageSync("my_username"), d = new (g.Object.extend("Plyre"))();
                        d.set("behavior", 6), d.set("noticetype", "取消参加"), d.set("bigtype", 2), d.set("avatar", u), 
                        d.set("username", l), d.set("uid", r), d.set("wid", a), d.set("fid", o), d.set("is_read", 0), 
                        d.save();
                        var i = g.Object.extend("Events"), f = new g.Query(i);
                        f.equalTo("objectId", a), f.find({
                            success: function(t) {
                                for (var n = t[0].get("joinArray"), a = 0; a < n.length; a++) if (n[a] == e.data) {
                                    n.splice(a, 1), t[0].set("joinnumber", t[0].get("joinnumber") - 1);
                                    break;
                                }
                                t[0].save();
                            }
                        });
                    }
                }), wx.getStorage({
                    key: "my_username",
                    success: function(e) {
                        var t = e.data;
                        wx.getStorage({
                            key: "user_openid",
                            success: function(e) {
                                var o = e.data;
                                g.User.logIn(t, o, {
                                    success: function(e) {
                                        var t = e.get("eventJoin");
                                        if (t.length > 0) for (var o = 0; o < t.length; o++) if (t[o] == a) {
                                            t.splice(o, 1);
                                            break;
                                        }
                                        e.set("eventJoin", t), e.save(null, {
                                            success: function() {
                                                d.dataLoading("取消参加成功", "success");
                                            },
                                            error: function(e) {
                                                console.log("取消参加失败");
                                            }
                                        }), n.onShow();
                                    }
                                });
                            }
                        });
                    }
                }));
            },
            fail: function(e) {},
            complete: function(e) {}
        }));
    },
    closeJoin: function() {
        this.setData({
            showDialog: !this.data.showDialog
        });
    },
    closeUpdJoin: function() {
        this.setData({
            showUpdDialog: !1
        });
    },
    closeChange: function() {
        this.setData({
            showStuDialog: !1
        });
    },
    changeStatus: function(e) {
        this.setData({
            statusIndex: e.detail.value
        });
    },
    bindAccountChange: function(e) {
        this.setData({
            accountIndex: e.detail.value
        });
    },
    updjoinChange: function(e) {
        this.setData({
            jocountIndex: e.detail.value
        });
    },
    stuSubmit: function(e) {
        var t = n.data.statusIndex;
        if (0 == t) o = "准备中"; else if (1 == t) o = "进行中"; else if (2 == t) var o = "已结束";
        var s = g.Object.extend("EventMore");
        new g.Query(s).get(i, {
            success: function(e) {
                if (e.set("Status", Number(t)), e.set("Statusname", o), e.save(), "已结束" == o) {
                    var s = g.Object.extend("Events");
                    new g.Query(s).get(a, {
                        success: function(e) {
                            e.set("isShow", 0), e.save(), console.log("撤离成功");
                        },
                        error: function(e, t) {
                            console.log("撤离失败" + t);
                        }
                    });
                }
                n.setData({
                    showStuDialog: !1
                }), console.log("改变状态成功"), d.dataLoading("改变成功", "success");
            },
            error: function(e, t) {
                console.log("改变状态失败" + t);
            }
        }), n.onShow();
    },
    joinSubmit: function(e) {
        var t = n.data.join, s = n.data.accountIndex;
        if ("0" == t ? n.setData({
            join: 1
        }) : "1" == t && n.setData({
            join: 0
        }), 0 == s) i = "微信号"; else if (1 == s) i = "QQ号"; else if (2 == s) var i = "手机号";
        var c = e.detail.value.realname, r = e.detail.value.contactValue, u = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$"), l = new RegExp("[1-9][0-9]{4,}"), f = new RegExp("0?(13|14|15|17|18|19)[0-9]{9}"), v = new RegExp("^[一-龥]{2,4}$");
        "" == c ? this.setData({
            showTopTips: !0,
            TopTips: "请输入真实姓名"
        }) : "" == c || v.test(c) ? "" == r ? this.setData({
            showTopTips: !0,
            TopTips: "请输入联系方式"
        }) : "微信号" != i || u.test(r) ? "手机号" != i || f.test(r) ? "QQ号" != i || l.test(r) ? (wx.getStorage({
            key: "user_id",
            success: function(e) {
                var t = new (g.Object.extend("Contacts"))(), s = new (g.Object.extend("Events"))();
                s.id = a;
                var u = new g.User();
                u.id = e.data;
                var l = new g.User();
                l.id = o, t.set("publisher", l), t.set("currentUser", u), t.set("event", s), t.set("realname", c), 
                t.set("contactWay", i), t.set("contactValue", r), console.log(t), t.save(null, {
                    success: function() {
                        n.setData({
                            showDialog: !n.data.showDialog
                        }), console.log("写入联系表成功"), n.setData({
                            accountIndex: 0,
                            contactValue: "",
                            realname: ""
                        });
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
                var d = new g.User();
                d.id = e.data;
                var f = wx.getStorageSync("my_avatar"), v = wx.getStorageSync("my_username"), m = new (g.Object.extend("Plyre"))();
                m.set("behavior", 5), m.set("noticetype", "参加活动"), m.set("bigtype", 2), m.set("avatar", f), 
                m.set("username", v), m.set("uid", d), m.set("wid", a), m.set("fid", o), console.log("fid=" + o), 
                m.set("is_read", 0), m.save();
                var p = g.Object.extend("Events"), h = new g.Query(p);
                h.equalTo("objectId", a), h.find({
                    success: function(t) {
                        t[0].get("joinArray").push(e.data), t[0].set("joinnumber", t[0].get("joinnumber") + 1), 
                        t[0].save();
                    }
                });
            }
        }), wx.getStorage({
            key: "user_openid",
            success: function(t) {
                var s = t.data, i = e.detail.formId, c = n.data.listTitle, r = n.data.address, u = n.data.adminname, l = n.data.adcontactWay + " : " + n.data.adcontactValue;
                console.log("actid=" + a + ",pubid" + o + ",title" + n.data.listTitle + ",adminname=" + n.data.adminname + ",address" + n.data.address + ",adcontactWay=" + n.data.adcontactWay + ",adcontactValue=" + n.data.adcontactValue);
                var f = {
                    touser: s,
                    template_id: "NY0sFhJfxkA49EaRPhBYr17xiLqHKJ_XRAHMBQ52Y1c",
                    page: "",
                    form_id: i,
                    data: {
                        keyword1: {
                            value: c
                        },
                        keyword2: {
                            value: r
                        },
                        keyword3: {
                            value: u
                        },
                        keyword4: {
                            value: l
                        },
                        keyword5: {
                            value: "您已成功加入发起,请及时与发起人联系"
                        }
                    },
                    emphasis_keyword: ""
                };
                g.sendMessage(f).then(function(e) {
                    console.log("发送成功");
                }, function(e) {
                    d.showTip("失败" + e);
                });
            }
        }), wx.getStorage({
            key: "my_username",
            success: function(e) {
                var t = e.data;
                wx.getStorage({
                    key: "user_openid",
                    success: function(e) {
                        var o = e.data;
                        g.User.logIn(t, o, {
                            success: function(e) {
                                var t = e.get("eventJoin"), o = !1;
                                if (null == t && (t = []), t.length > 0) {
                                    for (var s = 0; s < t.length; s++) if (t[s] == a) {
                                        t.splice(s, 1), o = !0;
                                        break;
                                    }
                                    0 == o && t.push(a);
                                } else t.push(a);
                                e.set("eventJoin", t), e.save(null, {
                                    success: function() {
                                        0 == o ? d.dataLoading("参加成功", "success") : 1 == o && d.dataLoading("取消参加成功", "success");
                                    },
                                    error: function(e) {
                                        console.log("参加失败");
                                    }
                                }), n.onShow();
                            }
                        });
                    }
                });
            }
        })) : this.setData({
            showTopTips: !0,
            TopTips: "QQ号格式不正确"
        }) : this.setData({
            showTopTips: !0,
            TopTips: "手机号格式不正确"
        }) : this.setData({
            showTopTips: !0,
            TopTips: "微信号格式不正确"
        }) : this.setData({
            showTopTips: !0,
            TopTips: "真实姓名一般为2-4位汉字"
        }), setTimeout(function() {
            n.setData({
                showTopTips: !1
            });
        }, 1e3);
    },
    updSubmit: function(e) {
        var t = n.data.jocountIndex;
        if (0 == t) i = "微信号"; else if (1 == t) i = "QQ号"; else if (2 == t) var i = "手机号";
        var c = e.detail.value.joinname, r = e.detail.value.jocontactValue, u = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$"), l = new RegExp("[1-9][0-9]{4,}"), f = new RegExp("0?(13|14|15|17|18|19)[0-9]{9}"), v = new RegExp("^[一-龥]{2,4}$");
        if ("" == c) this.setData({
            showTopTips: !0,
            TopTips: "请输入真实姓名"
        }); else if ("" == c || v.test(c)) if ("" == r) this.setData({
            showTopTips: !0,
            TopTips: "请输入联系方式"
        }); else if ("微信号" != i || u.test(r)) if ("手机号" != i || f.test(r)) if ("QQ号" != i || l.test(r)) {
            g.Object.extend("Contacts");
            new g.Query("Contacts").get(s, {
                success: function(e) {
                    e.set("realname", c), e.set("contactWay", i), e.set("contactValue", r), e.save({
                        success: function() {
                            var e = new g.User();
                            e.id = wx.getStorageSync("user_id");
                            var t = wx.getStorageSync("my_avatar"), n = wx.getStorageSync("my_username"), s = new (g.Object.extend("Plyre"))();
                            s.set("behavior", 7), s.set("noticetype", "修改信息"), s.set("bigtype", 1), s.set("avatar", t), 
                            s.set("username", n), s.set("uid", e), s.set("wid", a), s.set("fid", o), console.log("fid=" + o), 
                            s.set("is_read", 0), s.save(), console.log("修改成功"), d.dataLoading("修改成功", "success");
                        },
                        error: function(e) {
                            console.log("修改失败");
                        }
                    }), n.onShow();
                }
            }), n.setData({
                showUpdDialog: !1
            });
        } else this.setData({
            showTopTips: !0,
            TopTips: "QQ号格式不正确"
        }); else this.setData({
            showTopTips: !0,
            TopTips: "手机号格式不正确"
        }); else this.setData({
            showTopTips: !0,
            TopTips: "微信号格式不正确"
        }); else this.setData({
            showTopTips: !0,
            TopTips: "真实姓名一般为2-4位汉字"
        });
        setTimeout(function() {
            n.setData({
                showTopTips: !1
            });
        }, 1e3);
    },
    click_favo: function(e) {
        var t = n.data.favo;
        if ("3" == t) {
            var o = g.Object.extend("Events"), s = new g.Query(o);
            if (2 != n.data.actstatus && 1 == n.data.isShow) wx.showModal({
                title: "是否撤离首页?",
                content: "撤离后您的发起将不会在首页展示",
                showCancel: !0,
                success: function(e) {
                    e.confirm && (s.get(a, {
                        success: function(e) {
                            e.set("isShow", 0), e.save(), console.log("撤离成功"), d.dataLoading("撤离成功", "success");
                        },
                        error: function(e, t) {
                            console.log("撤离失败" + t);
                        }
                    }), n.onShow());
                }
            }); else if (2 != n.data.actstatus && 0 == n.data.isShow) wx.showModal({
                title: "是否公开发起?",
                content: "公开后您的发起将会在首页展示",
                showCancel: !0,
                success: function(e) {
                    e.confirm && (s.get(a, {
                        success: function(e) {
                            e.set("isShow", 1), e.save(), console.log("公开成功"), d.dataLoading("公开成功", "success");
                        },
                        error: function(e, t) {
                            console.log("公开失败" + t);
                        }
                    }), n.onShow());
                }
            }); else if (2 == n.data.actstatus) return void wx.showModal({
                title: "温馨提示",
                content: "已结束的发起不能公开到首页"
            });
        } else "0" == t ? n.setData({
            favo: 1
        }) : "1" == t && n.setData({
            favo: 0
        });
        "3" != t && wx.getStorage({
            key: "my_username",
            success: function(e) {
                var t = e.data;
                wx.getStorage({
                    key: "user_openid",
                    success: function(e) {
                        var o = e.data;
                        g.User.logIn(t, o, {
                            success: function(e) {
                                var t = wx.getStorageSync("user_id"), o = e.get("eventFavo"), s = !1;
                                if (null == o && (o = []), o.length > 0) {
                                    for (var i = 0; i < o.length; i++) if (o[i] == a) {
                                        o.splice(i, 1), s = !0, n.downFavo(t);
                                        break;
                                    }
                                    0 == s && (o.push(a), n.upFavo(t));
                                } else o.push(a), n.upFavo(t);
                                e.set("eventFavo", o), e.save(null, {
                                    success: function() {
                                        0 == s ? d.dataLoading("收藏成功", "success") : 1 == s && d.dataLoading("取消收藏成功", "success");
                                    },
                                    error: function(e) {
                                        console.log("失败");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    upFavo: function(e) {
        var t = new (g.Object.extend("Favos"))(), n = new g.User();
        n.id = e;
        var o = new (g.Object.extend("Events"))();
        o.id = a, t.set("favor", n), t.set("event", o), t.save(null, {
            success: function() {
                console.log("写入收藏表成功");
            },
            error: function(e) {
                console.log("写入收藏表失败"), console.log(e);
            }
        });
    },
    downFavo: function(e) {
        var t = new g.User();
        t.id = e;
        var n = new (g.Object.extend("Events"))();
        n.id = a;
        var o = g.Object.extend("Favos"), s = new g.Query(o);
        s.equalTo("favor", t), s.equalTo("event", n), s.destroyAll({
            success: function() {
                console.log("删除收藏表中的数据成功");
            },
            error: function(e) {
                console.log("删除收藏表的数据失败"), console.log(e);
            }
        });
    },
    deleteEvent: function() {
        wx.showModal({
            title: "是否删除该活动?",
            content: "删除后将不能恢复",
            showCancel: !0,
            confirmColor: "#a07c52",
            cancelColor: "#646464",
            success: function(e) {
                if (e.confirm) {
                    var t = g.Object.extend("Events");
                    new g.Query(t).get(a, {
                        success: function(e) {
                            e.destroy({
                                success: function(e) {
                                    d.dataLoading("删除成功", "success", function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    });
                                },
                                error: function(e, t) {
                                    console.log(t);
                                }
                            });
                        },
                        error: function(e, t) {
                            console.log(t);
                        }
                    });
                }
            }
        });
    },
    initButton: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "bottomRight";
        this.setData({
            opened: !1
        }), this.button = l.$wuxButton.init("br", {
            position: e,
            buttons: [ {
                label: "群二维码",
                icon: "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/02/e049248040b452cd805877235b8b9e0c.png"
            }, {
                label: "修改信息",
                icon: "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/02/9134d4a24058705f80a61ec82455fe47.png"
            } ],
            buttonClicked: function(e, t) {
                if (0 === e) null == n.data.qrcode ? n.data.isMe ? wx.showModal({
                    title: "温馨提示",
                    content: "您还未上传群二维码，如需上传，请点击修改信息"
                }) : wx.showModal({
                    title: "温馨提示",
                    content: "该活动暂未上传群二维码，您可联系发起者建群上传"
                }) : n.showqrcode(); else if (1 === e) {
                    var s = a, i = o;
                    n.data.isMe ? wx.navigateTo({
                        url: "/pages/updAct/updAct?actid=" + s + "&pubid=" + i
                    }) : n.setData({
                        showUpdDialog: !0
                    });
                }
                return !0;
            },
            callback: function(e, t) {
                e.setData({
                    opened: t
                });
            }
        });
    },
    switchChange: function(e) {
        e.detail.value ? this.button.open() : this.button.close();
    },
    pickerChange: function(e) {
        var t = e.detail.value, n = this.data.types[t];
        this.initButton(n);
    }
});