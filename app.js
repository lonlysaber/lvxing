// app.js
App({

  //定义全局的网络请求的方法
  http:function(url,key,that,isHideLoading,toastStr){
    wx.request({
      url: url,
      success:res=>{
        if(res.data.status===200){
          console.log(res.data);
            that.setData({
                [key]:res.data.data
            });
        }
      },
      complete:function(){
        if(isHideLoading){
          wx.hideLoading();
        }
        if(toastStr){
          wx.showToast({
            title: toastStr,
          })
        }
      }
    });
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})

