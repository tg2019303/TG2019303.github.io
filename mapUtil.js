var map//创建地图实例
var current_id = 0;
var current_location
var index_list,isNotShowWay="True"
var pointer_color = "#ec2d2d"
var ico

function loadJScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://api.map.baidu.com/api?v=3.0&ak=MBGMU4ffOvlXQ7tD3Me88nyxVAhxK5Hs&callback=initMap";
  document.body.appendChild(script);
}

function initMap() {
  //初始化地图 默认加载北京天安门
  map = new BMap.Map("allmap");
  current_location=new BMap.Point(120.54572,30.645852)
  var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_LARGE});
  map.addControl(ctrl_nav);
  //向地图中添加缩略图控件
  var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
  map.addControl(ctrl_ove);
  map.centerAndZoom(new BMap.Point(119,35),6);//初始化地图，point为中心点，缩放级别为6
  map.setMapStyleV2({styleId: 'a5fddb25f2312728e44a8dd938e24fd2'});
  map.enableScrollWheelZoom();
  index_list=Array.from({length:universities.length}).map((item,index)=>{
    return index;
  });
  //根据 pointer_color 动态构建 SVG
  var mySVG = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="19px" height="25px" viewBox="0 0 19 25" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,25.000000) scale(0.100000,-0.100000)" stroke="none"> <path fill="${pointer_color}" d="M35 215 c-44 -43 -32 -105 37 -188 l23 -29 43 57 c33 45 42 66 42 97 0 52 -35 88 -85 88 -25 0 -44 -8 -60 -25z m41 0 c-16 -9 -35 -23 -42 -33 -14 -18 -19 -5 -6 14 10 15 44 33 62 34 8 0 2 -7 -14 -15z"/> </g> </svg>`
  var mySVG64 = "data:image/svg+xml;base64," + window.btoa(mySVG);
  ico = new BMap.Icon(mySVG64, new BMap.Size(19, 25), {anchor: new BMap.Size(10, 25)})
  //新建标注
  universities.forEach(setMarker);
  selfLocation()
  showLocation()
  setInterval(function(){if(isNotShowWay=="True"){map.clearOverlays();randomOrder();universities.forEach(setMarker);showLocation()}}, 1500)
  getDataZoom();
  console.log(pointer_color)
}

function aerialView(){
  clearInfoDiv();
  //去掉flag使导航信息在下一次 clearOverlays 中去除
  isNotShowWay="True"
  map.centerAndZoom(new BMap.Point(119,35),6);//初始化地图，point为中心点，缩放级别为6
}

function selfLocation(){
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      current_location=new BMap.Point(r.point.lng,r.point.lat)
    }
  });
}

function showLocation(){
  var marker=new BMap.Marker(current_location)
  var lab = new BMap.Label('<b>我的位置</b>', {offset: new BMap.Size(0, -4)})
  marker.setLabel(lab)
  map.addOverlay(marker)
}


function setMarker(data, index){
  var point = new BMap.Point(data.Lng, data.Lat);
  var mk = new BMap.Marker(point);
  var label = new BMap.Label('<b>'+data.University+'</b>', {offset: new BMap.Size(0, -4)});
  data.Marker = mk;
  //var index = Math.floor((Math.random() * 300) + 20);
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
    //swap the values of i and randomIndex, like random.shuffle
    var itemIndex = index_list[randomIndex];
    index_list[randomIndex] = index_list[i];
    index_list[i] = itemIndex;
  }
}

function getDataZoom(){
  for (var i=0; i<universities.length; i++){
    var p0 = new BMap.Point(universities[i].Lng, universities[i].Lat)
    var min_dis = 300000; // Just big enough
    for(var j=0; j<universities.length; j++){
      //不要自己和自己比，那将是0
      if (i == j){continue}
      var p1 = new BMap.Point(universities[j].Lng, universities[j].Lat)
      var dis = map.getDistance(p0, p1)
      if (dis < min_dis){min_dis = dis}
    }
    universities[i].Zoom = Math.max(getZoom(min_dis), 6);
    universities[i].min_dis = min_dis;
  }
}
function getZoom (min_dis) {
  var zoom = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000, 200000]//级别18到6，再小用不着
  for (var i = 0,zoomLen = zoom.length; i < zoomLen; i++) {
    if(zoom[i] - min_dis > 0){
      return 18-i+1;//再略大一号
    }
  };
  return 6;
}
