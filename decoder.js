function enterdecode(e){
  if (e.keyCode == 13){
    try{
      key = $("#key").val();
      d=CryptoJS.AES.decrypt(data, key)
      e=CryptoJS.enc.Latin1.stringify(d)
      f=decodeURIComponent(escape(window.atob(e)))
      eval(f)
      clearAndLoad();
      $("#back_main").remove()
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
function clearAndLoad(){
  loadJScript();
  $("#key_input").remove();
  $("#ctext").removeAttr("hidden")
  $("#welcome_title").remove();
  $("#copyright").remove();
}
