import WxValidate from '../../utils/WxValidate.js'

const db = wx.cloud.database();
const chanelDB = db.collection('salechanel');
const projectDB = db.collection('projectlist');
let app = getApp();
let ddd = null;

Page({  

  data: {  

    chanelname:[
    '自然客户'
    
    ],
    index:0,
    showModalStatus: false,
    showModalStatus1: false
    

  },
    toDayTask:function(e){
    //var ms = e.currentTarget.dataset.ms;
    wx.navigateTo({//youbug
      url:'../daytask/daytask'
    })
  },  
  
     // 初始化表单校验
    initValidate1(){
        // 创建实例对象
        this.validate1 = new WxValidate({
            rName: {
                required: true,
                maxlength: 10
            },
            mobile: {
                required:true,
                tel: true
            },
            company: {
            		required:true
            }
        }, {
                rName: {
                    required: '请输入渠道联系人名字!',
                    maxlength: '名字不得超过五个字!'
                },
                mobile: {
                    required: '请输入渠道联系人手机号码!',
                    tel: '请输入11位手机号码!'
                },
                company: {
                		required: '请输入联系人所属公司!'
                }
            })
    },
     // 初始化表单校验
    initValidate2(){
        // 创建实例对象
        this.validate2 = new WxValidate({
            rName: {
                required: true,
                maxlength: 10
            },
            /*mobile: {
                required:true,
                tel: true
            },*/
            address: {
            		required:true
            }
        }, {
                rName: {
                    required: '请输入客户名字!',
                    maxlength: '名字不得超过五个字!'
                },
                /*mobile: {
                    required: '请输入客户手机号码!',
                    tel: '请输入11位手机号码!'
                },*/
                address: {
                		required: '请输入楼盘地址!'
                }
            })
    },
	changePicker:function(e) {
		this.setData({
			index:e.detail.value
		});
	},

  submit:function(e) {//将弹窗表单数据写入数据库
  	console.log(ddd);
  	switch(ddd) {
  		case 1:
  		console.log(ddd);
  		// 校验表单
      if (!this.validate1.checkForm(e.detail.value)){
            const error = this.validate1.errorList[0];
            wx.showToast({
                title: `${error.msg} `,
                icon: 'none'
            })
            return false
      }

	  	chanelDB.add({
		    data:{
	        _id:e.detail.value.mobile,
	        chanel_name:e.detail.value.rName,
	        company:e.detail.value.company,
	        hobbie:e.detail.value.hobbie,
	        comment:e.detail.value.bz,
	        relation_saler:app.globalData.userName,
	        reg_time:new Date()
		    },
		    success(res){
	        console.log(res)
		    },
		    fail:console.error
			})
			break;
			case 2:
			let cindex=this.data.index;
			//console.log(this.data.chanelname[cindex]);
			// 校验表单
      if (!this.validate2.checkForm(e.detail.value)){
            const error = this.validate2.errorList[0];
            wx.showToast({
                title: `${error.msg} `,
                icon: 'none'
            })
            return false
      }
      projectDB.add({
		    data:{
	        mobile_phone:e.detail.value.mobile,
	        customer_name:e.detail.value.rName,
	        pjt_address:e.detail.value.address,
	        rel_chanel:this.data.chanelname[cindex],
	        comment:e.detail.value.bz,
	        relation_saler:app.globalData.userName,
	        reg_time:new Date()
		    },
		    success(res){
	        console.log(res)
		    },
		    fail:console.error
			})
			break;
			default:
			
		}

  	this.util('close')
  },
  
  powerDrawer: function (e) {  

    ddd = 1;
    this.initValidate1()
    var currentStatu = e.currentTarget.dataset.statu;  
		
    this.util(currentStatu)  

  },
  
  powerDrawer1: function (e) {  
    let that=this;
    //that.data.times[0]='chenxianlin';
    //console.log(that.data.times);
    
    ddd = 2;
    this.initValidate2()
		chanelDB.where({
    relation_saler:app.globalData.userName
		})
    .get({
        success(res) {
            //console.log(res.data[0].chanel_name);
            let i=0;
            //var chanellist ;
            for (i=0;i<res.data.length;i++)
            	{
            		//chanellist[i]=res.data[i].chanel_name;
            		that.data.chanelname[i+1]=res.data[i].chanel_name;
            		
            	}
            that.setData({
    					chanelname:that.data.chanelname
    				});
            console.log(that.data.chanelname);
            
        }
    })

    var currentStatu = e.currentTarget.dataset.statu;  

    this.util(currentStatu)  

  },  

  util: function(currentStatu){  

    /* 动画部分 */  

    // 第1步：创建动画实例   

    var animation = wx.createAnimation({  

      duration: 200,  //动画时长  

      timingFunction: "linear", //线性  

      delay: 0  //0则不延迟  

    });  

      

    // 第2步：这个动画实例赋给当前的动画实例  

    this.animation = animation;  

  

    // 第3步：执行第一组动画  

    animation.opacity(0).rotateX(-100).step();  

  

    // 第4步：导出动画对象赋给数据对象储存  

    this.setData({  

      animationData: animation.export()  

    })  

      

    // 第5步：设置定时器到指定时候后，执行第二组动画  

    setTimeout(function () {  

      // 执行第二组动画  

      animation.opacity(1).rotateX(0).step();  

      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  

      this.setData({  

        animationData: animation  

      })  

        

      //关闭  

      if (currentStatu == "close") {  

        switch(ddd) {
        	case 1:
        		this.setData({
          		showModalStatus: false
          		});  
					break;
					case 2:
						this.setData({
          		showModalStatus1: false
          		}); 
          	break;
          default:
         }  
      }  

    }.bind(this), 200)  

    

    // 显示  

    if (currentStatu == "open") {  

      switch(ddd) {
        	case 1:
        		this.setData({
          		showModalStatus: true
          		});  
					break;
					case 2:
						this.setData({
          		showModalStatus1: true
          		}); 
          	break;
          default:
         }  

    }  

  }  

  

})  