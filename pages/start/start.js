var n = getApp();

Page({
    data: {
        remind: "加载中",
        angle: 0,
        userInfo: {}
    },
    goToIndex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onLoad: function() {},
    onShow: function() {
        console.log("onLoad");
        var e = this;
        n.getUserInfo(function(n) {
            e.setData({
                userInfo: n
            });
        });
    },
    onReady: function() {
        var n = this;
        setTimeout(function() {
            n.setData({
                remind: ""
            });
        }, 1e3), wx.onAccelerometerChange(function(e) {
            var o = -(30 * e.x).toFixed(1);
            o > 14 ? o = 14 : o < -14 && (o = -14), n.data.angle !== o && n.setData({
                angle: o
            });
        });
    }
});