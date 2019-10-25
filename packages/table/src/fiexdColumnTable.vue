<template>
	<div class="rx-fiexd-column-table"  @mouseleave="resizBar.show = hover ? resizBar.show : false">
			<!--固定列头-->
		<div class="rx-fiexd-column" :class="{'shadow': resizBar.show}" :style="{width: fiexdWidth + 'px'}">
			<table class="rx-table-body" cellpadding="0" cellspacing="0" :style="{width: fiexdWidth + 'px'}">
				<thead class="rx-thead" :class="hover ? 'hover' : ''"  @mouseleave="theadMouseleave" @selectstart.prevent>
					<!-- 头部插槽 -->
					<slot name="fiexd-thead"></slot>
				</thead>
					<slot name="fiexd-tbody"></slot>
				<tfoot>
					<slot name="fiexd-tfoot"></slot>
				</tfoot>
			</table>
		</div>
		<!--表格主体-->
		<div class="rx-activity-column scroll">
			<table class="rx-table-body" cellpadding="0" cellspacing="0" :style="{width: activityWidth + 'px'}">
			<thead class="rx-thead" :class="hover ? 'hover' : ''"  @mouseleave="theadMouseleave" @selectstart.prevent>
					<!-- 头部插槽 -->
					<slot name="thead"></slot>
				</thead>
					<slot name="tbody"></slot>
				<tfoot>
					<slot name="tfoot"></slot>
				</tfoot>
			</table>			
		</div>
		<!-- 拖拽列宽bar -->
		<div 
      v-show="resizBar.show" class="rx-table-resize-bar" 
      :style="{left: resizBar.left + 'px', height: resizBar.height + 'px',}" 
      @mouseleave="resizBar.show = hover ? resizBar.show : false" 
      @selectstart.prevent
    >
			<div class="rx-table-reize-barline"></div>
		</div>

	</div>
		
</template>
<script>
export default {
  name: "rx-table",
  props: {
    setTable: {
      type: Object,
      default: {
        cellWidth: 80
      } 
    },
    // 固定的列数
    column: {
      type: Number,
      default: 2
		},
		sort: {
			type: Function,
		}
  },
  data() {
    return {
      minWidth: 0,
      cellWidth:[],
      fiexd: {
        //所有的th
        ath: [],
        //所有的tbody中的tr
        atr: [],
        //table的最左偏移值
        offsetLeft: 0,
        //当前表格宽度
        offsetWidth: 0,
        //显示出来的列
        showAth: []
      },
      activity: {
        //所有的th
        ath: [],
        //所有的tbody中的tr
        atr: [],
        //table的最左偏移值
        offsetLeft: 0,
        //当前表格宽度
        offsetWidth: 0
      },
      resizBar: {
        //收缩条对象
        eBar: {},
        //左偏移值
        left: 0,
        //是否显示
        show: false,
        //高度
        height: 0
      },
      //是否已经有列被hover了,如果有则其余列不允许被hover,防止事件紊乱
      hover: false,
      //固定列头时,宽度收缩
      fiexdWidth: 0,
      //活动表格的宽度
      activityWidth: 0,
    };
  },
  methods: {
    //获取每个th到table最左边的距离
    getLeft() {
			var _this = this;
      var activityColumn = this.$el.querySelector(".rx-activity-column");
      _this.activity.ath.forEach((eth, index) => {
				//是否在固定列?
				eth = _this.column > index ? _this.fiexd.ath[index] : eth;
        eth.onmouseenter = e => {
					//设置收缩条的位置
					setBarLeft()
          _this.resizBar.show = true;
          //设置缩放条的高度 = thead的高度
          _this.resizBar.height = eth.parentNode.offsetHeight;
          //缩放条 鼠标按下时操作
          _this.resizBar.eBar.onmousedown = mousedown => {
            //固定列表的宽度
            var fiexdColumnsWidth = _this.fiexdWidth;
            //表格宽度
            var activityWidth = activityColumn.querySelector(".rx-table-body").offsetWidth;
            //表格滚动条位置;
            var scrollLeft = activityColumn.scrollLeft;
            _this.hover = true;
            //当前列的宽度
            var ethWidth = eth.offsetWidth;
            //收缩条点击时的左偏移值
            var left = _this.resizBar.left;
            //当前表格的宽度
            _this.activity.offsetWidth = _this.$el.offsetWidth;
            //给body注册move事件,删除body的move事件
            document.body.addEventListener("mousemove", mousemove);
            //鼠标按键弹起时缩放bar不可见,th允许hover
            document.body.onmouseup = () => {
              document.body.removeEventListener("mousemove", mousemove);
              _this.resizBar.show = false;
              _this.hover = false;
              left = _this.resizBar.left;
              var xgj_tablecell_width = JSON.parse(localStorage.getItem('xgj_tablecell_width')) || {};
               xgj_tablecell_width[_this._uid] =  _this.cellWidth;
               //存入缓存
              localStorage.setItem('xgj_tablecell_width',JSON.stringify(xgj_tablecell_width));   
            };
            //鼠标移动时的操作
            function mousemove(mousemove) {
              mousemove.preventDefault();
              //鼠标按下时取到的做偏移 + 鼠标移动的距离(mousemove.pageX - mousedown.pageX)
              var width = ethWidth + mousemove.pageX - mousedown.pageX;
              //固定列的th宽度和活动列的宽度两者同步,当缩到最小值时不再缩小,
              _this.activity.ath[index].style.width = _this.fiexd.ath[index].style.width = (width < _this.setTable.cellWidth ? _this.setTable.cellWidth : width) + 'px';
              //设置bar的位置
              setBarLeft();
              //设置缓存
              _this.cellWidth[index] = _this.fiexd.ath[index].offsetWidth;
              //设置表格大小
              _this.activityWidth = activityWidth + mousemove.pageX - mousedown.pageX;
              //设置固定列盒子的宽高
              _this.setFixedColumnWidth();
              _this.setFixedColumnHeight();
            }
          };
          //设置bar的位置,缩放条一半的宽度 = 5
          function setBarLeft(){
          	_this.resizBar.left = _this.column > index ? (eth.offsetLeft + eth.offsetWidth - 10) : (eth.offsetLeft - activityColumn.scrollLeft + eth.offsetWidth - 10);
          }
        };
      });
    },
    //设置固定列盒子的宽度
    setFixedColumnWidth() {
      var width = 0;
      this.fiexd.showAth.forEach((item, index) => {
        //去除宽度转换成number类型
        var num = item.style.width.match(/\d\B/ig).join('') - 0;
        width += num;
      });
      this.fiexdWidth = width;
    },
    //鼠标离开thead时,并且进入的元素是缩放条,那么缩放条显示,否则隐藏;
    theadMouseleave(e) {
      this.resizBar.show = e.relatedTarget ? (e.relatedTarget.classList.contains('rx-table-resize-bar') ? true : false) : false;
    },
    //设置出现滚动条时固定列的高度
    setFixedColumnHeight(){
      var activityColumn = this.$el.querySelector(".rx-activity-column");
      //滚动条的高度
      var scrollOffsetWidth = activityColumn.offsetHeight - activityColumn.querySelector(".rx-table-body").offsetHeight;
      this.fiexdHeight = scrollOffsetWidth > 10 ? ("calc(100% - " + scrollOffsetWidth + "px)") : '100%';
    },
    init() {
      var _this = this;
      //获取缓存中的表格列宽
      var xgj_tablecell_width = JSON.parse(localStorage.getItem('xgj_tablecell_width')) || {};
      xgj_tablecell_width[_this._uid] = xgj_tablecell_width[_this._uid] || [];
      //初始化所有表格cill的宽度
			 _this.activity.ath.forEach((e, i) => {
         //设置缓存宽度优先缓存中的宽度
         xgj_tablecell_width[_this._uid][i] = xgj_tablecell_width[_this._uid][i] || e.width || _this.setTable.cellWidth;
         //设置列宽,
        e.style.width = xgj_tablecell_width[_this._uid][i] + "px";
        _this.fiexd.ath[i].style.width = xgj_tablecell_width[_this._uid][i] + "px";
        _this.cellWidth[i] = xgj_tablecell_width[_this._uid][i];
        if (_this.column > i) {
          _this.fiexdWidth += e.offsetWidth;
        }
        _this.minWidth += e.width || _this.setTable.cellWidth;  
      });  
			//绑定鼠标移入移出
			_this.activity.atr.forEach((item,index) => {
        item.addEventListener('mouseenter',function(){
          mouseenter(item,index);
				});
				_this.fiexd.atr[index].addEventListener('mouseenter',function(){
          mouseenter(item,index);
				});
				item.addEventListener('mouseleave',function(){
          mouseleave(item,index);
				});
				_this.fiexd.atr[index].addEventListener('mouseleave',function(){
          mouseleave(item,index);
				});
			});
			//鼠标移入
			function mouseenter(item,index){
        //存在固定列,并且列数大于0,设置固定列的宽高
        _this.fiexd.atr[index].classList.add('hover');
        _this.activity.atr[index].classList.add('hover');
			}
			//移出
			function mouseleave(item,index){
        _this.fiexd.atr[index].classList.remove('hover');
				_this.activity.atr[index].classList.remove('hover');
			}
			//绑定排序
			var fiexdSort = _this.$el.querySelectorAll( ".rx-fiexd-column .rx-thead .sort");
			var activitySort = _this.$el.querySelectorAll( ".rx-activity-column .rx-thead .sort");
			activitySort.forEach((item,index) => {
        item = _this.column > index ? fiexdSort[index] : item;
				item.sort = 0;
				item.onclick = () => {
          //排序
					var sort = '0';
					//每次点击删除其它的排序条件
					_this.$el.querySelectorAll(".up.sort").forEach((up) => {
            !up.isEqualNode(item) && up.classList.remove('up');
					});
					_this.$el.querySelectorAll(".down.sort").forEach((down) => {
            !down.isEqualNode(item) && down.classList.remove('down');
					});
					if(item.classList.contains('down')){
            item.classList.remove('down');
						item.classList.add('up');
						item.sort = 1;
					}else if(item.classList.contains('up')){
            item.classList.remove('up');
						item.classList.add('down');
						item.sort = 2;
					}else{
            item.classList.remove('down');
						item.classList.add('up');
						item.sort = 1;
					}
					//调排序方法
					_this.$emit('sort',{
						sort: item.sort,
						index: index,
					});
				}
			});
      //存入缓存
      JSON.parse(localStorage.getItem('xgj_tablecell_width')) && localStorage.setItem('xgj_tablecell_width',JSON.stringify(xgj_tablecell_width));    
      (!!_this.column && _this.column > 0) && (_this.setFixedColumnHeight(), _this.setFixedColumnWidth());   
    }
  },
  mounted() {
    var _this = this;  
    //所有的列
    _this.activity.ath = this.$el.querySelectorAll( ".rx-activity-column .rx-thead th");
		_this.fiexd.ath = this.$el.querySelectorAll(".rx-fiexd-column .rx-thead th");
		//所有的行
		_this.activity.atr = this.$el.querySelectorAll( ".rx-activity-column tbody tr");
		_this.fiexd.atr = this.$el.querySelectorAll(".rx-fiexd-column tbody tr");
    //获取显示出来的固定列
    _this.fiexd.showAth = getShowFiexdColumn();
    //收缩条
    _this.resizBar.eBar = this.$el.querySelector(".rx-table-resize-bar"); 
    //初始化表格
    _this.init();
    //获取每个th到table最左边的距离
    _this.getLeft();
    //获取显示出来的固定列
    function getShowFiexdColumn() {
      var arr = [];
      _this.fiexd.ath.forEach((item, index) => {
        if (_this.column > index) {
          arr.push(item);
        }
      });
      return arr;
    }
  },
};
</script>
<style lang="scss">
$resizeBar: #d5e6f1;
$resizeBarline: #bed5fb;
$th: #657baf;
$thbg: #f1f4f6;
$border: 1px solid #e3e1ea;

.rx-fiexd-column-table {
  position: relative;
  max-width: 100%;
	overflow: hidden;
	text-align: left;
  .rx-fiexd-column {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    z-index: 9;
    .rx-table-body {
      width: 100%;
    }
    &.shadow{
      box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
    }
  }
  .rx-activity-column {
    position: relative;
    width: 100%;
    overflow: auto;
  }
  .rx-table-body {
    width: 100%;
    table-layout: fixed;
    border: $border;
    border-collapse: collapse;
    /* 表头start */
    .rx-thead {
      cursor: pointer;
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
        &.hover {
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
    & > tfoot > tr > td {
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
    z-index: 99;
    /*拖动时，显示虚线*/
    &.moving > .rx-table-resize-barline {
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
  table tr td{
    white-space: pre-wrap
  }
}
</style>

