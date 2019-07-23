//获取Location对象的search属性值
var searchStr = location.search;
//由于searchStr属性值包括“?”，所以除去该字符
searchStr = searchStr.substr(1);
//将searchStr字符串分割成数组，数组中的每一个元素为一个参数和参数值
var searchs = searchStr.split("&");
var classname = "TG2019303";
for (var i=0; i<searchs.length; i++){
  kv = searchs[i].split("=")
  if (kv[0] == "banji"){
    classname = kv[1]
  }
}
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "data/" + classname + ".js";
document.body.appendChild(script);
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "data/" + classname + ".json";
document.body.appendChild(script);
var csslink = document.createElement("link");
csslink.rel = "stylesheet";
csslink.type = "text/css";
csslink.href = "data/" + classname + ".css";
document.body.appendChild(csslink);
