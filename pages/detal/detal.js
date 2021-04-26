// pages/food/food.js
const fenlei=require('../../utils/fooditem.js')
const {host,foodList}=require('../../utils/config')
const app=getApp();
Page({
    data: {
        location:"北京",
        itemArr:fenlei,
        listArr:[],//列表数据
        moreInfo:'',
        page:1,
        isBottom:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    http(){
      wx.request({
        url:host+foodList,
        data:{
          city:this.data.location,
          page:this.data.page
        },
        success:res=>{
            console.log(res.data);
            this.setData({
              listArr:res.data.data.result
            })
        }
      })
    },
    onLoad: function (options) {      
        //1.获取列表数据---------------------------
      this.http()
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
        //将下拉刷新的逻辑在此编写
        //需要通过刷新的接口去请求，此处只是模拟
        console.log(this.data.page);
        wx.request({
          url: host+foodList,
          data:{
            city:"上海",
            page:1
          },
          success:res=>{
            console.log(res);
            if(res.data.status===200){
                this.setData({
                  listArr:res.data.data.result
                });
            }
          }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      //上滑页面 查看更多的逻辑在此
      
        //将下拉刷新的逻辑在此编写
        //需要通过刷新的接口去请求，此处只是模拟
        wx.request({
          url: host+foodList,
          data:{
            city:this.data.location,
            page:++this.data.page
          },
          success:res=>{
            console.log(res);
            //数据的替换
            if(res.data.status===200){
                //将请求到的数据连接到列表数组中
                this.setData({
                  listArr:this.data.listArr.concat(res.data.data.result),
                  isBottom:false
                });
            }else{
              this.setData({
                isBottom:true
              });
            }
          }
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})