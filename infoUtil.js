function showInfo(data, hilite=-1){
  clearInfoDiv();
  var sContent = '<div class="infoUniversity" onclick="clearInfoDiv()">'
  if (hilite == -2){
    sContent += '<b>' + data.University + '</b>'
  }else{
    sContent += data.University
  };
  sContent += '<ul>';
  data.Students.forEach(function(student, index){
    var studentInfo = student.split("@");
    var studentHTML = '<li calss="info_li">' + studentInfo[0];
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
  sContent += '</ul><p style="font-size: 12px; align: center"><br/>轻触关闭窗口</p></div>';
  map.setCenter(data.Marker.getPosition());
  sContent = $.parseHTML(sContent);
  $(sContent).appendTo("body")
  $("body").add(sContent);
}
function clearInfoDiv(){
  $(".infoUniversity").remove()
}
