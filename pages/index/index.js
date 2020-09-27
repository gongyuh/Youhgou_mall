import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    cateList:[],
    // 楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送异步数据。获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    // })
   this.getSwiperList();
   this.getCateList();
   this.getFloorList();
},
  // 获取轮播图数据
  getSwiperList(){
    request({
      url:"/home/swiperdata"
       })
       .then(result=>{
        this.setData({
        swiperList:result
      })
    })
  },
// 获取分类数据
  getCateList(){
    request({
      url:"/home/catitems"
       })
       .then(result=>{
        this.setData({
        cateList:result
      })
    })
  },
// 获取楼层数据
  getFloorList(){
    request({
      url:"/home/floordata"
       })
       .then(result=>{
        this.setData({
        floorList:result
      })
    })
  },

})