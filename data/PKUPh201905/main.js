document.title = "来源分布图";
$("#class_name").text("所以班级正式名称是？")
$("#welcome_title b").text("来源分布")
$("#groupimg").remove()
$("#add_data").remove()
$("#seeus").remove()
init_point = [115, 35]
init_zoom = 5
function setMarker(data, index){
  var point = new BMap.Point(data.Lng, data.Lat);
  var mk = new BMap.Marker(point);
  var label = new BMap.Label('<b>'+data.Students[0].match(/>(.*?)<ul>/)[1]+'</b>', {offset: new BMap.Size(0, -4)});
  data.Marker = mk;
  mk.setZIndex(index_list[index])
  mk.setLabel(label);
  mk.setIcon(ico)
  mk.disableDragging();// 不可拖拽
  map.addOverlay(mk);
  //给标注点和标签添加点击事件。使用立即执行函数和闭包
  //Closure: function in function, lenthening the life time of variable
  (function() {
    mk.addEventListener("click",function(){
      showInfo(data);
    });
  })();
  (function() {
    label.addEventListener("click",function(){
      showInfo(data);
    });
  })();
}
