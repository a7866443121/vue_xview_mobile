<template>
  <div class="xview-app">
    <router-view class="page"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {

      }
    },
    watch: {

    },
    mounted () {

    },
    components: {

    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/index.scss";
  .page{
    padding: 10px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  /* 弹框中滚动条样式重写 */
/*滚动条样式重置*/
*::-webkit-scrollbar { 
    width: 6px; 
    height: 6px;
  } 
  /*定义滚动条轨道 内阴影+圆角*/ 
  *::-webkit-scrollbar-track { 
     background-color: inherit; 
  }  
  *:hover::-webkit-scrollbar-thumb { 
    border-radius: 6px; 
    background-color: #C6CCD7; 
  }
  /*定义滑块 内阴影+圆角*/ 
  *::-webkit-scrollbar-thumb { 
    background-color: inherit; 
  }
/*滚动条样式重置*/
.scroll-box::-webkit-scrollbar { 
  width: 6px; 
  height: 6px;
} 
/*定义滚动条轨道 内阴影+圆角*/ 
.scroll-box::-webkit-scrollbar-track { 
   background-color: inherit; 
}  
.scroll-box:hover::-webkit-scrollbar-thumb { 
  border-radius: 6px; 
  background-color: #C6CCD7; 
}
/*定义滑块 内阴影+圆角*/ 
.scroll-box::-webkit-scrollbar-thumb { 
  background-color: inherit; 
}
	.xview-app, .page{
		width: 100%;
		height: 100%;
	}
</style>
