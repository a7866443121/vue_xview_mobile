<template>
  <li 
    class="tree-rows tree-line" 
    :class="{'many-active': !data.subdeparts.length && isUse}"   
  >
    <div class="tree-title">
      <!--存在子集才显示,  每次点击 支线控制器取反, icon跟随控制器切换 -->
      <span v-show="data.subdeparts.length" @click="open = !open" class="tree-icon">
        <icon 
          :name="open ? 'icon-xuanzezhankaiicon' : 'icon-xuanzeweizhankaiicon'"
        ></icon>
      </span>
      <!-- checkbox图标,多选时才显示 -->
      <span  v-show="init.isManyCheck" @click="CheckedClick" class="tree-icon">
        <icon 
          class="tree-select" 
          :name="isUse ? 'icon-weiquanxuanyixuanze' : 'icon-weixuanzhong1'" 
          :class="{fblue: isBlue}"
        ></icon>
      </span>
        <!-- 结点图标 -->
      <span 
        @click="!data.subdeparts.length && !init.isManyCheck && getPitchOn()" 
        onselectstart="return false;"
      >
       <!-- 是否显示支线 || 结点icon,根据支线icon控制显示/隐藏, (支线icon = 存在子集, 结点 = 不存在子集) -->
        <span v-show="init.feederIcon" class="tree-icon">
          <icon  
            :name="data.subdeparts.length ? init.feederIcon : crunodeIcon" 
          ></icon>
        </span>
        <font class="tree-name"> {{data.name || ''}}</font>
      </span>
    </div>
    <tree 
      v-if="data.subdeparts.length" 
      :data="data.subdeparts" 
      v-show="open" 
      :init="init" 
      @tellChecked="tellChecked" 
      @callBack="getTreeParameter" 
      ref="tree" 
    ></tree>
  </li>
</template>
<script>
export default {
  props: {
    data:{
      type: Object,
    },
    init:{
      type:Object,
      default: {}
    },
    index:{
      type:Number
    },
  },
  data() {
    return {
      //控制改支线是否打开
      open: true,
      //部分选中,颜色为蓝色
      isBlue: false,
      //是否选中
      isUse: false,
    };
  },
  computed: {
    crunodeIcon(o){
      //图标配置取法,
      var crunodeIcon = this.init.crunodeIcon[this.init.crunodeIcon.key] || ' ';
      //如果是字符串,直接拿来显示,其它情况转数字,取对应的key
      return typeof crunodeIcon == 'string' ? crunodeIcon : crunodeIcon[this.data[this.init.crunodeIcon.key] - 0] || ' ';
    },
  },
  mounted(){
    //给dom加上参数属性
    this.$el.dataValue = JSON.stringify(this.data);    
    //是否全部展开的设置优先
    this.open = this.init.isOpen || false;
    //设置默认选中项 
    this.init.isManyCheck ? ((this.isUse = this.data.isCheck || false) && (this.CheckedClick(true))) : (this.data.isCheck && this.getPitchOn(true));
  },
  methods: {
    // 选择框被点击
    CheckedClick(s){ 
      //如果传入的值为布尔(点击时传入的时事件对象,借此区分),并且是true,则是默认选中,其余情况都为点击
      this.isUse = typeof s == 'boolean' && s ? this.data.isCheck : !this.isUse;
      //调父组件把值传出去,
      this.$emit('callBack',{
        data: this.data,
        isUse: this.isUse,
      });
      //无论是否选中,都不可能部分选中;
      this.isBlue = false;
      //调父级方法,
      this.$emit('tellChecked',{
        index: this.index,
        status: this.isUse,
        isBlue: this.isBlue,
        data: this.data,
      });
      //如果存在子集,则改变子集属性
      this.data.subdeparts.length && this.$refs.tree.setChildrenStatus(this.isUse);  
    },
    tellChecked(o){ 
      //2时代表部分选中    
      this.isBlue = o.isBlue;
      this.isUse = o.status === 2 ? false : o.status;
      this.$emit('tellChecked',{
        index: this.index,
        status: this.isUse,
        isBlue: this.isBlue,
      });  
    },
    //设置自身状态
    setUse(s){
      this.isUse = s;
      if(this.data.subdeparts.length){
        this.$refs.tree.setChildrenStatus(this.isUse);
      }
    },
    //获取单选值
    getPitchOn(s){
      //如果传入的值为布尔(点击时传入的时事件对象,借此区分),并且是true,则是默认选中,其余情况都为点击
      typeof s == 'boolean' && s ? this.$el.classList.add('single-active') : this.$el.classList.toggle('single-active');
      document.querySelectorAll('.tree .tree-rows.single-active').forEach((item) => {
        //非当前组件的,删除类名
        !this.$el.isEqualNode(item) && item.classList.remove('single-active');
      });
      //调父级把值传出去
      this.$emit('callBack',{
        data: this.data,
        isUse: this.$el.classList.contains('single-active'),
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
  components:{}
};
</script>
<style lang="scss">
  .tree-icon{
    user-select: none;
  }
  .fblue{
    color: #3673FF;
  }
  .single-active{
    .tree-name{
      background:rgba(255,199,0,0.12);
      border-radius:2px;
      border:1px solid rgba(255,199,0,1);
      padding: 2px 4px;
    }
  }
</style>

