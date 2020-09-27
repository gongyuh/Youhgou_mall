// pages/category/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList:[],
    // 右侧的内容数据
    rightContent:[],
    // 被点击的左侧的菜单
    currentIndex:[],
    // 右侧内容的滚动条距离顶部的距离
    srollTop:0
  },
  // 接口的返回数据
    Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 1.先判断本地请求有没有旧的数据，没有就发送新的数据
    2.有旧的数据 并且旧的数据没有过期 就使用旧的数据即可 */
    const Cates=wx.getStorageSync("cates")
    /* 判断之后再调用函数 */
    if(!Cates){
      this.getCates();
    }else{
      /* 有旧数据 自己定义一个过期时间 */
      if(Date.now()-Cates.time>1000*10000){
        this.getCates()
      }else{
        /* 可以使用旧的数据了 */
        console.log("可以是旧的数据了")
        this.Cates=Cates.data;
        // 构造左侧大菜单数据
       let leftMenuList=this.Cates.map(v=>v.cat_name);
       // 构造右侧的商品数据
        let rightContent=this.Cates[0].children
       // 添加到数据到AppData当中
        this.setData({
         leftMenuList,
         rightContent
        })
      }
    }
    
  },
  // 获取分类的数据
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
    //   this.Cates=res.data.message;
    //   /* 把接口的数据储蓄到本地的储存中 */
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
    //   // 构造左侧大菜单数据
    //    let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   // 构造右侧的商品数据
    //    let rightContent=this.Cates[0].children
    //   // 添加到数据到AppData当中
    //    this.setData({
    //     leftMenuList,
    //     rightContent
    //    })
    // })

    /* 使用es7的 async await 发送异步请求 */
    const res=await request({url:"/categories"});
    // this.Cates=res.data.message;
    this.Cates=res
     /* 把接口的数据储蓄到本地的储存中 */
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
    // 构造左侧大菜单数据
     let leftMenuList=this.Cates.map(v=>v.cat_name);
    // 构造右侧的商品数据
     let rightContent=this.Cates[0].children
    // 添加到数据到AppData当中
     this.setData({
      leftMenuList,
      rightContent
     })
  },
  // 左侧菜单的点击事件
  handItemTap(e){
  //  1.获取点击标题上面的索引 
  // 2.给currentIndex赋值就可以了
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      // 重新设置，右侧内容的sroll-view标签距离顶部的距离
      srollTop:0
    }) 
  }
})