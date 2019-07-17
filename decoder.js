function enterdecode(e){
  if (e.keyCode == 13){
    key = $("#key").val();
    d=CryptoJS.AES.decrypt(data, key)
    e=CryptoJS.enc.Latin1.stringify(d)
    f=decodeURIComponent(escape(window.atob(e)))
    eval(f)
    if (typeof universities !== "undefined"){
      console.log('YES')
      initMap()
      $("#key").remove();
    }
  }
}
