// 获取html
var html = document.documentElement;
var resize = function(e){
	// 获取窗口宽度
	var width = window.innerWidth;
	// 除以设计稿的尺寸，但是由于字体不能小于10，所以只能按照设计稿的缩小的100比例去除
	// 例如设计稿750，就是/7.5
	// 假设设计稿是375
	var size = width / 3.75
	html.style.fontSize = size + "px";
}

// 监听窗口大小
window.onresize = resize;
resize();
