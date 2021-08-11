// 声明一个数组专门用于保存todolist数据
// 先判断有没有值，没有就返回空数组
var todolist = localStorage.todolist?JSON.parse(localStorage.todolist):[];
render(todolist);

// 1、完成输入功能
var input = document.querySelector("#input");
// 监听输入事件
// input.oninput = function(event){
// 	console.log(e);
// }
// 监听回车按键
input.onkeydown = function(event){
	if(event.key == "Enter"){
		// 获取输入框的内容存放在数组里
		todolist.push({isDone:false,content:input.value});
		// 清空输入框
		input.value = "";
		// 调用render函数
		render(todolist);
	}
}


// 渲染函数
function render(todolist){
	localStorage.todolist = JSON.stringify(todolist);
	var doingDiv = document.querySelector(".doing .list");
	var doneDiv = document.querySelector(".done .list");
	var doneNumSpan = document.querySelector(".done .num");
	var doingNumSpan = document.querySelector(".doing .num");
	doingDiv.innerHTML = "";
	doneDiv.innerHTML = "";
	var doneNum = 0 ;
	var doingNum = 0 ;
	todolist.forEach(function(item,i){
		//根据当前是否完成决定渲染到什么位置
		if(item.isDone){
			var div = document.createElement("div");
			div.className = "item";
			// 多行字符串使用反引号，${}可以在字符串中插入变量
			div.innerHTML = `<input checked="checked" type="checkbox" data-index="${i}" />
					<span class="content">${item.content}</span>
					<button class="del" data-index="${i}">删除</button>`
			doneDiv.appendChild(div);
			doneNum++;
		}else{
			var div = document.createElement("div");
			div.className = "item";
			// 多行字符串使用反引号，${}可以在字符串中插入变量
			div.innerHTML = `<input type="checkbox" data-index="${i}" />
					<span class="content">${item.content}</span>
					<button class="del" data-index="${i}">删除</button>`
			doingDiv.appendChild(div);
			doingNum++;
		}
	}) 
	// 这不要放在遍历里面，因为数组一旦为空了，遍历不执行，这个也不执行，还等于上一次的数值
	doneNumSpan.innerHTML = doneNum;
	doingNumSpan.innerHTML = doingNum;
}

var body = document.body;
// 事件委托
body.onchange = function(event){
	// 复选框改变事件
	if(event.target.getAttribute('type') == "checkbox"){
		var index = event.target.dataset.index;
		// 取反
		todolist[index].isDone = !todolist[index].isDone;
		// 重新渲染
		render(todolist);
	}
}

body.onclick = function(event){
	if(event.target.getAttribute("class") == "del"){
		var index = event.target.dataset.index;
		// 数组删除 （下标，删除个数）；
		todolist.splice(index,1);
		// 重新渲染
		render(todolist);
	}
}