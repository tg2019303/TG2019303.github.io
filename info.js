var vapp = new Vue({
  el: '#vapp',
  data: {
    show_info_div: false,
    show_more: false
  }
})
function showInfo(data, hilite=-1){
  // I don't know why force update is needed
  vapp.show_info_div = false;
  vapp.data = data;
  vapp.show_info_div = true;
  vapp.hilite_univ = (hilite == -2);
  vapp.hilite_index = hilite;
  var UA = window.navigator.userAgent.toLocaleLowerCase();
  if(/iphone|ipad|ipod/.test(UA)){ // ios
    vapp.ios = true
  }else{
    vapp.ios = false
  }
  vapp.my = getmylocation();
  console.log(vapp)
  // map.centerAndZoom(data.Marker.getPosition(), Math.max(data.Zoom, map.getZoom()));
  // 采用平移动画
  // 先 setZoom 再 panTo，否则中心点不准
  map.setZoom(Math.max(data.Zoom, map.getZoom()))
  map.panTo(data.Marker.getPosition())
}