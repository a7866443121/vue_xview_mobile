<template>
	<div class="x-shade" :style="{zIndex: zIndex }">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name: 'xShade',
		data(){
			return {
				zIndex:1111,	
			}
		},
		created(){
			
		},
		methods:{

		}
	}
</script>

<style>
	
</style>