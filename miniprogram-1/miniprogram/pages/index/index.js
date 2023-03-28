Component({
    options: {
      addGlobalClass: true,
    },
    data: {
      elements: [
        { title: '苹果', name: 'apple', color: 'gradual-red', icon: 'apple' },
        { title: '樱桃', name: 'cherry', color: 'red  light', icon: 'cherry' },
        { title: '玉米', name: 'corn', color: 'yellow  light', icon: 'corn' },
        { title: '葡萄', name: 'grape', color: 'purple light', icon: 'grape' },
        { title: '柑橘', name: 'orenge', color: 'orange', icon: 'orenge' },
        { title: '桃子', name: 'peach', color: 'pink light', icon: 'peach' },
        { title: '辣椒', name: 'chili', color: 'red', icon: 'chili' },
        { title: '马铃薯', name: 'potato', color: 'brown light', icon: 'potato' },
        { title: '草莓', name: 'strawberry', color: 'gradual-pink', icon: 'strawberry' },
        { title: '番茄', name: 'tomato', color: 'gradual-orange', icon: 'tomato' },
      ],
    },
    methods:{
        image(){
            const that=this
            wx.chooseMedia({
              count: 9,
              mediaType: ['image','video'],
              sourceType: ['album', 'camera'],
              maxDuration: 30,
              camera: 'back',
              success (res) {
                // that.setData({
                //     loadModal: true
                //   })
                wx.showLoading({  // 显示加载中loading效果 
                    title: "加载中",
                    mask: true  //开启蒙版遮罩
                  });
               const tempFiles = res.tempFiles
               // console.log(res)
                wx.uploadFile({
                  url: 'http://10.168.1.234:8080/func/', //仅为示例，非真实的接口地址  /file/upload
                  filePath: tempFiles[0].tempFilePath,
                  name: 'img',
                  header: {
                    "Content-Type": "multipart/form-data"
                  },
                  success (res){
                    const data = JSON.parse(res.data)

                    that.setData({
                        loadModal: false
                      })
                      wx.hideLoading();   
                    if(data==62)
                    {
                        wx.showModal({
                            title: '病虫害识别',
                            content: '未检测出照片所属植物',
                            showCancel: true,
                            cancelText: '关闭',
                        })
                    }
                    //do something
                    else if([0,6,9,17,24,27,30,33,38,411].indexOf(data)!=-1)
                    {
                        wx.showModal({
                            title: '病虫害识别',
                            content: '🎇，这是一株健康的植物',
                            showCancel: true,
                            cancelText: '关闭',
                        })
                    }
                    else {                      
                        wx.navigateTo({   //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）后续可以使用wx.navigateBack 可以返回;
                        url:"/pages/card/card?id="+data
                      })}
                    
                  },
                  fail(res){
                    console.log("很不幸，失败了",res)
                    that.setData({
                        loadModal: false
                      })
                  }
                })
              }
            })
          },

    }
  })
  