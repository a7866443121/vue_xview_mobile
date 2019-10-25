<template>
  <button
    class="x-btn" 
    :class="[
    type ? 'x-btn-' + type : '',
    	{
    		'is-round': round,
    		'is-radius': radius, 
    		'is-circle': circle,
    		'is-disabled':disabled,
    	},
    ]"
  >
    <slot>按钮</slot>
  </button>
</template>
<script>
  export default{
    name: 'xButton',
     props: {
      type: {
        type: String,
        default: ''
      },
      plain: Boolean,
      disabled: Boolean,
      round: Boolean,
      radius: Boolean,
      circle: Boolean,
    },
    data () {
      return {}
    },
    methods: {
    }
  }
</script>
