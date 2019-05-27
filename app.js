App( {
	onLaunch:function() {
		wx.cloud.init({
			env:'jczd833-bf7f77',
			traceUser: true
			})
		
		//小程序初始化完成时执行
	},
	onShow:function() {
		//显示小程序时执行
	},
	onHide:function() {
		//隐藏小程序时执行
	},
	globalFunction:'我是全局函数',
	globalData:{
		userName:null
	}
} );