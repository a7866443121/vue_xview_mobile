<template>
  <div id="app">
    <mainHeader></mainHeader>
    <div class="container" v-show="isIndex">
      <sideNav class="nav"></sideNav>
      <router-view class="view"></router-view>
      <div class="demo">
        <iframe src="./demo.html" id="xview_demo" name="xviewDemo"></iframe>
      </div>
    </div>
    <router-view class="page" v-show="!isIndex"></router-view>
  </div>
</template>

<script>
  import mainHeader from './components/header.vue'
  import sideNav from './components/side-nav.vue'

  export default {
    name: 'app',
    data () {
      return {
        isIndex: false,
        iframe: false
      }
    },
    watch: {
      $route (n) {
        this.isIndex = n.name !== 'index'
        this.iframe && this.iframe.contentWindow.$docApp.$router.push(n.path)
      }
    },
    mounted () {
      window.onload = () => {
        this.iframe = document.getElementById('xview_demo')
        if (this.iframe) {
          this.iframe.contentWindow.onload = () => {
            this.iframe.contentWindow.$docApp.$router.push(this.$route.path)
          }
        }
      }
    },
    components: {
      mainHeader,
      sideNav
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/index.scss";
    #app{
      width: 100%;
      height: 100%;
      overflow: auto;
      .container {
        width: 100%;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
        height: calc(100% - 80px);
        overflow: hidden;
        clear: both;
        .nav {
          float: left;
          display: inline-block;
          width: 210px;
          height: calc(100% - 80px);
          overflow: auto;
        }
        .view {
          float: left;
          display: inline-block;
          width: calc(100% - 570px);
          height: 100%;
          overflow: auto;
          padding: 20px;
          box-sizing: border-box;
        }
        .demo{
          position: fixed;
          top: 100px;
          right: 20px;
          display: inline-block;
          width: 360px;
          height: 640px;
          iframe{
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            border: none;
          }
        }
      }

      .container:after {
        content: "";
        clear: both;
        display: block;
      }
      
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
</style>
