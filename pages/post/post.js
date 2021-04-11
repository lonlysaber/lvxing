function e(e) {
    var t = e.getMonth() + 1;
    return e.getFullYear() + "-" + t + "-" + e.getDate();
}

function t(e) {
    var t = "";
    return 1 == e ? t = "运动" : 2 == e ? t = "游戏" : 3 == e ? t = "交友" : 4 == e ? t = "旅行" : 5 == e ? t = "读书" : 6 == e ? t = "竞赛" : 7 == e ? t = "电影" : 8 == e ? t = "音乐" : 9 == e && (t = "其他"), 
    t;
}

getApp();

var s, a = require("../../utils/bmob.js"), i = require("../template/getCode.js"), n = new Date();

Page({
    data: {
        notice_status: !1,
        accounts: [ "微信号", "QQ号", "手机号" ],
        accountIndex: 0,
        peopleHide: !1,
        isAgree: !1,
        date: e(n),
        address: "点击选择位置",
        longitude: 0,
        latitude: 0,
        showTopTips: !1,
        TopTips: "",
        noteMaxLen: 200,
        content: "",
        noteNowLen: 0,
        types: [ "旅行求组队", "游戏求开黑", "电影求约起", "音乐", "读书", "竞赛", "运动", "其他", "公告" ],
        typeIndex: "0",
        showInput: !1
    },
    tapNotice: function(e) {
        "notice" == e.target.id && this.hideNotice();
    },
    showNotice: function(e) {
        this.setData({
            notice_status: !0
        });
    },
    hideNotice: function(e) {
        this.setData({
            notice_status: !1
        });
    },
    bindTextAreaChange: function(e) {
        var t = this, s = e.detail.value, a = parseInt(s.length);
        a > t.data.noteMaxLen || t.setData({
            content: s,
            noteNowLen: a
        });
    },
    onLoad: function(e) {
        (s = this).setData({
            src: "",
            isSrc: !1,
            ishide: "0",
            autoFocus: !0,
            isLoading: !1,
            loading: !0,
            isdisabled: !1
        });
    },
    onReady: function() {
        wx.hideToast();
    },
    onShow: function() {
        var e = setInterval(function() {
            wx.getStorage({
                key: "user_openid",
                success: function(t) {
                    t.data && (clearInterval(e), s.setData({
                        loading: !0
                    }));
                }
            });
        }, 500);
    },
    uploadPic: function() {
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths;
                s.setData({
                    isSrc: !0,
                    src: t
                });
            }
        });
    },
    clearPic: function() {
        s.setData({
            isSrc: !1,
            src: ""
        });
    },
    uploadCodePic: function() {
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths;
                s.setData({
                    isCodeSrc: !0,
                    codeSrc: t
                });
            }
        });
    },
    clearCodePic: function() {
        s.setData({
            isCodeSrc: !1,
            codeSrc: ""
        });
    },
    switch1Change: function(e) {
        0 == e.detail.value ? this.setData({
            peopleHide: !1
        }) : 1 == e.detail.value && this.setData({
            peopleHide: !0
        });
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    bindTypeChange: function(e) {
        this.setData({
            typeIndex: e.detail.value
        });
    },
    addressChange: function(e) {
        this.addressChoose(e);
    },
    addressChoose: function(e) {
        var t = this;
        wx.chooseLocation({
            success: function(s) {
                t.setData({
                    address: s.name,
                    longitude: s.longitude,
                    latitude: s.latitude
                }), e.detail && e.detail.value && (this.data.address = e.detail.value);
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    bindAccountChange: function(e) {
        this.setData({
            accountIndex: e.detail.value
        });
    },
    bindAgreeChange: function(e) {
        this.setData({
            isAgree: !!e.detail.value.length,
            showInput: !this.data.showInput
        });
    },
    showTopTips: function() {
        var e = this;
        this.setData({
            showTopTips: !0
        }), setTimeout(function() {
            e.setData({
                showTopTips: !1
            });
        }, 3e3);
    },
    submitForm: function(s) {
        var o = this;
        if (0 != o.data.showInput) {
            var d = s.detail.value.title, c = this.data.date, u = this.data.typeIndex, l = 1 + parseInt(u), p = (t(l), 
            this.data.address), r = this.data.longitude, h = this.data.latitude, T = s.detail.value.switchHide, g = s.detail.value.peoplenum;
            console.log(g);
            var w = s.detail.value.content, f = s.detail.value.realname, v = this.data.accountIndex;
            if (0 == v) D = "微信号"; else if (1 == v) D = "QQ号"; else if (2 == v) var D = "手机号";
            var m = s.detail.value.contactValue, x = new RegExp("^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$"), b = new RegExp("[1-9][0-9]{4,}"), S = /^1[34578]\d{9}$/, I = new RegExp("^[一-龥]{2,4}$");
            "" == d ? this.setData({
                showTopTips: !0,
                TopTips: "请输入主题"
            }) : "点击选择位置" == p ? this.setData({
                showTopTips: !0,
                TopTips: "请选择地点"
            }) : 1 == T && "" == g ? this.setData({
                showTopTips: !0,
                TopTips: "请输入人数"
            }) : "" == w ? this.setData({
                showTopTips: !0,
                TopTips: "请输入活动内容"
            }) : "" == f ? this.setData({
                showTopTips: !0,
                TopTips: "请输入真实姓名"
            }) : "" == f || I.test(f) ? "" == m ? this.setData({
                showTopTips: !0,
                TopTips: "请输入联系方式"
            }) : "微信号" != D || x.test(m) ? "手机号" != D || S.test(m) ? "QQ号" != D || b.test(m) ? (console.log("校验完毕"), 
            o.setData({
                isLoading: !0,
                isdisabled: !0
            }), wx.getStorage({
                key: "user_id",
                success: function(t) {
                    var s = new (a.Object.extend("Events"))(), u = new a.User();
                    if (u.id = t.data, s.set("title", d), s.set("endtime", c), s.set("acttype", l + ""), 
                    s.set("isShow", 1), s.set("address", p), s.set("longitude", r), s.set("latitude", h), 
                    o.data.peopleHide ? s.set("peoplenum", g) : o.data.peopleHide || s.set("peoplenum", "-1"), 
                    s.set("content", w), s.set("publisher", u), s.set("likenum", 0), s.set("commentnum", 0), 
                    s.set("liker", []), s.set("joinnumber", 0), s.set("joinArray", []), 1 == o.data.isSrc) {
                        var T = o.data.src, v = new a.File(T, o.data.src);
                        v.save(), s.set("actpic", v);
                    }
                    s.save(null, {
                        success: function(t) {
                            var s = new (a.Object.extend("EventMore"))(), d = new (a.Object.extend("Events"))();
                            if (d.id = t.id, s.set("Status", 0), s.set("Statusname", "准备中"), s.set("event", d), 
                            1 == o.data.isCodeSrc) {
                                var c = o.data.codeSrc, u = new a.File(c, o.data.codeSrc);
                                u.save(), s.set("qrcode", u);
                            }
                            s.save(), wx.getStorage({
                                key: "user_id",
                                success: function(e) {
                                    var s = new (a.Object.extend("Contacts"))(), i = new (a.Object.extend("Events"))();
                                    i.id = t.id;
                                    var n = new a.User();
                                    n.id = e.data, s.set("publisher", n), s.set("currentUser", n), s.set("event", i), 
                                    s.set("realname", f), s.set("contactWay", D), s.set("contactValue", m), s.save();
                                }
                            }), console.log("发布成功,objectId:" + t.id), o.setData({
                                isLoading: !1,
                                isdisabled: !1,
                                eventId: t.id
                            }), i.dataLoading("发起成功", "success", function() {
                                o.setData({
                                    title: "",
                                    typeIndex: 0,
                                    address: "点击选择位置",
                                    longitude: 0,
                                    latitude: 0,
                                    data: e(n),
                                    isHide: !0,
                                    peoplenum: 0,
                                    peopleHide: !1,
                                    isAgree: !1,
                                    accountIndex: 0,
                                    realname: "",
                                    content: "",
                                    contactValue: "",
                                    noteNowLen: 0,
                                    showInput: !1,
                                    src: "",
                                    isSrc: !1,
                                    codeSrc: "",
                                    isCodeSrc: !1
                                });
                            });
                        },
                        error: function(e, t) {
                            console.log("发布失败=" + t), i.dataLoading("发起失败", "loading"), o.setData({
                                isLoading: !1,
                                isdisabled: !1
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
                o.setData({
                    showTopTips: !1
                });
            }, 1e3);
        } else wx.showModal({
            title: "提示",
            content: "请先阅读《发起须知》"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});