var map = new BMap.Map("allmap");//创建地图实例
var current_id = 0;
function initMap() {
  //初始化地图 默认加载北京天安门
  var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_LARGE});
  map.addControl(ctrl_nav);
  //向地图中添加缩略图控件
  var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
  map.addControl(ctrl_ove);
  //向地图中添加比例尺控件
  var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
  map.addControl(ctrl_sca);
  aerialView();
  map.enableScrollWheelZoom(); 
  //新建标注
  universities.forEach(setMarker);
  selfLocation()
}
function aerialView(){
  clearInfoDiv();
  map.centerAndZoom(new BMap.Point(119,35),6);//初始化地图，point为中心点，缩放级别为6
}
function selfLocation(){
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
		  var marker=new BMap.Marker(r.point)
		  var lab = new BMap.Label('<b>我的位置</b>')
		  marker.setLabel(lab)
		  map.addOverlay(marker)
		  lab.setStyle({
			//borderColor: "#808080",
			borderWidth: 0,
			color: "#ddd",
			cusor: "pointer",
			backgroundColor: "#ec2d2d"
		  })
		}
	else {
		return
	}        
});}

function setMarker(data, index){
  var point = new BMap.Point(data.Lng, data.Lat);
  var mk = new BMap.Marker(point);
  var label = new BMap.Label('<b>'+data.University+'</b>');
  data.Marker = mk;
  mk.setLabel(label);
  mk.disableDragging();// 不可拖拽
  map.addOverlay(mk);
  label.setStyle({
    //borderColor: "#808080",
    borderWidth: 0,
    color: "#ddd",
    cusor: "pointer",
    backgroundColor: "#ec2d2d"
  });
  //给标注点添加点击事件。使用立即执行函数和闭包
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

function showWay(){
	
}