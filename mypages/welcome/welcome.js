// pages/welcome/welcome.js
let app = getApp();
// 获取数据库引用
const db = wx.cloud.database();
const userListDB = db.collection('salesman');

let username = null;
let password = null;

Page({
	data:{
		
	},
 //输入用户名
 inputName:function(evnet) {

  username = evnet.detail.value;

 },
 //输入密码
 inputPassword(evnet) {
  //console.log(evnet.detail.value);
  password = evnet.detail.value;
 },

	myevent:function(e){
		console.log(e);
	},
	dlClick : function() {
  	  console.log(username);
  	  console.log(password);
  	  //let Lname=userListDB.doc('XOVXTPdsX1oQesZh');
/*  	  userListDB.doc('XOVXTPdsX1oQesZh').get({
    success(res) {
        console.log(res),
        console.log(res.data),
        console.log(res._id),
        console.log(res.data._id)
    }
})*/      
/*userListDB.add({
    data:{
        _id:'西一一楼',
        location:new db.Geo.Point(113,23),
        place:'西区'
    },
    success(res){
        console.log(res)
    },
    fail:console.error
})*/

  	  //console.log(Lname);
  	  let that = this;

/*  	  wx.switchTab({   //跳转首页
                url: '/mypages/index/index',  //这里的URL是你登录完成后跳转的界面
              })*/
/*		  if (username==null||password==null) {
		  	console.log('没输入');
		     return;
		  }*/
		  //登陆获取用户信息
//		  userListDB.where({
//					   mobile_number: username
//			  }).get({
/*			userListDB.get({
   success: function(res) {
    let userInfos = res.data;
    console.log(res.data)
    if (userInfos && userInfos.length > 0) {
     let user = userInfos[0];
     if (user.password !== password) {
      console.log('密码不匹配');
     } 
     else {
      console.log('登陆成功');
      let jsonStr=JSON.stringify(user);
  	  wx.switchTab( {
			url : '../index/index?jsonStr'+jsonStr
				} );
			}	
		}	
		else {
			app.showTips('用户不存在');
		}
	}
})*/
    userListDB.get({
      success:(res)=>{
        let user = res.data;
        let flag = false;
        console.log(res.data);
        for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
          if (username === user[i].mobile_number) { //用户名存在
            if (password !== user[i].password) {  //判断密码是否正确
              flag=true;
              console.log('密码错误！');
              wx.showToast({
                title: '密码错误！！',
                icon: 'success',
                duration: 2500
              })
            } else {
              console.log('登陆成功！');
              app.globalData.userName=username;
              flag=true;
              wx.showToast({
                title: '登录成功！！',
                icon: 'success',
                duration: 2500
              })
              wx.switchTab({   //跳转首页
                url: '/mypages/index/index',  //这里的URL是你登录完成后跳转的界面
              })
            }
          }else{   //不存在
            if(!flag){wx.showToast({
              title: '无此用户名！！',
              icon: 'success',
              duration: 2500
            })
          }
          }
        }
      }
    })


}

});