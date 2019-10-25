<template>
  <li class="van-hairline--bottom" @click="$emit('click')">
    <div>{{label}}</div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  
</style>