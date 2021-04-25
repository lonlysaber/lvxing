// pages/index/index.js
// const con = require("../../utils/config.js");
const {host,bannerUrl,listUrl} = require("../../utils/config.js");

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 定义变量接收数据
        bannerArray:[],
        num:1,
        listArray:[]
    },
// 事件对象获得事件相关的信息
    swiperChange:function(e){
        //获得当前轮播的current属性的值
        // console.log(e.detail.current);
        this.setData({
            "num":e.detail.current+1
        });
    },

    toDetail:function(e){
        //获得当前组件对应的id
        var id = e.currentTarget.dataset.id;
        var url = "../indexDetail/indexDetail?id="+id;
        wx.navigateTo({
          url: url,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
          title: 'loading...',
        });


        //请求页面的数据
        app.http(host+bannerUrl,"bannerArray",this);
        // wx.request({
        //   url: host+bannerUrl,
        //   //箭头函数，es6中的新的语法
        //   success:res=>{
        //     // console.log(res.data);
        //     if(res.data.status===200){
        //         //成功了. 如果需要动态的刷新页面，不能这样赋值，如果只是获取数据可以如此。
        //         // this.data.bannerArray= res.data.data;
        //         // console.log(this.data.bannerArray);
        //         //如果需要动态的刷新页面 的写法
        //         this.setData({
        //             "bannerArray":res.data.data
        //         });
        //         console.log(this.data.bannerArray);
        //     }
        //   }
        // });

        //请求首页列表数据
        app.http(host+listUrl,"listArray",this,true,"'加载完成！");
        // wx.request({
        //   url: host+listUrl,
        //   success:res=>{
        //       console.log(res.data);
        //       if(res.data.status===200){
        //             this.setData({
        //                 "listArray":res.data.data
        //             });
        //       }
        //   },
        //   complete:function(){
        //       wx.hideLoading();
        //       wx.showToast({
        //         title: '加载完成！',
        //       })
        //   }
        // })
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})