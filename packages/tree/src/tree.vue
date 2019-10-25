<template>
		<ul class="tree-list">
      <tree-item 
        v-for="(item,index) in data" 
        :key="item.id" 
        :data="item" 
        :init="init" 
        :allUse="isUse"  
        :index="index" 
        @tellChecked="tellChecked" 
        @callBack="getTreeParameter" 
        ref="treeItem" 
      ></tree-item>
    </ul>
</template>

<script>
export default {
  props: {
    data:{
      type: Array,
    },
    init: {
      type: Object,
    }
  },
  data() {
    return {
      isUse: false,
      //所有子集的状态集合
      childrenChckedStatus:[],
    };
  },
  created() {
    this.childrenChckedStatus =  this.data.map(() => false);
  },
  methods: {
    tellChecked(o){
      this.childrenChckedStatus[o.index] = o.status;
      //集的状态.0 全未选, 1 全选,2 部分选中
      var status = 0;
      //找不到false,证明子集全部选中了
      if(this.childrenChckedStatus.indexOf(true) == -1){
        status = false;
      //找不到true证明子集没有选中项
      }else if(this.childrenChckedStatus.indexOf(false) == -1){
        status = true;
      //既有false,又有true证明子集存在选中和未选中两种状态
      }else if(this.childrenChckedStatus.indexOf(true) != -1 && this.childrenChckedStatus.indexOf(false) != -1){
        status = 2;
        o.isBlue = true;
      }  
      //调父级方法,传值
      this.$emit('tellChecked',{
        status: status,
        isBlue: o.isBlue,
      });
    },
    //设置子集状态,
    setChildrenStatus(s){
      this.isUse = s;
      this.childrenChckedStatus =  this.data.map(() => s);
      this.$refs.treeItem.forEach((item) => {
        item.setUse(s);
      });
    },
    //获取每次点击时的数据
    getTreeParameter(o){
      this.$emit('callBack',o);
    }
  },
  watch: {
    //实时监听传入值的改变
    data: {
      handler(n, o) { 
        console.log(n);
      },
      deep: true
    },
  },
  components: {}
}
</script>

<style lang="scss">
    .tree-list {
      position: relative;
      padding-left: 20px;
      text-align: left;
      .tree-rows {
        position: relative;
        height: auto;
        &:first-of-type:before {
          top: -7px;
          width: 0;
          height: calc(100% - 7px);
        }
        //线条
        &.tree-line {
          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: -13px;
            height: 100%;
            border-left: 1px dashed #E5E5E5;
          }
          &:first-of-type:before {
            top: 0;
            width: 0;
            height: 100%;
          }
          &:last-of-type:before {
            top: 0;
            height: 15px;
          }
          &.first:before{
            top: 15px;
            height: 50%;
          }
        }
        .tree-title {
          cursor: pointer;
          font-size: 13px;
          padding: 6px 20px 6px 0;
          &:before {
            content: "";
            position: absolute;
            top: 15px;
            left: -13px;
            height: 0;
            width: 13px;
            border-top: 1px dashed rgba(0, 0, 0, 0.2);
          }
        }      
      }
      .iconfont {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        user-select: none;
      }
    }
</style>