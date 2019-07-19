var map = new BMap.Map("allmap");//创建地图实例
var current_id = 0;
var current_location
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
  setInterval(function(){map.clearOverlays();universities.forEach(setMarker)}, 1800)
  selfLocation()
}
function aerialView(){
  clearInfoDiv();
  map.centerAndZoom(new BMap.Point(119,35),6);//初始化地图，point为中心点，缩放级别为6
   map.setMapStyleV2({styleId: 'a5fddb25f2312728e44a8dd938e24fd2'});
}
function selfLocation(){
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
		  var marker=new BMap.Marker(r.point)
		  current_location=new BMap.Point(r.point.lng,r.point.lat)
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
		current_location=new BMap.Point(120.54572,30.645852)
	}        
});}

function setMarker(data, index){
  var point = new BMap.Point(data.Lng, data.Lat);
  var mk = new BMap.Marker(point);
  var label = new BMap.Label('<b>'+data.University+'</b>');
  data.Marker = mk;
  var index = Math.floor((Math.random() * 300) + 20);
  mk.setZIndex(index)
  mk.setLabel(label);
  mk.disableDragging();// 不可拖拽
  map.addOverlay(mk);
  label.setStyle({
    borderColor: "#808080",
    borderWidth: 2,
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

function showWay(lng,lat){
	var start = current_location
    var end = new BMap.Point(lng,lat)
	var transit = new BMap.TransitRoute(map, { 
    renderOptions: { 
        map: map, 
        autoViewport: true

    },

    // 配置跨城公交的换成策略为优先出发早

    intercityPolicy: BMAP_INTERCITY_POLICY_EARLY_START

    // 配置跨城公交的交通方式策略为飞机优先

    //transitTypePolicy: BMAP_TRANSIT_TYPE_POLICY_AIRPLANE

});


transit.search(start, end);
}
function getmylocation(){
	try{console.log(current_location.lat)}catch(err){
		current_location=new BMap.Point(120.54572,30.645852)
	
}return current_location}
