<template>
  <div class="chh-datetime-content_columns" :ref="'ulbox' + indexes" @scroll="scroll" :style="{height: itemHeight * visibleItemCount + 'px'}">
    <ul class="chh-datetime-content_columns-ul">
      <li :style="{height: (itemHeight * visibleItemCount / 2 - itemHeight / 2) + 'px' }"></li>
      <li
        class="chh-datetime-content_columns-ul-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{height: itemHeight + 'px', lineHeight: itemHeight + 'px'}"
      >{{formatter ? formatter(options.name, addZero(item)) : addZero(item)}}</li>
      <li :style="{height: (itemHeight * visibleItemCount / 2 - itemHeight / 2) + 'px' }"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    },
    // 索引
    indexes: {
      type: Number,
      default: 0
    },
    // 当前时间
    current: [Number, String],
    // 选项高度
    itemHeight: {
      type: Number,
      default: () => 44
    },
    // 可见的选项个数
    visibleItemCount: {
      type: Number,
      default: () => 5
    },
    formatter: null
  },
  data() {
    return {
      currentDate: '',
      scrollTop: 0,
      isScroll: false,
      timer: null,
      activeValue: 0
    }
  },
  created() {
    this.currentDate = this.current
  },
  watch: {
    list (val) {
      this.init(val)
    },
    currentDate (val) {
     this.activeValue = val
     this.init(this.list)
    },
  },
  methods: {
    init (val) {
      if (this.activeValue < val[0]) {
        this.activeValue = val[0]
      }
      if (this.activeValue > val[val.length - 1]) {
        this.activeValue = val[val.length - 1]
      }
      let currentDayIndex = this.list.findIndex(v => v == this.activeValue);
      this.endScroll(this.itemHeight * currentDayIndex)
    },
    scroll () {
      if (this.scrollTop === this.$refs['ulbox' + this.indexes].scrollTop) return 
      this.isScroll = true
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (!this.isScroll) {
          clearInterval(this.timer)
          this.endScroll(this.scrollTop)
        }
        this.isScroll = false
      }, 50);
      this.scrollTop = this.$refs['ulbox' + this.indexes].scrollTop
    },
    endScroll(val) {
      const coefficient = Math.round(val / this.itemHeight);
       this.$refs['ulbox' + this.indexes].scrollTop = coefficient * this.itemHeight;
      this.getValue(coefficient);
    },

    // 得到结果
    getValue(index) {
      this.activeValue = this.list[index]
      this.$emit('column-change', this.options.name, this.list[index])
    },
    // 自动补零
    addZero (val) {
      return typeof val === 'number' && (val < 10 ? '0' + val : val) || val
    }
  },
}
</script>

<style lang="scss">
  .chh-datetime-content_columns {
    position: relative;
    height: 100%;
    flex: 1;
    overflow-y: scroll;
    text-align: center;
    &::-webkit-scrollbar {
      display: none;
    }
    
  }
</style>