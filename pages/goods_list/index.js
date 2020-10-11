// pages/goods_list/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodList:[]
  },
  
  /* 接口要的参数 */
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.QueryParams.cid=options.cid;
    this.getGoodsList()
  },
  
  /* 获取商品列表的数据 */
  async getGoodsList(){
    console.log(this.QueryParams)
    const res=await request({url:"/goods/search"});
    this.setData({
      goodList:res.goods
    })

    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
    wx.stopPullDownRefresh();
  },

  /* 标题点击事件 从子组件传递过来的 */
  handleTabsItemChange(e){
    // console.log(e)
    // 1、获取被点击标题的索引
    const {index}=e.detail;
    // 2、修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3、赋值到setData中
    this.setData({
      tabs
    })
  },

  onReachBottom(){
    console.log('出发了')
  },

    // 下拉刷新事件 
    onPullDownRefresh(){
      // 1 重置数组
      this.setData({
        goodsList:[]
      })
      // 2 重置页码
      this.QueryParams.pagenum=1;
      // 3 发送请求
      this.getGoodsList();
    }
})