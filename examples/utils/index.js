/**
 * 格式化查询参数
 * @param {Object} format {
 *    key1: '查询类 compareSymbol',
 *    key2: [fieldName, fieldName]
 * }
 * @param {Object} form {
 *    fieldName: value,
 *    fieldName: value,
 * }
 * @return {Array}
 */
export const formatQuery = (format, form) => {
  var result = [];
  //遍历所有查询类（包含，大于等）
  for (const key in format) {
    if (format.hasOwnProperty(key)) {
      //遍历每种类型所有字段
      var reg = new RegExp(key)
      format[key].forEach(v => {
        result.push({
          fieldName: isObject(v) ? v.key : v,
          compareSymbol: /LIKE/ig.test(key) ? 'LIKE' : key,
          param: setParam(v,key),
        });  
      });
    }
  }

  //设置值 未模糊查询时需要再值得左右加%处理；
  function setParam(v, key){
    var param = isObject(v) ? form[v.key][v.value] : form[v];
    if (/LIKE/ig.test(key)&&param) {
      param = key.replace(/LIKE/ig, param)
    } 
    return param;
  }
  return JSON.stringify(result.filter(v => v.param !== '' && v.param !== null && v.param !== undefined));
}

var _toString = Function.prototype.call.bind(Object.prototype.toString);

function getType(target) {
    return _toString(target).slice(8, -1).toLowerCase();
}
/**
 * 判断目标是否为Object
 * @param {*} target 验证目标
 * @returns {Boolean}
 */
export var isObject = function (target) {
    return getType(target) === 'object';
}

/**
 * 格式化排序
 * @param {String} compareSymbol 'ASC'
 * @param {String} fieldName 'create_time'
 * @return {Object} {"fieldName":"create_time","compareSymbol":"ASC","param":"ASC"}
 */
export const formatSort = (sort) => {
  var o = {}
  switch (sort.order) {
    case 'ascending':
        o = {"fieldName": sort.prop,"compareSymbol":"ASC","param":"ASC"}
      break;
    case 'descending':
        o = {"fieldName": sort.prop,"compareSymbol":"DESC","param":"DESC"}
      break;
    default:
        o = '';
      break;
  }
  return o ? [o] : [];
}

// 
/**
 * 数组转set
 * @param {Array} compareSymbol '[1,2,3] | [{code:1,value: 'aaa'}]'
 * @param {String} fieldName 'code'
 * @return {Object} {"fieldName":"create_time","compareSymbol":"ASC","param":"ASC"}
 */
export const ArrayToSet = (arr, key) =>{
  var set = {};
  for (const item of arr) {
    if (key) {
      set[item[key]] = item;
    } else {
      set[item] = item;
    }
  }
  return set;
}

/**
 * 比较两个日期之间的大小
 */
export const compareDate = (start, end) => {
  const startTimap = new Date(start).getTime()
  const endTimap = new Date(end).getTime()
  return startTimap <= endTimap ? true : false
}

/**
 * 对象深复制
 * @param {Object} 源对象
 */
export const cloneObject = (obj) => {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key]!==null) {
        result[key] = cloneObject(obj[key]);   //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

// 转驼峰
export function toHump (str, s = '-') {
  var re = new RegExp(`${s}(\\w)`, 'g')
  return str.replace(re, function($0, $1) {
    return $1.toUpperCase()
  })
}
