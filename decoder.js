function enterdecode(e){
  if (e.keyCode == 13){
    try{
      key = $("#key").val();
      d=CryptoJS.AES.decrypt(data, key)
      e=CryptoJS.enc.Latin1.stringify(d)
      f=decodeURIComponent(escape(window.atob(e)))
      eval(f)
      $("#key_input").remove();
	  $("#search_button").removeAttr("disabled");
	  $("#search_input").removeAttr("disabled");
	  $("#edit").removeAttr("hidden");
	  initMap()
    }catch(err){
      $('<p style="color:red;text-align:center">密钥不匹配</p>').appendTo("#key_input")
      $("#key").val('');
	  setTimeout('$("body p:eq(0)").remove()',3000)
    }
  }
}
