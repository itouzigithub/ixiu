/* 顶部下滑提示弹框
 *
 * @val { string } 提示内容
 * @type { boolean } true：成功 false：失败
 */
export function tip (val='操作成功', type=true) {
	var box = document.createElement("div");
	var child = document.createElement("div");
	var style = {
		width: '100%',
		height: '100px',
		position: 'absolute',
		top: '-100px',
		textAlign: 'center',
		zIndex: '999999',
		transitionProperty: 'top',
		transitionDuration: '.5s',
		transitionTimingFunction: 'cubic-bezier(0.8, -0.3, 0.2, 1.3)'
	}
	var style2 = {
		display: 'inline-block',
		height: '100px',
		lineHeight: '100px',
		paddingLeft: '50px',
		paddingRight: '50px',
		borderBottomLeftRadius: '4px',
		borderBottomRightRadius: '4px',
		fontSize: '18px'
	}

	for (var x in style) {
		box.style[x] = style[x]
	}
	
	for (var x in style2) {
		child.style[x] = style2[x]
	}

	if (type) {
		child.style.backgroundColor = 'rgba(19, 109, 33, .3)';
		child.style.color = '#136d21';
	} else {
		child.style.backgroundColor = 'rgba(206, 21, 8, .3)';
		child.style.color = '#ce1508';
	}

	child.textContent = val;

	box.appendChild(child);
	document.body.appendChild(box);

	setTimeout(function () {
		box.style.top = '-10px'
	}, 0)

	setTimeout(function () {
		box.style.top = '-100px'
	}, 1800)
	
	setTimeout(function () {
		box.parentNode.removeChild(box);
	}, 2500);
}