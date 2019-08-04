function search(){
  if ($("#search_button").text() == "搜索"){
    current_id = 0;
    query = $("#search_input").val();
    results = getAll(query);
    //简单判断是否进入搜索状态
    if(results == "" || query == ""){return}
    $("#search_button").text("下个");
    console.log(results);
  }
  current_id += 1;
  if (current_id >= results.length){
    current_id = 0
  }
  showInfo(results[current_id].item, results[current_id].hilite);
}
function entersearch(event){
  if (event.keyCode == 13){
    search();
  }else{
    //非回车键按下则认为内容改变，进入待搜索状态
    $("#search_button").text("搜索");
  }
}
function getAll(query){
  results = []
  //学生优先
  for(var i = 0; i < universities.length; i++){
    data = universities[i];
    students = data.Students
    for(var j = 0; j < students.length; j++){
      if (chrsInStr(query, students[j])){
        results.push({item: data, hilite: j});
      }
    };
  };
  for(var i = 0,len = universities.length; i < len; i++){
    data = universities[i];
    if (chrsInStr(query, data.University)){
      results.push({item: data, hilite: -2})
    }
  };
  return results
}
//简称必须是全称中按顺序取的字
function chrsInStr(chrs, str){
  j = 0
  for (var i=0; i < chrs.length; i++){
    chr = chrs.charAt(i);
    while (str.charAt(j) != chr){
      j++;
      //不用 == ，防止连着两次 j++ 陷入死循环
      if (j >= str.length){
        return false
      }
    }
    j++;
  }
  return true
}
