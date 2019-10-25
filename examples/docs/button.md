<style lang="scss">
	.x-btn{
		margin:10px;
	}
</style>
<script>
 export default {
    
  }
</script>
# Button 按钮
----
### 基础用法
使用```type```定义按钮颜色, ```circle``` ```radius```  ```round``` ```disabled```属性来定义 Button 的样式。



::: demo
```html

<div>
	<div>
		<x-button circle><i class="icon-iconset0157 fs-16"></i></x-button>
		<x-button type="plain" round>plain</x-button>
		<x-button type="info" radius>info</x-button>
		<x-button type="primary">primary</x-button>
		<x-button type="success">success</x-button>
		<x-button type="success" disabled>success</x-button>
		<x-button type="warning">warning</x-button>
		<x-button type="danger" radius><i class="icon-iconset0144 fs-16"></i> danger</x-button>
	</div>
	<div>
		<x-button type="outline" circle><i class="icon-iconset0157 fs-16"></i></x-button>
		<x-button type="plain-outline" round>plain</x-button>
		<x-button type="info-outline" radius>info</x-button>
		<x-button type="primary-outline">primary</x-button>
		<x-button type="success-outline">success</x-button>
		<x-button type="success-outline" disabled>success</x-button>
		<x-button type="warning-outline">warning</x-button>
		<x-button type="danger-outline" radius><i class="icon-iconset0144 fs-16"></i> danger</x-button>
	</div>
</div>

```
:::
  

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型  +(-outline)为线条按钮  | string    | plain , primary , success , info , warning , danger |     —    |
| round     | 圆端按钮  | Boolean    | — | false   |
| radius  | 圆角按钮    | boolean   | —   | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |

### Event
| 事件名称      | 说明       | 回调参数   |
|------------- |----------- |---------  |
|     按自己需求绑    ||   |