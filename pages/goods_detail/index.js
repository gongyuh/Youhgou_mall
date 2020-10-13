import { request } from "../../request/index.js";

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  //全局对象，商品对象
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const {good_id}=options;
      this.getGoodsDetail(good_id)
  },

  // 获取商品的详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsInfo = goodsObj;
    this.setData({
      goodsObj
    })
  },
   // 点击轮播图 放大预览
 handlePrevewImage(e) {
  // 1 先构造要预览的图片数组 
  const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
  // 2 接收传递过来的图片url
  const current = e.currentTarget.dataset.url;
  wx.previewImage({
    current,
    urls
  });

  },

  // 点击 加入购物车
  handleCartAdd() {
    // 1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    
    // 2 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      //3  不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 4 已经存在购物车数据 执行 num++
      cart[index].num++;
    }
    // 5 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 6 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });
  }
})

