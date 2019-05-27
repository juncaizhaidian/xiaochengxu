  var us = require('../../lib/underscore');
var constant = require('../../common/js/constant');
var calendar = require('../../utils/util').calendar;  
Page({
	data:{
		
	},
  selectDate:function(e){
    var weekIdx = e.currentTarget.dataset.weekidx/1;
    var daysIdx = e.currentTarget.dataset.daysidx/1;
    var calendar = this.data.calendar;
    for(var i = 0 ; i<calendar.length; i++){
      var c_week = calendar[i].weeks;
      for(var j = 0 ; j<c_week.length;j++){
        var c_date = c_week[j];
        if(i===weekIdx && j===daysIdx){
          c_date.isSelect=true;
          this.setData({selectDate:c_date});
        }else{
          c_date.isSelect=false;
        }

      }
    }
    this.setData({calendar:calendar});
  },
  onLoad: function () {
    // wxService.clearStorage();
    _fn.getCurPage().setData({
      now:new Date().getTime(),
      days:constant.calendar.dayShort,
      calendar:calendar.getCalendarData('m'),
      selectDate:calendar.getToday()
    });
  }  	
});

var _fn = {
  init:function(){
    _fn.groupTask();
  },
  getCurPage:function(){
    return us.last(getCurrentPages());
  },
  groupTask:function(){
    var ms = new Date().getTime();
    taskService.getDayTasks({ms:ms},function(taskList){
      var penList = taskService.filterTaskByStatus(taskList,constant.taskStatus.pending);
      var curList = taskService.filterTaskByStatus(taskList,constant.taskStatus.current);
      var finList = taskService.filterTaskByStatus(taskList,constant.taskStatus.finish);

      penList = taskService.orderTaskByStartTime(penList,constant.orderType.asc);
      curList = taskService.orderTaskByEndTime(curList,constant.orderType.asc);
      finList = taskService.orderTaskByEndTime(finList,constant.orderType.desc);

      var groupTask = {
        penList:penList,
        curList:curList,
        finList:finList
      };
      _fn.getCurPage().setData({
        groupTask:groupTask
      });
    });
  }  
};