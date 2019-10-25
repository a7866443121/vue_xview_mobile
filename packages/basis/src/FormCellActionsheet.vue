<template>
  <div class="form-cell component-form-cell-actionsheet">
    <van-cell
      @click="showActionsheet"
      :is-link="isLink"
      :title="displayValue || placeholder || ' '"
      :class="{placeholder: !displayValue}">
      <slot name="right-icon" slot="right-icon"></slot>
      <span slot="icon" class="icon-label">{{label}}</span>
    </van-cell>
    <van-actionsheet
      v-model="actionsVisible"
      :actions="formatActionList"
      :cancel-text="cancelText"
      @select="onSelect"
    />
  </div>
</template>

<script>


export default {
  name: 'component-form-cell-actionsheet',
  
  props: {
    label: String,
    value: [String, Number, Boolean],
    valueKey: String,
    placeholder: String,
    isLink: {
      type: Boolean,
      default: true
    },
    cancelText: String,
    actions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    const displayValue = this.formatDisplayValue(this.value)
    const formatActionList = this.formatActions(this.actions)
    return {
      actionsVisible: false,
      displayValue,
      formatActionList
    }
  },
  methods: {
    formatActions (actions) {
      return actions.map(item => {
        const ritem = Object.assign({}, item)
        if (!ritem.className) {
          ritem.className = ''
        }
        ritem.className = ritem.className.replace(/(^|\s+)actionsheet-active($|\s+)/g, '')
        if (this.valueKey && ritem[this.valueKey] === this.value) {
          ritem.className = ritem.className + ' actionsheet-active'
        }
        if (!this.valueKey && ritem.name === this.value) {
          ritem.className = ritem.className + ' actionsheet-active'
        }
        return ritem
      })
    },
    formatDisplayValue (val) {
      if (!this.valueKey) {
        return val
      }
      if (this.actions.length > 0) {
        const active = this.actions.find(item => item[this.valueKey] === val)
        return active ? active.name : ''
      } else {
        return ''
      }
    },
    onSelect (item) {
      const oldItem = this.formatActionList.find(v => {
        if (this.valueKey) {
          return v[this.valueKey] === this.value
        }
        return v.name === this.value
      })
      if (oldItem) {
        oldItem.className = oldItem.className.replace(/(^|\s+)actionsheet-active($|\s+)/g, '')
      }
      item.className = item.className + ' actionsheet-active'
      this.displayValue = item.name
      this.actionsVisible = false
      if (this.valueKey) {
        this.$emit('input', item[this.valueKey])
      } else {
        this.$emit('input', item.name)
      }
    },
    showActionsheet () {
      if (this.actions.length === 0) {
        this.$emit('click-empty')
        return false
      }
      this.actionsVisible = true
    }
  },
  watch: {
    actions () {
      this.formatActionList = this.formatActions(this.actions)
      if (this.value) {
        this.displayValue = this.formatDisplayValue(this.value)
      }
    },
    value (val) {
      this.displayValue = this.formatDisplayValue(val)
    }
  }
}
</script>

<style lang="scss">
.component-form-cell-actionsheet {
  position: relative;
  .placeholder {
    .van-cell__title {
      color: #969799;
    }
  }
  .actionsheet-active {
    color: #009cff;
  }
}
</style>
