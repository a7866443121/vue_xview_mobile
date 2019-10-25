/**
 * @author monkeywang
 * Date: 17/11/12
 */
import xFiexdColumnTable from './src/fiexdColumnTable.vue';
import xResizeTable from './src/resizeTable.vue'

xFiexdColumnTable.install = function(Vue) {
  Vue.component(xFiexdColumnTable.name, xFiexdColumnTable)
}
xResizeTable.install = function(Vue) {
  Vue.component(xResizeTable.name, xResizeTable)
}

export {
	xFiexdColumnTable,
	xResizeTable
};
