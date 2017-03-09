<template>
	<div class="container">
		<!-- 导航 -->
		<div class="nav">
			<div class="home" @click="goToDash">
				<!-- <span>iXiu</span> -->
				<i class="fa fa-home" style="font-size: 18px"></i>
			</div>
			<!-- 活动标题 -->
			<span class="mr10">{{ info.time | dateFormat }}</span>
			<span>{{ info.title }}</span>

			<!-- 调节按钮位置时的参数 -->
			<span v-show="indicatorOfBtn > 0" class="param">{{ indicatorOfBtn }}</span>

			<!-- 保存于发布 -->
			<button class="btn r mt8 mr15" @click="publish(1)">
				<i class="fa fa-paper-plane"></i>
				保存并发布
			</button>
			<button class="btn r mt8 mr15" @click="publish(0)">
				<i class="fa fa-cloud-upload"></i>
				保存
			</button>
		</div>

		<!-- 工具栏 -->
		<div class="tool-bar">
			<div class="tool" @click="showBGC" v-tip.right="'背景色'">
				<i class="fa fa-hashtag"></i>
			</div>
			<div class="tool" @click="addImg" v-tip.right="'添加图片'">
				<i class="fa fa-image"></i>
			</div>
			<div class="tool" @click="showEdit" v-tip.right="'添加按钮'">
				<i class="fa fa-magnet"></i>
			</div>
			<div class="tool" @click="addBackImg" v-tip.right="'添加背景图'">
				<i class="fa fa-globe" style="font-size: 18px"></i>
			</div>

			<!-- PC 与 Moblie 切换 -->
			<div class="checkout" @click="status = status == 1 ? 2 : 1">
				<i class="fa fa-mobile" 
					style="font-size: 28px" 
					v-show="status == 1"></i>
				<i class="fa fa-desktop" 
					style="font-size: 20px" 
					v-show="status == 2"></i>
			</div>
		</div>

		<!-- 编辑区-PC -->
		<div class="pc" v-show="status == 1" id="pc">
			<!-- 需取出提交的html代码 -->
			<div id="PC">
				<div :style="{backgroundColor: bgc, backgroundImage: 'url(' + backImgPC + ')'}" class="innerWrapper">
					<!-- 大图 -->
					<div class="pc-img" v-for="(val, index) in imgOfPC" 
						:style="{ backgroundImage: 'url(' + val.url + ')', height: val.height + 'px'}" 
						@click="edit($event, index)">
					</div>

					<!-- 按钮 -->
					<a :data-href="val.link" 
						 v-for="(val, index) in btnOfPC" target="_blank"
						 style="display: block;
									  position: absolute;
						        left: 50%;
						        transform: translate(-50%);"
						 @mousedown="editBtn($event, index)"
						 :style="{top: val.top + 'px', 
						 					marginLeft: val.left + 'px'}">
						<img :src="val.url">
					</a>
				</div>
			</div>
		</div>

		<!-- 编辑区-Mobile -->
		<div class="wrap" v-show="status == 2">
			<div class="mobile">
				<div class="screen" id="mobile">
					<div :style="{backgroundImage: 'url(' + backImgMobile + ')'}" class='innerWrapper'>
						<!-- 背景大图 -->
						<img v-for="(val, index) in imgOfMobile" :src="val.url" 
							@click="edit($event, index)"
							style="width: 100%;
		                 display: block;">

						<!-- 按钮 -->
						<a :data-href="val.link" 
							 v-for="(val, index) in btnOfMobile" target="_blank"
							 style="display: block;
										  position: absolute;
							        left: 50%;
							        transform: translate(-50%)"
							 @mousedown="editBtn($event, index)"
							 :style="{top: val.top + 'px',
							 					marginLeft: val.left + 'px'}">
							<img :src="val.url">
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- 图片功能菜单 -->
		<memu :e="eventObj" 
			v-on:menuEvent="handleEvent"
			:menudata="menuForImg"
			ref="menu">
		</memu>

		<!-- 按钮功能菜单栏 -->
		<memu :e="eventObj"
			v-on:menuEvent="handleBtnEvent"
			:menudata="menuForBtn" 
			ref="menuForBtn">
		</memu>

		<!-- 按钮参数弹框 -->
		<promptbox title="按钮参数" v-on:confirm="addBtn(btnIndex)" ref="editBtn">
			<div>
				<div class="mb10">
					<p class="f13 mb4">* URL</p>
					<input type="text" v-model.trim="btnParam.link" class="ipt">
					<i class="fa fa-check ml10 green" v-show="btnParam.link != ''"></i>
				</div>
				<div class="mb20 rel" style="height: 50px">
					<p class="f13 mb4">* 按钮图片（正常状态）</p>
					<button class="btn fakebtn">上传图片</button>
					<input type="file" @change="addBtnImg($event, 1)" 
						accept="image/png, image/jpg, image/jpeg" class="btnUploader">
					<i class="fa fa-check indicator" v-show="btnParam.url != ''"></i>
				</div>
				<div class="rel" style="height: 50px">
					<p class="f13 mb4">按钮图片（结束状态）</p>
					<button class="btn fakebtn">上传图片</button>
					<input type="file" @change="addBtnImg($event, 2)" 
						accept="image/png, image/jpg, image/jpeg" class="btnUploader">
					<i class="fa fa-check indicator" v-show="btnParam.url2 != ''"></i>
				</div>
			</div>
		</promptbox>

		<!-- 背景色 -->
		<promptbox title="背景色" v-on:confirm="setBGC" ref="editBGC">
			<div>
				<p class="f13 mb4">色值</p>
				<input type="text" v-model.trim="bgc" class="ipt" v-focus @keyup.enter="setBGC">
			</div>
		</promptbox>

		<!-- 按钮水平偏移量 -->
		<promptbox title="水平位置" v-on:confirm="setBtnOffset" ref="btnOffset">
			<div>
				<p class="f13 mb4">向{{ offsetType == 1 ? '左' : '右' }}偏移</p>
				<input type="text" v-model.trim="btnOffset" class="ipt" v-focus @keyup.enter="setBtnOffset">
				<span> px</span>
			</div>
		</promptbox>

		
		<!-- 图片上传的隐藏input -->
		<input type="file" class="dn" id="uploader" @change="upload" 
			accept="image/jpg, image/png, image/jpeg, image/gif">

		<!-- 背景图上传的隐藏input -->
		<input type="file" class="dn" id="backImgUploader" @change="uploadBackImg"
		  accept="image/jpg, image/png, image/jpeg">
	</div>
</template>
<script>
	import handleMenu from './HandleMenu'
	import promptbox from './PromptBox'
	import { tip } from '../method'
	export default {
		data () {
			return {
				info: {
					time: 1488424069,
					title: '拉新运营活动'
				},
				menuForImg: [{
          name: '在上方插入',
          eventkey: 1,
          iconname: 'arrow-up'
        }, {
          name: '在下方插入',
          eventkey: 2,
          iconname: 'arrow-down'
        }, {
          name: '删除',
          eventkey: 3,
          iconname: 'trash'
        }],
        menuForBtn: [{
          name: '编辑',
          eventkey: 1,
          iconname: 'edit'
        }, {
          name: '删除',
          eventkey: 2,
          iconname: 'trash'
        }, {
          name: '向左偏移',
          eventkey: 3,
          iconname: 'arrow-left'
        }, {
          name: '向右偏移',
          eventkey: 4,
          iconname: 'arrow-right'
        }],
				status: 1,  				// 1: PC  2: Mobile
				imgOfPC: [],
				imgOfMobile: [],
				btnOfPC: [],
				btnOfMobile: [],
				btnParam: {					// 按钮参数
					link: '',					// 链接url
					top: '',					// 垂直偏移量
					url: '',					// 按钮图片（base64格式）
					url2: ''					// 活动结束后的按钮图片（base64格式）
				},
				eventObj: null,			// 传给弹出菜单handlemenu的事件对象
				imgIndex: '',				// 选中状态的图片的index
				btnIndex: '',				// 选中状态的按钮的index
				insertType: '',     // 插入图片方式 1: before  2: after
				bgc: '#',						// 背景色
				backImgPC: '',			// 背景图-PC
				backImgMobile: '',  // 背景图-Mobile
				isSaved: false,     // 是否保存
				btnOffset: 0,       // 按钮水平偏移量
				offsetType: 1,      // 偏移类型 1-左  2-右
				indicatorOfBtn: 0   // 调节按钮垂直位置时的指示参数
			}
		},
		components: {
			'memu': handleMenu,
			'promptbox': promptbox
		},
		mounted () {
			window.oncontextmenu = () => false;
		},
		methods: {
			/* 图片操作 */
			addImg () {
				this.insertType = '';
				document.getElementById('uploader').click();
			},
			upload () {
				var uploader = document.getElementById('uploader');
				var file = uploader.files[0];
				uploader.value = null;
				if (!file) return;

				var reader = new FileReader;
				reader.readAsDataURL(file);
				reader.onload = () => {
					var url = reader.result;
					var target = this.status == 1 ? this.imgOfPC : this.imgOfMobile;
					var i = this.imgIndex;
					var h;

					new Promise((resolve, reject) => {
						var img = new Image();
						img.src = url;
						img.onload = () => {
							resolve(img.height);
						}
					}).then((h) => {
						// 在前方插入
						if (this.insertType == 1) {
							target.splice(i, 0, { url: url, height: h });
							return;
						}
						// 在后方插入
						if (this.insertType == 2) {
							target.splice(i + 1, 0, { url: url, height: h });
							return;
						}
						// 在尾部插入
						target.push({ url: url, height: h });
					})
				}
			},
			edit (e, i) {
				this.eventObj = e;
				this.imgIndex = i;
				this.$refs.menu.show = true;
			},
			handleEvent (eventkey) {
				switch (eventkey) {
					case 1: 
						this.insertType = 1;
						document.getElementById('uploader').click();
						break;
					case 2:
						this.insertType = 2;
						document.getElementById('uploader').click();
						break;
					case 3:
						this.removeImg();
						break;
				}
			},
			removeImg () {
				var i = this.imgIndex;
				if (this.status == 1) {
					this.imgOfPC.splice(i, 1);
				} else {
					this.imgOfMobile.splice(i, 1);
				}
			},

			/* 按钮操作 */
			showEdit () {
				this.btnIndex = '';
				this.$refs.editBtn.show = true;
			},
			addBtn (index) {
				var target = this.status == 1 ? this.btnOfPC : this.btnOfMobile;
				var parent = this.status == 1 ? 'pc' : 'mobile';
				var obj = { left: 0 };

				// 参数校验
				if (!this.btnParam.url || !this.btnParam.link) {
					tip('请将参数填写完整', false);
					return;
				}

				// index存在，则表示编辑，不存在则表示添加
				if (index !== '') {
					// 复制按钮参数对象
					for (var key in this.btnParam) {
						target[index][key] = this.btnParam[key];
						this.btnParam[key] = '';  // 复原按钮参数对象
					}
				} else {
					// 复制按钮参数对象
					for (var key in this.btnParam) {
						obj[key] = this.btnParam[key];
						this.btnParam[key] = '';  // 复原按钮参数对象
					}

					// 设置按钮初始高度
					var t = document.getElementById(parent).scrollTop;
					obj.top = t + 100;
					target.push(obj);
				}

				// 关闭弹框
				this.$refs.editBtn.show = false;
			},
			addBtnImg (e, type) {
				var file = e.target.files[0];
				e.target.value = null;
				if (!file) return;

				var reader = new FileReader;
				reader.readAsDataURL(file);
				reader.onload = () => {
					var url = reader.result;
					if (type == 1) {
						this.btnParam.url = url;
					}
					if (type == 2) {
						this.btnParam.url2 = url;
					}
				}
			},
			drag (e, i) {
				var el = e.currentTarget;
				var offsetTop = el.parentNode.getBoundingClientRect().top;
				var scrollTop = el.parentNode.scrollTop;
				var btn;
				if (this.status == 1) {
					btn = this.btnOfPC[i];
				} else {
					btn = this.btnOfMobile[i];
				}

				var move = function (e) {
					e.stopPropagation();
					e.preventDefault();
					btn.top = e.pageY - offsetTop + scrollTop;
					this.indicatorOfBtn = btn.top;
				}.bind(this);

				var clear = function () {
					this.indicatorOfBtn = 0;
					document.removeEventListener('mousemove', move, false);
					document.removeEventListener('mouseup', clear, false);
				}.bind(this);

				document.addEventListener('mousemove', move, false);
				document.addEventListener('mouseup', clear, false);
			},
			editBtn (e, i) {
				e.preventDefault();
				if (e.button == 2) {
					this.eventObj = e;
					this.btnIndex = i;
					this.$refs.menuForBtn.show = true;
				} else {
					this.drag(e, i);
				}
			},
			handleBtnEvent (eventkey) {
				switch (eventkey) {
					case 1:
						var i = this.btnIndex;
						var btn = this.status == 1 ? this.btnOfPC : this.btnOfMobile;
						for (var key in this.btnParam) {
							this.btnParam[key] = btn[i][key];
						}
						this.$refs.editBtn.show = true;
						break;
					case 2:
						var i = this.btnIndex;
						var btn = this.status == 1 ? this.btnOfPC : this.btnOfMobile;
						btn.splice(i, 1);
						break;
					case 3:
						var i = this.btnIndex;
						var btn = this.status == 1 ? this.btnOfPC : this.btnOfMobile;
						this.btnOffset = Math.abs(btn[i].left);
					  this.offsetType = 1;
					  this.$refs.btnOffset.show = true;
					  break;
					case 4: 
						var i = this.btnIndex;
						var btn = this.status == 1 ? this.btnOfPC : this.btnOfMobile;
						this.btnOffset = Math.abs(btn[i].left);
					  this.offsetType = 2;
					  this.$refs.btnOffset.show = true;
				}
			},
			setBtnOffset () {
				var i = this.btnIndex;
				var btn = this.status == 1 ? this.btnOfPC : this.btnOfMobile;
				var num = parseInt(this.btnOffset);
				if (isNaN(this.btnOffset) || num < 0) {
					return tip('请设置正整数', false);
				}
				if (this.offsetType == 1) {
					btn[i].left = -num;
				} else {
					btn[i].left = num;
				}
				this.$refs.btnOffset.show = false;
			},

			/* 背景色 */
			showBGC () {
				this.$refs.editBGC.show = true;
			},
			setBGC () {
				this.$refs.editBGC.show = false;
			},

			/* 背景图 */
			addBackImg () {
				document.getElementById('backImgUploader').click();
			},
			uploadBackImg () {
				var uploader = document.getElementById('backImgUploader');
				var file = uploader.files[0];
				uploader.value = null;
				if (!file) return;

				var reader = new FileReader;
				reader.readAsDataURL(file);
				reader.onload = () => {
					var url = reader.result;
					if (this.status == 1) {
						this.backImgPC = url;
					} else {
						this.backImgMobile = url;
					}
				};
			},

			/* 保存与发布 */
			save () {
				var htmlOfPC = document.getElementById('pc').innerHTML;
				var htmlOfMobile = document.getElementById('mobile').innerHTML;
				this.isSaved = true;
			},
			publish (type) {
				this.save();
				if (type == 0) {
					tip('保存成功');
				} else {
					tip('发布成功');
				}
			},

			/* 回到列表页 */
			goToDash () {
				// if (!this.isSaved) {

				// } else {
				// }
				this.$router.push('/');
			}
		},
		watch: {
			// 限定按钮宽高输入内容为数字
			'btnParam.width': function (val) {
				if (isNaN(val)) {
					this.btnParam.width = ''
				}
			},
			'btnParam.height': function (val) {
				if (isNaN(val)) {
					this.btnParam.height = ''
				}
			},
			// 监控以下数据，发生变化，则将保存状态设为 false
			imgOfPC: function (val) {
				this.isSaved = false;
				console.log('imgOfPC changed');
				if (val.length == 0) {
					document.getElementById('PC').style.height = '0px';
				} else {
					document.getElementById('PC').style.height = 'auto';
				}
			},
			imgOfMobile: function () {
				this.isSaved = false;
				console.log('imgOfMobile changed');
			},
			btnOfPC: function () {
				this.isSaved = false;
				console.log('btnOfPC changed');
			},
			btnOfMobile: function () {
				this.isSaved = false;
				console.log('btnOfMobile changed');
			},
			bgc: function () {
				this.isSaved = false;
				console.log('bgc changed');
			},
			backImgPC: function () {
				this.isSaved = false;
				console.log('backImgPC changed');
			},
			backImgMobile: function () {
				this.isSaved = false;
				console.log('backImgMobile changed');
			}
		}
	}
</script>
<style scoped>
	.container {
		height: 100%;
		position: relative;
	}
	.nav {
	  width: 100%;
	  height: 50px;
	  line-height: 50px;
	  border-bottom: 1px solid #eee;
	  background-color: #fff;
	  position: relative;
	  padding-left: 80px;
	  font-size: 14px;
	}
	.param {
		position: absolute;
		left: 50%;
	}
	.home {
		position: absolute;
		width: 60px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: #FF5252;
		color: #fff;
		left: 0;
		transition: all .2s;
		letter-spacing: 2px;
		cursor: pointer;
	}
	.home:hover {
		box-shadow: inset 0 0 20px rgba(0, 0, 0, .3);
	}
	.tool-bar {
		height: 100%;
		width: 60px;
		background-color: #eee;
		color: #555;
	}
	.tool {
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
		transition: all .2s;
	}
	.tool:hover {
		color: #FF5252;
		box-shadow: inset 0 0 20px rgba(0, 0, 0, .3);
	}
	.pc {
		width: calc(100% - 60px);
		height: calc(100% - 50px);
		overflow-y: auto;
		position: absolute;
		top: 50px;
		left: 60px;
		font-size: 0;
	}
	#parent {
		height: 100%;
	}
	.pc-img {
		width: 100%;
		background-position: top center;
		background-repeat: no-repeat;
	}
	.pc img:hover,
	.screen img:hover {
		opacity: .8;
	}
	.wrap {
		width: calc(100% - 60px);
		height: calc(100% - 50px);
		overflow-y: auto;
		position: absolute;
		top: 50px;
		left: 60px;
	}
	.mobile {
		padding: 103px 32px 96px 35px;
		margin: 0 auto;
		position: absolute;
		left: 50%;
		margin-left: -190px;
		font-size: 0;
		background-image: url(../assets/iphone.png);
		background-size: cover;
	}
	.screen {
		width: 321px;
		height: 570px;
		overflow-y: auto;
		position: relative;
	}
	.screen::-webkit-scrollbar {
	  width: 0px;
	}
	.screen::-webkit-scrollbar-thumb {
    background-color: #ccc; 
    border-right: 0px solid #f5f5f5;
	}
	.btn {
	  display: inline-block;
	  border: 1px solid #ddd;
	  outline: none;
	  text-align: center;
	  height: 32px;
	  line-height: 32px;
	  cursor: pointer;
	  border-radius: 3px;
	  font-size: 14px;
	  transition: all .2s;
	  padding: 0 15px;
	  background-color: #fff;
	  color: #666;
	  font-size: 12px;
	}
	.btn:hover {
		background-color: #FF5252;
		color: #fff;
		border-color: #FF5252;
	}
	.checkout {
		width: 60px;
		height: 60px;
		position: absolute;
		bottom: 0px;
		text-align: center;
		line-height: 60px;
		cursor: pointer;
		transition: all .2s;
	}
	.checkout:hover {
		color: #FF5252;
	}
	.btnUploader {
		opacity: 0;
		width: 200px;
		position: absolute;
		height: 36px;
		cursor: pointer;
		left: -100px;
	}
	.fakebtn {
		position: absolute;
		top: 25px;
		left: 0;
	}
	.ipt {
		width: 85%;
		height: 36px;
		border: 1px solid #ccc;
		padding-left: 5px;
		outline: none;
	}
	.ipt:focus {
		border-color: #FF5252;
	}
	.indicator {
		position: absolute;
		top: 35px;
		left: 100px;
		color: green;
	}
	.green {
		color: green;
	}
	.innerWrapper {
		min-height: 100%;
		height: 100%;
		background-repeat: round;
	}
	#PC {
		min-height: calc(100% - 180px);
		height: 0px;
	}
</style>