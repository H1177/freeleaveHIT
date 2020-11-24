
function do_req(){ 
  var date = date_queue.shift();
  if(date == undefined){
    $.alert("完成");
    setTimeout("fanhui()",2000);
    return;
  }else{
    console.log(date);
    $.ajax({
		url : "/zhxy-xgzs/xg_mobile/xsCxsq/getCxsq", 
		type : "Post",
		dataType : "json", 
		data : {info:JSON.stringify({id : "id"})},
		success : function(result) { 
			if (!result.isSuccess) {
				$.toptip("获取申请出校信息失败","warning");  
			} else { 
				var jbxx = result.module.jbxx[0];
				xslb = jbxx.xslb;
				var id = result.module.id;
        var data = {
          rq  : date,
          cxly  : reason [Math.floor(Math.random() * reason.length)],
          cxlx  : "01",
          yjlxjsrq  : "",
          id : id
        };

         $.ajax({
            async: false,
            url : "/zhxy-xgzs/xg_mobile/xsCxsq/saveCxsq",   
            type : "POST",
            dataType : "json",
            data : {info:JSON.stringify({model : data})},
            success: function(result){   
                if(result.isSuccess){ 
                    console.log("提交成功"+" - "+data.rq); 
                  	$.toptip("提交成功"+" - "+data.rq)
                  	do_req();
                }else{
                    console.log(result.msg+" - "+data.rq);
                  	$.toptip(result.msg+" - "+data.rq)
                  	do_req();
                   
                }
            },
            error : function(){  
              console.log("操作失败");
              do_req();
            }
        });

			}    
		},
		error : function() {
			$.toptip("获取返校失败","warning");
		}
	});
  
  
  }
}
var reason = ["吃午饭","购买生活用品","买东西","理发","吃饭","采购","买书","购物","买水果","剪头发","吃晚饭"];

var day = new Date();
var date_queue = new Array();
for(var i=0;i<=7;i++){	
  var rq = day.getFullYear()+"-"+(day.getMonth()+1)+"-"+day.getDate();
  date_queue.push(rq);
  day.setDate(day.getDate()+1);
}

do_req();



