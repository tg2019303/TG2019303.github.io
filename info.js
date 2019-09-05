var vapp = new Vue({
  el: '#vapp',
  data: {
    show_info_div: false,
    show_more: false
  }
})
function showInfo(data, hilite=-1){
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
}