

<script>
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
      },

      filter (type, options) {
        if (type == 'days') {
          return options.filter(v => v % 2 == 0)
        }
        return options
      },

      format (type, value) {
        if (type == 'year') {
          return `${value}年`
        } 
        else if (type == 'month') {
          return `${value}月`
        }
        return value
      }
    },
  }
</script>

# date-time-picker时间选择器
----
用于选择时间，支持日期、时分等时间维度，通常与 弹出层 组件配合使用

### 基础用法

::: demo
```html

<date-time-picker></date-time-picker>


```
:::

### 选择年月日
使用currentDate属性可以自定义时间点， 默认值是当期时间点

::: demo
```html

<date-time-picker 
  type="year-month-day" 
  current-date="2019-10-08" 
  />
```
:::

### 选择年月
如果设置的当期时间点小于设置的最小时间， 那么会默认选择该列的第一项， 同理， 如果大于了最大时间， 就会默认选择最后一项

::: demo
```html

<date-time-picker type="year-month" :min-date="new Date()" current-date="2018-10"/>

```
:::

### 选择时间

::: demo
```html

<date-time-picker type="hours-minutes" currentDate="18:20" :min-hours="17"/>


```
:::

### 格式化某列
有时候我们需要对选项进行一些格式化和过滤，下面例子对天数这一列实现了自定义时间间隔，对年份和月份文字进行了格式化处理，参数```type```的类型有```year```, ```month```, ```days```, ```hours```, ```minutes```

::: demo
```html

<date-time-picker 
  type="year-month-day" 
  :filter="filter" 
  :formatter="format"/>

<script>
 export default {
    methods: {
      filter (type, options) {
        if (type == 'days') {
          return options.filter(v => v % 2 == 0)
        }
        return options
      },
      format (type, value) {
        if (type == 'year') {
          return `${value}年`
        } 
        else if (type == 'month') {
          return `${value}月`
        }
        return value
      }
    }
  }
</script>

```
:::


### 不常用属性

::: demo
```html

<date-time-picker 
  type="year-month-day" 
  :item-height="60" 
  :select-item-height="80" 
  :visible-item-count="7"
  confirm-button-text="确认按钮"
  cancel-button-text="取消按钮"/>


```
:::

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|type                       |	类型 |	string   |	 datetime, year-month-day, year-month, hours-minutes          | datetime |
|current-date | 自定义时间点 |string |	- |	- |
|min-date |	可选的最小时间，精确到分钟                |	Date    | - |	十年前      |
|max-date |	可选的最大时间，精确到分钟                |	Date    | - |	十年后      |
|max-hours |	可选的最大小时，针对 hours-minutes 类型         |	number    |	0 - 23             |	0      |
|min-hours |	可选的最小小时，针对 hours-minutes 类型         |	number    |	0 - 23             |	23      |
|max-minutes |	可选的最大分钟，针对 hours-minutes 类型       |	number    |	0-59             |	59      |
|min-minutes |	可选的最小分钟，针对 hours-minutes 类型       |	number    |	0-59             |	十年前      |
|item-height |	选项高度                |	number    |	-             |	44      |
|select-item-height             |	中间选中框高度                |	number    |	-             |	44      |
|visible-item-count |	可见的选项个数                |	number    |	-             |	5      |
|is-tab-btn |	是否显示顶部栏                |	boolean    |	true, false            |	true      |
|filter |	选项过滤函数                |	(type, values) => values    |	-            |	-      |
|formatter |	选项格式化函数                |	(type, value) => value    |	-            |	-      |
|confirm-button-text |	确认按钮文字                |	string    |	-            |	确认      |
|cancel-button-text |	取消按钮文字                |	string    |	-            |	取消      |
|is-addZero |	返回的结果， 不足两位数是否自动补0        |	boolean    |	true, false            |	true      |


### Event
| 事件名称      | 说明       | 回调参数   |
|------------- |----------- |---------  |
|change         |当值变化时触发的事件| 当前 value  |
|confirm         |点击完成按钮时触发的事件| 当前 value  |
|cancel         |点击取消按钮时触发的事件| -  |
