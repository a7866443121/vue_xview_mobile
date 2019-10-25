<template>
  <div class="x-loading-bar">
    <div
      class="x-loading-bar-bar"
      :class="isError ? 'x-loading-bar-error' : ''"
      role="bar"
      :style="{transform: 'translate3d(-'+(100-totalProgress)+'%, 0, 0)'}">
      <div class="x-loading-bar--peg"></div>
    </div>
    <div class="x-loading-bar-spinner" role="spinner" v-if="showSpinner">
      <div class="spinner-icon" :class="isError ? 'spinner-icon-error' : ''"
           :style="{'animation': 'x-spinner 400ms '+easing+' infinite'}"></div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'xLoadingBar',
    props: {
      type: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        speed: 5,
        easing: 'linear',
        percentNum: 0,
        totalProgress: 0,
        showSpinner: true,
        isError: false
      }
    }
  }
</script>
