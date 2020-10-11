let ajaxTimes=0;
export const request=(params)=>{
  
  ajaxTimes++;

  //显示加载中效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });



  // 定义公众的URL
  // https://api-hmugo-web.itheima.net/api/public/v1/categories
  const baseURL="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
      wx.request({
        ...params,
        url:baseURL+params.url,
        success:(result)=>{
          resolve(result.data.message);
        },
        fail:(err)=>{
          reject(err);
        },
        complete:()=>{
          ajaxTimes--;
          if(ajaxTimes===0){
            //  关闭正在等待的图标
            wx.hideLoading();
          }
         }
      })
    })
 }
