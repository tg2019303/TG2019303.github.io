//获取Location对象的search属性值
var searchStr = location.search;
//由于searchStr属性值包括“?”，所以除去该字符
searchStr = searchStr.substr(1);
//将searchStr字符串分割成数组，数组中的每一个元素为一个参数和参数值
var searchs = searchStr.split("&");
var classname = "TG2019303";
var isguest = 0;
for (var i=0; i<searchs.length; i++){
  kv = searchs[i].split("=")
  if (kv[0] == "banji"){
    classname = kv[1]
  }
  if (kv[0] == "guest"){
    isguest = kv[1]
  }
}
$("#back_main").attr("href", "/?banji="+classname)
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "data/" + classname + "/dataEncrypted.js";
document.body.appendChild(script);
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "data/" + classname + "/dataExample.js";
document.body.appendChild(script);
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "data/" + classname + "/main.js";
document.body.appendChild(script);
var csslink = document.createElement("link");
csslink.rel = "stylesheet";
csslink.type = "text/css";
csslink.href = "data/" + classname + "/main.css";
document.body.appendChild(csslink);
if (isguest == 1){
  goGuest();
}else{
  $("#key_input").removeAttr("hidden");
  $("#welcome_title").removeAttr("hidden");
  $("#copyright").removeAttr("hidden");
}
