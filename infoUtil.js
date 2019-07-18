function showInfo(data, hilite=-1){
  clearInfoDiv();
  var sContent = '<div class="infoUniversity">'
  if (hilite == -2){
    sContent += '<b>' + data.University + '</b>'
  }else{
    sContent += data.University
  };
  sContent += '<hr>'
  sContent += '<button onclick="toggleOpenMap()" id="open_map_trigger">外部地图</button><div id="open_maps">';
  sContent += `<a href=bdapp://map/marker?location=${data.Lat},${data.Lng}&coord_type=bd09ll&title=${data.University}&src=andr.baidu.openAPIdemo> 百度地图 </a>`;
  sContent += `<a href="https://apis.map.qq.com/uri/v1/marker?marker=coord:${data.Lat},${data.Lng};title:${data.University};&referer=myapp"> 腾讯地图 </a>`
  sContent += `<a href="//uri.amap.com/marker?position=${data.Lng},${data.Lat}&name=${data.University}&src=mypage&coordinate=gaode&callnative=0"> 高德地图 </a>`
  sContent +='<br/><p>注意：腾讯和高德的定位会有偏差，<br/>如要使用请自行调整。</p>'
  // $("#open_map_trigger").click();
  sContent += '</div>'
  sContent += '<div onclick="clearInfoDiv()"><ul>';
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
      sContent += '<b>' + studentHTML + '</b>'
    }else{
      sContent += studentHTML
    }});
  sContent += '</ul><p style="font-size: 12px; align: center"><br/>轻触关闭窗口</p></div></div>';
  map.setCenter(data.Marker.getPosition());
  sContent = $.parseHTML(sContent);
  $(sContent).appendTo("body")
  $("body").add(sContent);
}
function clearInfoDiv(){
  $(".infoUniversity").remove()
}
function toggleOpenMap(){
  $("#open_maps").slideToggle()
}
