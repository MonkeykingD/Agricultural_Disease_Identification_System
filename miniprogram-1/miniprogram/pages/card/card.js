// pages/findList/findList.js
const db=wx.cloud.database()
Page({
 
    /**
     * 页面的初始数据
     */
    data: {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            id:options.id
        })
        let that=this
        let x=Number(this.data.id)
        let arr=[]
        arr.push(x)
        db.collection('diseas').where({
            labelid:db.command.in(arr)
        }).get({
            success: function(res) {
              // res.data 包含该记录的数据
              console.log(res.data[0].picture)
              that.setData({
                  name:res.data[0].name,
                  zhengzhuang:res.data[0].zhengzhuang,
                  bingyuan:res.data[0].bingyuan,
                  chuanbo:res.data[0].chuanbo,
                  fangzhi:res.data[0].fangzhi,
                  picture:res.data[0].picture
              })

            },
            fail: function(res){
                console.log(res)
            }
          })
    },
    onShow: function(){
    }
  })