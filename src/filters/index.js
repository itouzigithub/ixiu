/* 
 * 添加过滤器请参照以下格式
 * 所有过滤器在main.js注册成了全局过滤器，因此在组件内部无需引用，直接使用即可
 */

/**
	* 将时间戳转化为2000-01-01的格式
	* 时间戳的单位必须是秒
	*/
export function dateFormat (val) {

	var date = new Date(parseInt(val) * 1000);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = month < 10 ? '0' + month : month;
	var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

	return year + '-' + month + '-' + day
}


/**
	* 将时间戳转化为文字格式
	* 时间戳的单位必须是秒
	*/
export function timeAgo (time) {
	var now = Math.ceil(Date.now() / 1000);
	var diff = now - time;
	var moment = "";

	if (diff < 0) {
		return
	}

	if (0 <= diff && diff < 60) {
		moment = "刚刚";
	}
	if (1 * 60 <= diff && diff < 60 * 60) {
		moment = Math.ceil(diff / 60) + "分钟前";
	}
	if (1 * 3600 <= diff && diff < 24 *3600) {
		moment = Math.ceil(diff / 3600) + "小时前";
	}
	if (1 * 3600 * 24 <= diff && diff <= 30 * 3600 * 24){
		moment = Math.ceil(diff / 3600 / 24) + "天前";
	}
	if (1 * 3600 * 24 * 30 <= diff && diff < 12 * 3600 * 24 * 30){
		moment = Math.ceil(diff / 3600 / 24 / 30) + "个月前";
	}
	if (diff >= 3600 * 24 * 30 * 12) {
		moment = "很久以前"
	}

	return moment
}
