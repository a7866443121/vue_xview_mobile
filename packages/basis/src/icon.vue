<template>
    <svg class="icon" aria-hidden="true" :style="{fontSize: size + 'px'}">
        <use :xlink:href="`#${name}`"></use>
    </svg>
</template>

<script>
export default {
    name:'icon-font',
    props:{
        name:{
            type:String
        },
        size:{
            type: String,
            // default: '16'
        },
    }
}
</script>

<style>
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

</style>