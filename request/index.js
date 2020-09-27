export const request=(params)=>{
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
        }
      })
    })
 }
