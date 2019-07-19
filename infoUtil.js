var slideLock = false;
function showInfo(data, hilite=-1){
  clearInfoDiv();
  if(data.University=="中国政法大学"){
	map.centerAndZoom(new BMap.Point(data.Lat,data.Lng),12);
  }else{
  	map.centerAndZoom(new BMap.Point(data.Lat,data.Lng),9);
  }
  //这里用大学名作判断条件，仅作测试，后期将改为城市判断
  var sContent = '<div class="infoUniversity"><div id="title_bar">'
  if (hilite == -2){
    sContent += '<b>&emsp;' + data.University + '</b>'
  }else{
    //Browser compatibility
    sContent += '<span>&emsp;' + data.University + '</span>'
  };
  sContent += '<span id="open_map_trigger" onclick="toggleOpenMap()"><b>· · ·</b></span>'
  sContent += '</div><div id="student_ul" onclick="clearInfoDiv()">'
  sContent += getMoreContent(data) + '<ul>';
  data.Students.forEach(function(student, index){
    var studentInfo = student.split("@");
    var studentHTML = '<li class="info_li">' + studentInfo[0];
    if (studentInfo.length > 1){
      var attr = [ '专业：','电话：']
      studentHTML += '<ul>'
      for (var i=1; i<studentInfo.length; i++){
        info = studentInfo[i]
        if (info != ''){
          studentHTML += '<li>' + attr[i-1] + info + '</li>'
        }
      }
      studentHTML += '</ul>'
    }
    studentHTML += '</li>'
    if (index == hilite){
      sContent += '<b style="color:yellow;">' + studentHTML + '</b>'
    }else{
      sContent += studentHTML
    }});
  sContent += '</ul><p style="font-size: 12px; text-align: center"><br/>轻触关闭窗口</p><br></div></div>';
  map.setCenter(data.Marker.getPosition());
  sContent = $.parseHTML(sContent);
  $(sContent).appendTo("body")
  $("body").add(sContent);
}
function clearInfoDiv(){
  zoom=map.getZoom()
  if (zoom>6){
  	map.centerAndZoom(new BMap.Point(119,35),6);
  }
  $(".infoUniversity").remove()
}
function toggleOpenMap(){
  $("#open_maps").slideToggle()
  $("#student_ul").scrollTop(0);
}
function getMoreContent(data){
  var moreContent = '<div id="open_maps">';
  moreContent += `<a href="javascript:showWay(${data.Lng},${data.Lat});clearInfoDiv()">直接去蹭饭</a><br/>`;
  var UA = window.navigator.userAgent.toLocaleLowerCase()
  if(/iphone|ipad|ipod/.test(UA)){//ios
    moreContent += `<a href="baidumap://map/marker?location=${data.Lat},${data.Lng}&coord_type=bd09ll&title=${data.University}&content=${data.University}&src=ios.tg2019303.ioPage">`;
  }else{
    moreContent += `<a href="bdapp://map/marker?location=${data.Lat},${data.Lng}&coord_type=bd09ll&title=${data.University}&content=${data.University}&src=andr.tg2019303.ioPage">`;
  }
  moreContent += '百度地图App</a><br/>'
  my = getmylocation()
  moreContent += `<a href="http://api.map.baidu.com/direction?origin=latlng:${my.lat},${my.lng}|name:我的位置&destination=latlng:${data.Lat},${data.Lng}|name:${data.University}&&region=浙江&mode=driving&output=html&src=webapp.baidu.openAPIdemo" target="blank" onClick="reminder()">百度地图网页版</a>`
  moreContent += '</div>'
  return moreContent;
}
