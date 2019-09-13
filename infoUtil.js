var vapp = new Vue({
  el: '#vapp',
  data: {
    show_info_div: false,
    show_more: false
  },
  methods: {
    toggleShow: function() {
      $("#student_ul").scrollTop(0);
      this.show_more=!this.show_more
    },
    scrollTo: function() {
      var container = $("#student_ul"), target = $(".student_hilite");
      container.scrollTop(target.offset().top-container.offset().top-30);
    }
  }
})

function showInfo(data, hilite = -1) {
  // I don't know why force update is needed
  vapp.show_info_div = false;
  vapp.data = data;
  vapp.show_info_div = true;
  vapp.hilite_univ = (hilite == -2);
  vapp.hilite_index = hilite;
  if (hilite >= 0) {
    setTimeout(vapp.scrollTo, 300)
  }
  var UA = window.navigator.userAgent.toLocaleLowerCase();
  if (/iphone|ipad|ipod/.test(UA)) { // ios
    vapp.ios = true
  } else {
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