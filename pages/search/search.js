// pages/search/search.js
const {host,searchUrl} = require('../../utils/config');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cityName:"",
        searchList:[],
        isEmpty:true
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取传过来的城市的名称
       this.data.cityName = options.cityName;
    },

    searchFoods:function(e){
        var inputValue = e.detail.value;
        console.log(inputValue);
        //特殊情况处理
        if(inputValue === "" || inputValue === " "){
            this.setData({
                searchList:[],
                isEmpty:true
            });
            return;
        }
        //去服务器请求数据
        wx.request({
          url: host+searchUrl,
          data:{
              name:inputValue,
              city:this.data.cityName
          },
          success:res=>{
              console.log(res);
              if(res.data.status==200){
                    this.setData({
                        searchList:res.data.data,
                        isEmpty:false
                    });
              }else{
                this.setData({
                    searchList:[],
                    isEmpty:true
                });
              }
          }
        })
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