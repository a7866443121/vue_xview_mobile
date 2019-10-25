<template>
  <header class="page-header" :style="$route.name === 'index' ? 'box-shadow:none' : 'box-shadow:0 10px 60px 0 rgba(29,29,31,0.07)'">
    <div class="header-container">
      <router-link :to="{name: 'index'}"><img src="../../static/img/logo.png" width="100"></router-link>
      <div class="qr-code-box">
        <div >扫码预览</div>
        <div id="qrCode"> </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {},
    watch: {
      $route () {
        document.getElementById('qrCode').innerHTML = ''
        let qrCodeUrl = `${window.location.origin}${window.location.pathname}demo.html${window.location.hash}`
        let QRCode = window.QRCode
        this.qrcode = new QRCode('qrCode', {
          text: qrCodeUrl,
          width: 80,
          height: 80
        })

      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/index.scss";
  .page-header {
    background-color: #fff;
    box-shadow: 0 10px 60px 0 rgba(29,29,31,0.07);
    opacity: 0.98;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    transition: all .3s;
    z-index: 100;
    .qr-code-box{
      float: right;
      display: flex;
      align-items: center;
      &>div{
        margin-left: 30%;
      }
    }
  }
  .header-container{
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 80px;
    justify-content: space-between;
  }
</style>
