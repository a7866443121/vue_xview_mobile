<template>
  <transition name="x-alert-fade">
    <div class="x-alert"
         :class="[ typeClass, {'is-center': center} ]"
         v-show="visible">
      <i class="x-alert-icon"
         :class="[ iconClass, isBigIcon ]"
         v-if="showIcon"></i>
      <div class="x-alert-content">
        <span class="x-alert-title"
              :class="isBoldTitle"
              style="">{{this.title}}</span>
        <p class="x-alert-description"
           v-if="description">{{description}}</p>
        <i v-if="closable"
           class="x-alert-closebtn"
           :class="[ closeText ? 'is-customed' : 'x-icon-close2']"
           @click="close">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>
<script>
function isTextNode(vnode) {
  if (
    Array.isArray(vnode) &&
    vnode.length === 1 &&
    vnode[0].tag === undefined &&
    vnode[0].text
  ) {
    return true;
  } else {
    return false;
  }
}

export default {
  name: "WAlert",
  props: {
    title: {
      type: String,
      requre: true,
      default() {
        const defaultNode = this.$slots.default;
        return isTextNode(defaultNode) ? defaultNode[0].text : undefined;
      }
    },
    type: {
      type: String,
      default: "info"
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    closeText: {
      type: String
    },
    closable: {
      type: Boolean,
      default: true
    },
    description: {
      type: String
    }
  },
  data() {
    return {
      visible: true
    };
  },
  computed: {
    typeClass() {
      return `x-alert-${this.type}`;
    },
    iconClass() {
      //暂无对应图标
      return `icon-${this.type}`
      // return "icon-bell";
    },
    isBoldTitle() {
      return this.description ? "is-bold" : "";
    },
    isBigIcon() {
      return this.description ? "is-big" : "";
    }
  },
  methods: {
    close(e) {
      this.visible = false;
      this.$emit("close");
    }
  }
};
</script>
