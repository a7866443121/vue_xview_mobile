### 收缩列表格
设置```itemWidth```属性定义每列的默认宽度,不传默认是80px

<script>
export default {
  data() {
	return {
	  theadList: [
	    "姓名",
	    "英文姓名",
	    "性别",
	    "所属分校",
	    "客户状态",
	    "试听状态",
	  ],
	  studentInfo: [{
	    name: 'John Brown',
	    age: 18,
	    address: 'New York No. 1 Lake Park',
	    province: 'America',
	    city: 'New York',
	    zip: 100000
	   },{
	    name: 'Jim Green',
	    age: 24,
	    address: 'Washington, D.C. No. 1 Lake Park',
	    province: 'America',
	    city: 'Washington, D.C.',
	    zip: 100000
	   },{
	    name: 'Joe Black',
	    age: 30,
	    address: 'Sydney No. 1 Lake Park',
	    province: 'Australian',
	    city: 'Sydney',
	    zip: 100000
	   },{
	    name: 'Jon Snow',
	    age: 26,
	    address: 'Ottawa No. 2 Lake Park',
	    province: 'Canada',
	    city: 'Ottawa',
	    zip: 100000
	  }],
	  tableInit: {
      cellWidth: 100
    },
    sorts:'icon-iconset0413'
	  }
	},
  methods: {
	  sort(s) {
	  this.sorts = s.sort == 1 ? 'icon-iconset0413' : 'icon-iconset0414';
	    alert(JSON.stringify(s));
	  }
  }
};
</script>

::: demo

```html
<x-resize-table :itemWidth="80">
	<tr slot="thead">
		<th v-for="item in theadList" :key="item">{{item}}</th>
	</tr>
	<tr class="rx-tr" v-for="info in studentInfo" :key="info.name">
		<td class="x-td">{{info.name}}</td>
		<td>{{info.age}}</td>
		<td>{{info.address == 0 ? '男' : '女'}}</td>
		<td>{{info.province}}</td>
		<td>{{info.city}}</td>
		<td>{{info.zip}}</td>
	</tr>
</x-resize-table>
<script>
export default {
  data() {
	return {
	  theadList: [
	    "姓名",
	    "英文姓名",
	    "性别",
	    "所属分校",
	    "客户状态",
	    "试听状态",
	  ],
	  studentInfo: [{
	    name: 'John Brown',
	    age: 18,
	    address: 'New York No. 1 Lake Park',
	    province: 'America',
	    city: 'New York',
	    zip: 100000
	   },{
	    name: 'Jim Green',
	    age: 24,
	    address: 'Washington, D.C. No. 1 Lake Park',
	    province: 'America',
	    city: 'Washington, D.C.',
	    zip: 100000
	   },{
	    name: 'Joe Black',
	    age: 30,
	    address: 'Sydney No. 1 Lake Park',
	    province: 'Australian',
	    city: 'Sydney',
	    zip: 100000
	   },{
	    name: 'Jon Snow',
	    age: 26,
	    address: 'Ottawa No. 2 Lake Park',
	    province: 'Canada',
	    city: 'Ottawa',
	    zip: 100000
	  }],
	  }
	}
  },
};
</script>

```
:::

### 固定列收缩列表格
----
设置```itemWidth```属性定义每列的默认宽度,不传默认是80px

::: demo
```	html

<x-fiexd-column-table :column="3" :setTable="tableInit" @sort="sort">
	<tr slot="fiexd-thead">
		<th v-for="item in theadList" :key="item">{{item}} <span class="sort">&</span></th>
	</tr>
	<tbody slot="fiexd-tbody">
		<tr class="rx-tr" v-for="info in studentInfo" :key="info.name">
			<td class="x-td">{{info.name}}</td>
			<td>{{info.age}}</td>
			<td>{{info.address == 0 ? '男' : '女'}}</td>
			<td>{{info.province}}</td>
			<td>{{info.city}}</td>
			<td>{{info.zip}}</td>
		</tr>
	</tbody>
	<tr slot="thead">
		<th v-for="(item,index) in theadList" :key="item">{{item}}<span v-if="index < 5" class="sort">&</span></th>
	</tr>
	<tbody slot="tbody">
		<tr class="rx-tr" v-for="info in studentInfo" :key="info.name">
			<td class="x-td">{{info.name}}</td>
			<td>{{info.age}}</td>
			<td>{{info.address == 0 ? '男' : '女'}}</td>
			<td>{{info.province}}</td>
			<td>{{info.city}}</td>
			<td>{{info.zip}}</td>
		</tr>
	</tbody>
</x-fiexd-column-table>
<script>
export default {
  data() {
	return {
	  theadList: [
	    "姓名",
	    "英文姓名",
	    "性别",
	    "所属分校",
	    "客户状态",
	    "试听状态",
	  ],
	  studentInfo: [{
	    name: 'John Brown',
	    age: 18,
	    address: 'New York No. 1 Lake Park',
	    province: 'America',
	    city: 'New York',
	    zip: 100000
	   },{
	    name: 'Jim Green',
	    age: 24,
	    address: 'Washington, D.C. No. 1 Lake Park',
	    province: 'America',
	    city: 'Washington, D.C.',
	    zip: 100000
	   },{
	    name: 'Joe Black',
	    age: 30,
	    address: 'Sydney No. 1 Lake Park',
	    province: 'Australian',
	    city: 'Sydney',
	    zip: 100000
	   },{
	    name: 'Jon Snow',
	    age: 26,
	    address: 'Ottawa No. 2 Lake Park',
	    province: 'Canada',
	    city: 'Ottawa',
	    zip: 100000
	  }],
	  tableInit: {
      cellWidth: 100
    },
    sorts:'icon-iconset0413'
	  }
	},
  methods: {
	  sort(s) {
	  this.sorts = s.sort == 1 ? 'icon-iconset0413' : 'icon-iconset0414';
	    alert(JSON.stringify(s));
	  }
  }
};
</script>

```
::: 


## API

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| column | 固定多少列 | number | 正整数 | - |
| setTable | 一些设置 | Object |  {cellWidth:100} | - |

## Tag 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| sort | 排序的回调 | {sort: (true/false), index: '点击的列'} |
