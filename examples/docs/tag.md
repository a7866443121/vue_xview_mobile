<style>
  .x-tag{
    margin: 10px;
  }
</style>

# Tag 标签
----
### 基础用法
由`type`属性来选择tag的类型，也可以通过`color`属性来自定义背景色。

::: demo
```html

<div>
  <x-tag>标签一</x-tag>
  <x-tag color="info">标签三</x-tag>
  <x-tag color="primary">标签二</x-tag>
  <x-tag color="success">标签二</x-tag>
  <x-tag color="warning">标签四</x-tag>
  <x-tag color="danger">标签五</x-tag>
</div>
<div>
  <x-tag ishover>hover1</x-tag>
  <x-tag ishover color="info">hover3</x-tag>
  <x-tag ishover color="primary">标签二</x-tag>
  <x-tag ishover color="success">hover2</x-tag>
  <x-tag ishover color="warning">hover4</x-tag>
  <x-tag ishover color="danger">hover5</x-tag>
</div>

```
:::



### 可移除标签
设置```closable```属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，它接受一个Boolean，true 为关闭。

::: demo
```html

<template>
  <x-tag
    :key="tag.name"
    v-for="(tag, index) in dynamicTags" 
    :ishover="index < 2"
    closable 
    :color="tag.color" 
    :name="tag" 
    @on-close="handleClose">
    {{tag.name}}
  </x-tag>
</template>
<script>
export default {
    data() {
      return {
        dynamicTags: [{
           name: '标签一',
           color:'primary'
        },{
           name: '标签二',
           color: 'success' 
        }, {
           name: '标签三',
           color: 'info' 
        }, {
           name: '标签四',
           color: 'warning'           
        }, {
            name: '标签五',
            color: 'danger'
        }]
      };
    },
    methods: {
      handleClose(event, name) {
        console.log(event, name);
      }
    }
  }
</script>

```
:::

## API

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 用于触发关闭事件时的回调 | Boolean | — | false |
| color | 类型 | String |  `primary`, `success`, `error`, `warning`, `info` | primary |
| ishover | 是否有hover效果 | Boolean | — | false |
| closable | 是否可关闭 | Boolean | — | false |

## Tag 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| on-close | 点击关闭按钮时触发 | event,name |
