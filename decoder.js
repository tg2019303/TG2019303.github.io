function enterdecode(e){
  if (e.keyCode == 13){
    try{
      key = $("#key").val();
      d=CryptoJS.AES.decrypt(data, key)
      e=CryptoJS.enc.Latin1.stringify(d)
      f=decodeURIComponent(escape(window.atob(e)))
      eval(f)
      $("#key_input").remove();
      $(".search_box").slideToggle()
      $("#welcome_title").remove();
      $("#copyright").remove();
	  initMap()
    }catch(err){
      $("#key_input").css("background-color", "red")
      $("#key").val('');
      $("#key").attr("placeholder", "密钥不匹配 | 请重新输入")
    }
  }
}
