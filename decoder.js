function enterdecode(e){
  if (e.keyCode == 13){
    try{
      key = $("#key").val();
      d=CryptoJS.AES.decrypt(data, key)
      e=CryptoJS.enc.Latin1.stringify(d)
      f=decodeURIComponent(escape(window.atob(e)))
      console.log(f)
      eval(f)
      clearAndLoad();
      $("#back_main").remove()
      $("#class_select").remove()
      $(".search_box").slideToggle()
    }catch(err){
      $("#key_input").css("background-color", "red")
      $("#key").val('');
      $("#key").attr("placeholder", "密钥不匹配 | 请重新输入")
    }
  }
}
function goGuest(){
  clearAndLoad()
  $("#search_input").remove()
  $("#search_button").remove()
  $("#add_data").remove()
  $(".search_box").slideToggle()
}
//进入主页面和访客页面共同需要的操作
function clearAndLoad(){
  loadJScript();
  $("#key_input").remove();
  $("#ctext").removeAttr("hidden")
  $("#seeus").removeAttr("hidden")
  $("#welcome_title").remove();
  $("#copyright").remove();
}
