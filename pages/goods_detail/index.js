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

  }
})

