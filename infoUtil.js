var slideLock = false;
function showInfo(data, hilite=-1){
  clearInfoDiv();
  var doScroll = false;
  var sContent = '<div class="infoUniversity"><div id="title_bar">'
  univHTML = `&emsp;<a style="text-decoration:none;color:white" href="https://www.baidu.com/s?wd=${data.University}" target="blank">${data.University}</a>`
  if (hilite == -2){
    sContent += '<b><span id="univ_hilite">' + univHTML + '</span></b>'
  }else{
    //Use span for browser compatibility
    sContent += '<span>' + univHTML + '</span>'
  };
  sContent += '<span id="open_map_trigger" onclick="toggleOpenMap()"><b>· · ·</b></span>'
  sContent += '</div><div id="student_ul" onclick="clearInfoDiv()">'
  sContent += getMoreContent(data) + '<ul>';
  data.Students.forEach(function(student, index){
    if (index == hilite){
      sContent += '<b id="student_hilite">' + student+ '</b>'
      doScroll = true;
    }else{
      sContent += student
    }});
  sContent += '</ul><p style="font-size: 12px; text-align: center"><br/>轻触关闭窗口</p><br></div></div>';
  // map.centerAndZoom(data.Marker.getPosition(), Math.max(data.Zoom, map.getZoom()));
  // 采用平移动画
  // 先 setZoom 再 panTo，否则中心点不准
  map.setZoom(Math.max(data.Zoom, map.getZoom()))
  map.panTo(data.Marker.getPosition())
  sContent = $.parseHTML(sContent);
  $(sContent).appendTo("body")
  $("body").add(sContent);
  if (doScroll){
    var container = $("#student_ul");
    var target = $("#student_hilite");
    container.scrollTop(target.offset().top-container.offset().top-30);
  }
}
function clearInfoDiv(){
  $(".infoUniversity").remove()
}
function toggleOpenMap(){
  $("#more_action").slideToggle()
  //使内容的 div 滚回顶部以看见更多操作
  $("#student_ul").scrollTop(0);
}
function getMoreContent(data){
  var univContent = '<div id="more_action"><div id="univ_detail">';
  univContent += '地址：' + data.Address;
  if (data.Telephone != ''){
    univContent += '<br/>电话：' + data.Telephone
  }
  var moreContent = univContent + '</div>';
  moreContent += '<div id="open_maps">';
  moreContent += `<a href="javascript:showWay(${data.Lng},${data.Lat});clearInfoDiv()">直接去蹭饭</a><br/>`;
  var UA = window.navigator.userAgent.toLocaleLowerCase()
  if(/iphone|ipad|ipod/.test(UA)){//ios
    moreContent += `<a href="baidumap://map/marker?location=${data.Lat},${data.Lng}&coord_type=bd09ll&title=${data.University}&content=${data.University}&src=ios.tg2019303.ioPage">`;
  }else{
    moreContent += `<a href="bdapp://map/marker?location=${data.Lat},${data.Lng}&coord_type=bd09ll&title=${data.University}&content=${data.University}&src=andr.tg2019303.ioPage">`;
  }
  moreContent += '百度地图App</a><br/>'
  my = getmylocation()
  moreContent += `<a href="http://api.map.baidu.com/direction?origin=latlng:${my.lat},${my.lng}|name:我的位置&destination=latlng:${data.Lat},${data.Lng}|name:${data.University}&&region=浙江&mode=driving&output=html&src=webapp.baidu.openAPIdemo" target="blank">百度地图网页版</a>`
  moreContent += '</div></div>'
  return moreContent;
}
