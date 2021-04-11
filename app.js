var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./utils/Touches.js")), n = require("utils/bmob.js"), o = (require("utils/common.js"), 
require("utils/util"));

n.initialize("59976770b8b9927f7f0be8f460c8991d", "5492c00ac7929365756ed98b56fe1371"), 
App({
    version: "v1.0.0",
    onLaunch: function() {
        wx.getSystemInfo({
            success: function(e) {
                var n = e.windowWidth / 375, o = e.windowHeight / 603;
                wx.setStorageSync("kScreenW", n), wx.setStorageSync("kScreenH", o);
            }
        });
        try {
            wx.getStorageSync("user_openid") || (console.log("执行login1"), wx.login({
                success: function(e) {
                    e.code && console.log("执行login2", e);
                }
            }), wx.login({
                success: function(e) {
                    e.code ? n.User.requestOpenId(e.code, {
                        success: function(e) {
                            wx.getUserInfo({
                                success: function(o) {
                                    var t = o.userInfo, s = t.nickName, c = t.avatarUrl, r = t.gender;
                                    n.User.logIn(s, e.openid, {
                                        success: function(e) {
                                            try {
                                                wx.setStorageSync("user_openid", e.get("userData").openid), wx.setStorageSync("user_id", e.id), 
                                                wx.setStorageSync("my_nick", e.get("nickname")), wx.setStorageSync("my_username", e.get("username")), 
                                                wx.setStorageSync("my_sex", e.get("sex")), wx.setStorageSync("my_avatar", e.get("userPic"));
                                            } catch (e) {}
                                            console.log("登录成功");
                                        },
                                        error: function(o, t) {
                                            "101" == t.code && ((o = new n.User()).set("username", s), o.set("password", e.openid), 
                                            o.set("nickname", s), o.set("userPic", c), o.set("userData", e), o.set("sex", r), 
                                            o.set("feednum", 0), o.signUp(null, {
                                                success: function(e) {
                                                    console.log("注册成功");
                                                    try {
                                                        wx.setStorageSync("user_openid", o.get("userData").openid), wx.setStorageSync("user_id", o.id), 
                                                        wx.setStorageSync("my_nick", o.get("nickname")), wx.setStorageSync("my_username", o.get("username")), 
                                                        wx.setStorageSync("my_sex", o.get("sex")), wx.setStorageSync("my_avatar", o.get("userPic"));
                                                    } catch (e) {}
                                                },
                                                error: function(e, n) {
                                                    console.log("openid=" + e), console.log(n);
                                                }
                                            }));
                                        }
                                    });
                                }
                            });
                        },
                        error: function(e) {
                            console.log("Error: " + e.code + " " + e.message);
                        }
                    }) : console.log("获取用户登录态失败1！" + e.errMsg);
                },
                complete: function(e) {
                    console.log("获取用户登录态失败2！" + e);
                }
            }));
        } catch (e) {
            console.log("登陆失败");
        }
        wx.checkSession({
            success: function() {},
            fail: function() {
                wx.login();
            }
        });
    },
    onShow: function() {},
    formate_data: function(e) {
        var n = e.getMonth() + 1;
        return e.getFullYear() + "年" + n + "月" + e.getDate() + "日 " + e.getHours() + "点" + e.getMinutes() + "分";
    },
    getUserInfo: function(e) {
        var n = this;
        this.globalData.userInfo ? "function" == typeof e && e(this.globalData.userInfo) : wx.login({
            success: function() {
                wx.getUserInfo({
                    success: function(o) {
                        n.globalData.userInfo = o.userInfo, "function" == typeof e && e(n.globalData.userInfo);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null
    },
    onPullDownRefresh: function() {},
    onError: function(e) {},
    Touches: new e.default(),
    util: o
});