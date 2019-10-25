<template>
	<div class="rx-table scroll" @mouseleave="resizBar.show = hover ? true : false">
		<table class="rx-table-body" cellpadding="0" cellspacing="0" :style="{width: tableWidth + (/%/g.test(tableWidth) ? '%' : 'px'),minWidth: minWidth + 'px',}">
			<thead class="rx-thead" :class="hover ? 'hover' : ''" @mouseleave="theadMouseleave" @selectstart.prevent>
				<!-- 头部插槽 -->
				<slot name="thead"></slot>
			</thead>
			<tbody>
				<slot></slot>
			</tbody>
			<tfoot>
				<slot name="tfoot"></slot>
			</tfoot>
		</table>
		<!-- 拖拽列宽bar -->
		<div 
			v-show="resizBar.show" 
			class="rx-table-resize-bar" 
			:style="{left: resizBar.left + 'px', height: resizBar.height + 'px',}"  
			@mouseleave="resizBar.show = hover ? true : false" 
			@selectstart.prevent 
		>
			<div class="rx-table-reize-barline"></div>
		</div>
	</div>

</template>
<script>
	export default {
		name: 'resizetable',
		props: {
			itemWidth: {
				type: Number,
				default: 80,
			},
			resiz: {
				type: Boolean,
				default:true,
			}
		},
		data() {
			return {
				minWidth:'',
				table: {
					//所有的th
					ath: [],
					//所有的tbody中的tr
					atr: [],
					//table的最左偏移值
					offsetLeft: 0,
					//当前表格宽度
					offsetWidth: 0,
				},
				resizBar: {
					//收缩条对象
					eBar: {},
					//左偏移值
					left: 0,
					//是否显示
					show: false,
					//高度
					height: 0,
				},
				hover: false,
				//是否在thead(在thead范围内)
				inThead: false,
				//固定列头时,宽度收缩
				tableWidth: '100%',
			};
		},
		methods: {
			//获取每个th到table最左边的距离
			getLeft() {
				var _this = this;
				_this.ath.forEach((eth, index) => {
					eth.onmouseenter = (e) => {
						//设置收缩条的位置,尺寸
							_this.resizBar.left = eth.offsetLeft + eth.offsetWidth - 10;
						_this.resizBar.show = true;
						//设置缩放条的高度 = thead的高度
						_this.resizBar.height = eth.parentNode.offsetHeight;
						//缩放条 鼠标按下时操作
						_this.resizBar.eBar.onmousedown = (mousedown) => {
							_this.hover = true;
							//当前th的宽度
							var ethWidth = eth.offsetWidth;
							//收缩条点击时的左偏移值
							var left = _this.resizBar.left;
							_this.table.offsetLeft = mousedown.pageX - left;
							//当前表格的宽度
							_this.table.offsetWidth = _this.$el.querySelector('.rx-table-body').offsetWidth;
							//给body注册move事件,删除body的move事件
							document.body.addEventListener('mousemove', mousemove);
							//鼠标按键弹起时缩放bar不可见,th允许hover
							document.body.onmouseup = () => {
								document.body.removeEventListener('mousemove', mousemove);
								_this.hover = false;
								_this.resizBar.show = false;
							}
							//鼠标移动时的操作
							function mousemove(mousemove) {
								mousemove.preventDefault();
								//鼠标按下时取到的做偏移 + 鼠标移动的距离(mousemove.pageX - mousedown.pageX)
								var width = ethWidth + mousemove.pageX - mousedown.pageX;
								//当缩到最小值或或80时不再缩小,同事bar不再移动
								if(width < _this.itemWidth) {
									_this.resizBar.left = eth.offsetLeft + eth.offsetWidth - 10; 
									//设置列宽度
                	eth.style.width = _this.itemWidth + "px";
								} else {
									eth.style.width = width + 'px';
									_this.resizBar.left = left + mousemove.pageX - mousedown.pageX;
								}
								//表格宽度
								_this.tableWidth = _this.table.offsetWidth + mousemove.pageX - mousedown.pageX;
							};
						}
					};
				});
			},
			//鼠标离开thead时,并且进入的元素是缩放条,那么缩放条显示,否则隐藏;
			theadMouseleave(e) {
				this.resizBar.show = e.relatedTarget ? (e.relatedTarget.classList.contains('rx-table-resize-bar') ? true : false) : false;
			},
			init() {
				var _this = this;
				//初始化所有表格cill的宽度
				var width = 0;
				_this.ath.forEach((e) => {
					width += e.width || _this.itemWidth;
					e.style.width = e.width || _this.itemWidth + 'px';
				});
				_this.tableWidth = width;
				_this.minWidth = width;
			}
		},
		mounted() {
			var _this = this;
			//所有的th
			_this.ath = this.$el.querySelectorAll('.rx-thead th');
			//收缩条
			_this.resizBar.eBar = this.$el.querySelector('.rx-table-resize-bar');
			//初始化表格
			_this.resiz && _this.init();
			//获取每个th到table最左边的距离
			_this.resiz && _this.getLeft();
		}
	};
</script>
<style lang="scss">
	/* 变量 */
	
	$resizeBar:#D5E6F1;
	$resizeBarline:#bed5fb;
	$th:#657BAF;
	$thbg:#f1f4f6;
	$border:1px solid #E3E1EA;
	/* 表格样式 */
	
	.rx-table {
		position: relative;
		max-width: 100%;
		text-align: left;
		overflow: auto;
		.rx-table-body {
			width: 100%;
			table-layout: fixed;
			border: $border;
			border-collapse: collapse;
			/* 表头start */
			.rx-thead {
				cursor: pointer;
				-moz-user-select: none;
				-webkit-user-select: none;
				th {
					white-space: nowrap;
					padding: 18px 20px;
					color: $th;
					background: $thbg;
					font-weight: bold;
					min-width: 80px;
					box-sizing: border-box;
				}
				&.hover th {
					pointer-events: none;
				}
			}
			/* 表体 start*/
			tbody {
				border: $border;
				border-top: transparent;
				background: #fff;
				.rx-tr {
					&:nth-child(even) {
						background: #f9fbfc;
					}
					&:hover {
						background: #EEF2F7;
					}
					td {
						padding: 18px 20px;
	          font-size: 14px;
	          line-height: 1em;
						vertical-align: middle;
						box-sizing: border-box;
						min-width: 80px;
					}
				}
			}
			/* 表足 */
			&>tfoot>tr>td {
				padding: 12px 10px;
			}
		}
		/*调整列宽 start*/
		.rx-table-resize-bar {
			position: absolute;
			top: 0;
			width: 10px;
			background: $resizeBar;
			text-align: center;
			cursor: col-resize;
			/*拖动时，显示虚线*/
			&.moving>.rx-table-resize-barline {
				border-left-style: dashed;
				pointer-events: none;
			}
			.rx-table-reize-barline {
				display: inline-block;
				width: 1px;
				height: 100%;
				border-left: 1px solid $resizeBarline;
				pointer-events: none
			}
		}
	}
</style>