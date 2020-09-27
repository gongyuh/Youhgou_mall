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
  }
})