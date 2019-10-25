<template>
		<div class="tree-popup">
      <div class="tree">
        <tree :data="data" :init="init" @callBack="getTreeParameter"></tree>
      </div>
      <div>
        <button @click="btnClick">确定</button>
      </div>
    </div>
</template>

<script>
import tree from "./tree.vue";
import j from "./j.json";
export default {
  props: {},
  data() {
    return {
      data: j,
      init: {
        //是否默认全部展开
        isOpen: true,
        //是否多选
        isManyCheck: true,
        //支线icon(存在子节点)
        feederIcon:'icon-wenjianjia',
        //结点icon,
        crunodeIcon:{
          key: 'default',
          default: 'icon-GroupCopy',
          iscampus:{
            1: 'icon-xiaoqu1',
            0: 'icon-bumen'
          },   
        },
      },
      treeParameter:[],
    };
  },
  created() {
    //单选时如果传入多个选中,会默认选中最后一个
    this.data[2].subdeparts[0].isCheck = true;
    this.data[2].subdeparts[1].subdeparts[0].isCheck = true;

  },
  methods: {
    getTreeParameter(o){
      //多选
      if (this.init.isManyCheck) {
        var isInclude = JSON.stringify(this.treeParameter).indexOf(o.data.id) != -1;
        //选中
        if(o.isUse){
          //不包含(避免重复)
          !isInclude && this.treeParameter.push(o.data);
        }else{
          this.treeParameter = this.treeParameter.filter((val,index) => val.id != o.data.id);
        }
        //单选
      } else {
        this.treeParameter = o;
      }
      console.log(this.treeParameter);
    },
    btnClick(){
      console.log(this.treeParameter);
    }
  },
  components:{
    tree
  }
};
</script>

<style lang="scss">
.tree-popup{
  display: inline-block;
  width: 640px;
  height: 80%;
  background: #fff;
  margin: 10%, auto;
  .tree{
    padding: 40px;
    overflow: auto;
    height: 80%;
  }
}

</style>