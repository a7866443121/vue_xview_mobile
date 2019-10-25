<style>
.x-alert:not(:first-child){
  margin-top: 10px;
}
</style>

<script>
import mapSelectPosition from '../../packages/popup/src/mapSelectPosition'
 export default {
   data(){
     return {
       position: {}
     }
   },
    methods: {
      onCancel() {
        alert('onCancel');
      },
      showSelectPosition(){
        this.$popup(mapSelectPosition, {
          hasSearch: true,
          allowDrag: true,
          centerTip: '吃饭没',
          params: {
            lat: 28.228259,
            lng: 112.938904
          }
        }).then(position => {
          this.position = position;
        });
      }
    }
  }
</script>

# $popup 弹窗
----
弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作

弹出框组件只支持函数调用 返回一个Promise

### 地图选点

::: demo
```html

<div>
  <van-button type="info" @click="showSelectPosition" :round="false">显示弹窗</van-button>
  <p>选中的地址{{JSON.stringify(position)}}</p>
</div>
<script>
import mapSelectPosition from '../../packages/popup/src/mapSelectPosition'
 export default {
   data(){
     return {
       position: {}
     }
   },
    methods: {
      onCancel() {
        alert('onCancel');
      },
      showSelectPosition(){
        this.$popup(mapSelectPosition, {
          hasSearch: true,
          allowDrag: true,
          centerTip: '吃饭没',
          params: {
            lat: 28.228259,
            lng: 112.938904
          }
        }).then(position => {
          this.position = position;
        });
      }
    }
  }
</script>

```
:::

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|hasSearch      |	有搜索栏 |	Boolean   |	—           | true |
|allowDrag	      | 允许拖拽换点        |	Boolean    |	— |	true |
|centerTip |	中心点提示                |	string    |	—             |	当前选点      |
|params |	扩展参数（目前只有经纬度）                |	object    |	lat纬度，lng经度             |	当前选点      |

### 带有 icon
表示某种状态时提升可读性。
<div class="dome-alert demo-block">
  <w-alert type="success" show-icon>成功提示的文案(暂无对应图标)</w-alert>
  <w-alert type="info" show-icon>消息提示的文案(暂无对应图标)</w-alert>
  <w-alert type="warning" show-icon>警告提示的文案(暂无对应图标)</w-alert>
  <w-alert type="error" show-icon>错误提示的文案(暂无对应图标)</w-alert>
</div>

::: demo
```html

<div>
  <w-alert type="success" show-icon>成功提示的文案</w-alert>
  <w-alert type="info" show-icon>消息提示的文案</w-alert>
  <w-alert type="warning" show-icon>警告提示的文案</w-alert>
  <w-alert type="error" show-icon>错误提示的文案</w-alert>
</div>

```
:::

### 文字居中
使用 ```center``` 属性让文字水平居中。
<div class="dome-alert demo-block">
  <w-alert type="success" center show-icon>成功提示的文案</w-alert>
  <w-alert type="info" center show-icon>消息提示的文案</w-alert>
  <w-alert type="warning" center show-icon>警告提示的文案</w-alert>
  <w-alert type="error" center show-icon>错误提示的文案</w-alert>
</div>

::: demo
```html

<div>
  <w-alert type="success" center show-icon>成功提示的文案</w-alert>
  <w-alert type="info" center show-icon>消息提示的文案</w-alert>
  <w-alert type="warning" center show-icon>警告提示的文案</w-alert>
  <w-alert type="error" center show-icon>错误提示的文案</w-alert>
</div>

```
:::

### 自定义关闭按钮
自定义关闭按钮为文字或其他符号。
<div class="dome-alert demo-block">
  <w-alert type="success" :closable="false">不可关闭的 alert</w-alert>
  <w-alert type="info" close-text="知道了">自定义关闭的 alert</w-alert>
  <w-alert type="warning" >设置了回调的 alert</w-alert>
</div>

::: demo
```html

<div class="dome-alert demo-block">
  <w-alert type="success" :closable="false">不可关闭的 alert</w-alert>
  <w-alert type="info" close-text="知道了">自定义关闭的 alert</w-alert>
  <w-alert type="warning" >设置了回调的 alert</w-alert>
</div>

```
:::

<div class="dome-alert demo-block">
  <w-alert type="success" 
           description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰……">带辅助性文字介绍</w-alert>
  <w-alert type="info" show-icon
           description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰……">带有 icon 和辅助性文字介绍</w-alert>
</div>

::: demo
```html

<div class="dome-alert demo-block">
  <w-alert type="success" 
           description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰……">带辅助性文字介绍</w-alert>
  <w-alert type="info" show-icon
           description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰……">带有 icon 和辅助性文字介绍</w-alert>
</div>

```
:::

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|hasSearch      |	有搜索栏 |	Boolean   |	—           | true |
|allowDrag	      | 允许拖拽换点        |	Boolean    |	— |	true |
|centerTip |	中心点提示                |	string    |	—             |	当前选点      |


### Event
| 事件名称      | 说明       | 回调参数   |
|------------- |----------- |---------  |
|close         |关闭alert时触发的事件| —  |
