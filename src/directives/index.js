// 类似google的图片加载效果
export var img = {
	inserted: function (el, binding) {
		var color = Math.floor(Math.random()*1000000);
		el.style.backgroundColor = '#' + color;	// 设置随机的背景色

		var img = new Image();
		img.src = binding.value;	// 获得传给指令的值
		img.onload = function () {
			el.style.backgroundImage = 'url(' + binding.value + ')';
		}
	}
}

// 自动获取焦点
export var focus = {
	inserted: function (el, binding) {
		el.focus();
	}
} 

// 小提示框
export var tip = {
	inserted: function (el, binding) {
		var div = document.createElement('div');
		var i = document.createElement('i');
		var divStyle = {
			position: 'absolute',
			height: '40px',
			lineHeight: '40px',
			paddingLeft: '15px',
			paddingRight: '15px',
			backgroundColor: '#333',
			color: '#f2f2f2',
			borderRadius: '4px',
			opacity: '0'
		}
		var iStyle = {
			position: 'absolute',
			width: '10px',
			height: '10px',
			border: '5px solid transparent'
		}
		var left = el.getBoundingClientRect().left;
		var top = el.getBoundingClientRect().top;
		var w = el.getBoundingClientRect().width;
		var h = el.getBoundingClientRect().height;

		Object.keys(divStyle).forEach((key) => {
			div.style[key] = divStyle[key];
		})

		Object.keys(iStyle).forEach((key) => {
			i.style[key] = iStyle[key];
		})

		div.textContent = binding.value;
		div.append(i);
		document.body.append(div);

		var w2 = div.offsetWidth;
		div.style.display = 'none';
		div.style.opacity = 1;

		if (binding.modifiers.left) {
			i.style.borderLeftColor = '#333';
			i.style.right = '-10px';
			i.style.top = '50%';
			i.style.marginTop = '-5px';

			div.style.top = top + h / 2 - 20 + 'px';
			div.style.left = left - w2 - 20 + 'px';
		};

		if (binding.modifiers.right) {
			i.style.borderRightColor = '#333';
			i.style.left = '-10px';
			i.style.top = '50%';
			i.style.marginTop = '-5px';

			div.style.top = top + h / 2 - 20 + 'px';
			div.style.left = left + w + 20 + 'px';
		};

		if (binding.modifiers.bottom) {
			i.style.borderBottomColor = '#333';
			i.style.top = '-10px';
			i.style.left = '50%';
			i.style.marginLeft = '-5px';

			div.style.top = top + h + 20 + 'px';
			div.style.left = left + w / 2 - w2 / 2 + 'px';
		};

		if (binding.modifiers.top) {
			i.style.borderTopColor = '#333';
			i.style.bottom = '-10px';
			i.style.left = '50%';
			i.style.marginLeft = '-5px';

			div.style.top = top - 60 + 'px';
			div.style.left = left + w / 2 - w2 / 2 + 'px';
		};

		el.onmouseenter = function () {
			div.style.display = 'block';
		}
		el.onmouseleave = function () {
			div.style.display = 'none';
		}
	}
}

