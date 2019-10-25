export default function (params){
  document.body.querySelectorAll('.img-privew').forEach(v => {
    document.body.removeChild(v);
  })
  var el = Vue.component('imgPrivew', { 
    template: `<el-image :style="{width: 0, height: 0}" class="img-privew" :src="currentSrc" :preview-src-list="list" />`,
   })
  var imgPrivew = Vue.extend(el);
  var vEl = new imgPrivew({
      data:{
        currentSrc: params.currentSrc,
        list: params.list || [params.currentSrc],
      },
      mounted() {
        this.$children[0].showViewer = true;
      },
    });
  var shadeEl = vEl.$mount().$el;
  document.body.appendChild(shadeEl);
}