function showEdit(){
	if ($("#id_button").text()=="编辑个人信息"){
		$("#idCode").removeAttr("hidden")
		$("#id_button").text("验证")
	}else if($("#id_button").text()=="验证"){
		if (checkCode($("#idCode").val())){
		$("#id_button").text("提交")
		}else{
		
		}
	}else{
		$("#id_button").text("编辑个人信息")
	}
		
}
function checkCode(code){
	return "True"
}