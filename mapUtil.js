var map = new BMap.Map("allmap");//创建地图实例
var current_id = 0;
var current_location=new BMap.Point(120.54572,30.645852)
var index_list,isNotShowWay="True"
function initMap() {
  //初始化地图 默认加载北京天安门
  var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_LARGE});
  map.addControl(ctrl_nav);
  //向地图中添加缩略图控件
  var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
  map.addControl(ctrl_ove);
  //向地图中添加比例尺控件
  //var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
  //map.addControl(ctrl_sca);
  map.centerAndZoom(new BMap.Point(119,35),6);//初始化地图，point为中心点，缩放级别为6
  map.setMapStyleV2({styleId: 'a5fddb25f2312728e44a8dd938e24fd2'});
  map.enableScrollWheelZoom();
  //新建标注
  index_list=Array.from({length:universities.length}).map((item,index)=>{
    return index;
  });
  universities.forEach(setMarker);
  selfLocation()
  showLocation()
  setInterval(function(){if(isNotShowWay=="True"){map.clearOverlays();randomOrder();universities.forEach(setMarker);showLocation()}}, 1500)
  getDataZoom();
  console.log(universities)
}
function aerialView(){
  clearInfoDiv();
  isNotShowWay="True"
  map.centerAndZoom(new BMap.Point(119,35),6);//初始化地图，point为中心点，缩放级别为6
}
function selfLocation(){
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
		  current_location=new BMap.Point(r.point.lng,r.point.lat)
		}
});}

function showLocation(){
	var marker=new BMap.Marker(current_location)
	var lab = new BMap.Label('<b>我的位置</b>')
		  marker.setLabel(lab)
		  map.addOverlay(marker)
		  lab.setStyle({
			borderColor: "#808080",
			borderWidth: 2,
			color: "#ddd",
			cusor: "pointer",
			backgroundColor: "#ec2d2d"
		  })
}


function setMarker(data, index){
  var point = new BMap.Point(data.Lng, data.Lat);
  var mk = new BMap.Marker(point);
  var label = new BMap.Label('<b>'+data.University+'</b>');
  data.Marker = mk;
  //var index = Math.floor((Math.random() * 300) + 20);
  mk.setZIndex(index_list[index])
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
  isNotShowWay="False"
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

function randomOrder(){

	
	 var len = index_list.length
    for(var i = index_list.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemIndex = index_list[randomIndex];
        index_list[randomIndex] = index_list[i];
        index_list[i] = itemIndex;
    }
}

function getDataZoom(){
  for (var i=0; i<universities.length; i++){
    var p0 = new BMap.Point(universities[i].Lng, universities[i].Lat)
    var min_dis = 300000; // JUst big enough
    for(var j=0; j<universities.length; j++){
      if (i == j){continue}
      var p1 = new BMap.Point(universities[j].Lng, universities[j].Lat)
      var dis = map.getDistance(p0, p1)
      if (i == 15){console.log(dis)}
      if (dis < min_dis){min_dis = dis}
    }
    universities[i].Zoom = Math.max(getZoom(min_dis), 6);
    universities[i].min_dis = min_dis;
  }
}
function getZoom (min_dis) {
  var zoom = ["50","100","200","500","1000","2000","5000","10000","20000","25000","50000","100000","200000","500000","1000000","2000000"]//级别18到3。
  for (var i = 0,zoomLen = zoom.length; i < zoomLen; i++) {
    if(zoom[i] - min_dis > 0){
      return 18-i;//之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
    }
  };
}

