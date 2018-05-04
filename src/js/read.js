function getRequest() {
	var url = location.search;
	var params = {};
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);

		var arr = str.split("&");

		for(var i = 0, len = arr.length; i < len; i++) {
			var objArr = arr[i].split("=");

			params[objArr[0]] = objArr[1]
		}
	}
	return params
}