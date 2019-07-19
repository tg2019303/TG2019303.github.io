function showInfo(data, hilite=-1){
  clearInfoDiv();
  var sContent = '<div class="infoUniversity">'
  if (hilite == -2){
    sContent += '<b>' + data.University + '</b><b'
  }else{
    sContent += data.University
  };
  sContent += '<hr><div id="open_maps" onclick="reminder()">';
  sContent += `<a class="button" href=bdapp://map/marker?location=${data.Lat},${data.Lng}&coord_type=bd09ll&title=${data.University}&src=andr.baidu.openAPIdemo>App打开</a></div>`;
  sContent += '<div id="bdreminder"><p>没反应？请下载百度地图APP<br/>或使用浏览器打开此页面</p></div>'
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
function reminder(){
  setTimeout('$("#bdreminder").slideToggle()',1000)
  setTimeout('$("#bdreminder").slideToggle()',4000)
}
