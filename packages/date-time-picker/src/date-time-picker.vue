<template>
  <div class="hello">
    <div class="chh-datetime-box">
      <div class="chh-datetime-header" v-if="isTabBtn">
        <span class="chh-datetime_cancel chh-datetime-btn" @click="$emit('cancel')">{{cancelButtonText}}</span>
        <span class="chh-datetime_confirm chh-datetime-btn" @click="onConfirm">{{confirmButtonText}}</span>
      </div>
      <div class="chh-datetime-content">
        <pick-column 
        v-for="(item, index) in list" 
        :key="index" 
        :list="item.children"
        :options="item" 
        :indexes="index"
        :current="item.current"
        @column-change="columnChange"
        :visibleItemCount="visibleItemCount"
        :itemHeight="itemHeight"
        :formatter="formatter"
        />
        <div class="van-picker__mask" :style="{backgroundSize: `100% ${itemHeight * (visibleItemCount - 1) / 2}px`}"></div>
        <!--选中框-->
        <div class="chh-datetime-hairline_bottom" :style="{height: selectItemHeight + 'px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeValue } from "../utils/datetime";
import pickColumn from '../components/pick-column'
let obj = {
    year: '',
    month: '',
    days: '',
    hours: '',
    minutes: ''
  }
export default {
  components: {
    pickColumn
  },
  name: "dateTimePicker",
  props: {
    type: {
      type: String,
      default: "datetime"
    },
    // 显示自定义时间点
    currentDate: {
      type: String,
      default: ""
    },
    // 可选到的最小时间， 精确到分钟，默认十年前
    minDate: {
      type: Date,
      default: () => new Date(`${getTimeValue(new Date(), 'year') - 10}/01/01 00:00`)
    },
    // 可选到的最大时间， 精确到分钟，默认十年后
    maxDate: {
      type: Date,
      default: () => new Date(`${getTimeValue(new Date(), 'year') + 10}/12/31 23:59`)
    },
    // 可选的最大小时， 针对hours-minutes
    maxHours: {
      type: Number,
      default: () => 23
    },
    // 可选的最小小时， 针对hours-minutes
    minHours: {
      type: Number,
      default: () => 0
    },
    maxMinutes: {
      type: Number,
      default: () => 59
    },
    minMinutes: {
      type: Number,
      default: () => 0
    },
    // 选项高度
    itemHeight: {
      type: Number,
      default: () => 44
    },
    // 选中框高度
    selectItemHeight: {
      type: Number,
      default: () => 44
    },
     // 可见的选项个数
    visibleItemCount: {
      type: Number,
      default: () => 5
    },
    // 是否显示顶部按钮栏
    isTabBtn: {
      type:Boolean,
      default: true
    },
    // 过滤器函数, 可自定义时间间隔 
    filter: null,
    // 格式化函数，选项文字格式化处理
    formatter: null,
    // 确认按钮文字
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    // 取消按钮文字
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    // 返回的结果中， 如果不足两位数的是否自动补0
    isAddZero: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    list() {
      const year = "year";
      const month = "month";
      const days = "days";
      const hours = "hours";
      const minutes = "minutes";
      const typeObj = {
        'datetime': [
          {
            name: year,
            children: this.yearList,
            current: this.year
          },
          {
            name: month,
            children: this.monthList,
            current: this.month
          },
          {
            name: days,
            children: this.dayList,
            current: this.days
          },
          {
            name: hours,
            children: this.hoursList,
            current: this.hours
          },
          {
            name: minutes,
            children: this.minutesList,
            current: this.minutes
          }
        ],
        "year-month-day": [
          {
            name: year,
            children: this.yearList,
            current: this.year
          },
          {
            name: month,
            children: this.monthList,
            current: this.month
          },
          {
            name: days,
            children: this.dayList,
            current: this.days
          }
        ],
        "year-month": [
          {
            name: year,
            children: this.yearList,
            current: this.year
          },
          {
            name: month,
            children: this.monthList,
            current: this.month
          }
        ],
        "hours-minutes": [
          {
            name: hours,
            children: this.hoursList,
            current: this.hours
          },
          {
            name: minutes,
            children: this.minutesList,
            current: this.minutes
          }
        ],
      };
      
      return typeObj[this.type];
    },
    
    dataTime () {
      return this.currentDate ? new Date(this.currentDate.replace(/-/g,'/')) : new Date()
    }
  },

  data() {
    return {
      // 年份数组
      yearList: [],
      // 月份数组
      monthList: [],
      // 天数日期数组
      dayList: [],
      // 小时数组
      hoursList: [],
      // 分钟数组
      minutesList: [],
      // 返回结果
      resultStr: "",

      year: "",
      month: "",
      days: "",
      hours: "",
      minutes: ""
    };
  },
  created() {
    if (this.type == 'hours-minutes') {
      this.hours = this.currentDate ? this.currentDate.split(':')[0] : getTimeValue(this.dataTime, "hours");
      this.minutes = this.currentDate ? this.currentDate.split(':')[1] :getTimeValue(this.dataTime, "minutes");
    }
    else {
      this.year = getTimeValue(this.dataTime, "year");
      this.month = getTimeValue(this.dataTime, "month");
      this.days = getTimeValue(this.dataTime, "dateDay");
      this.hours = getTimeValue(this.dataTime, "hours");
      this.minutes = getTimeValue(this.dataTime, "minutes");
    }
    this.getYearFn();
    this.getMonthFn();
    this.getDaysFn();
    this.getHoursFn();
    this.getMinutesFn();
  },
  methods: {
    // 得到年份
    getYearFn() {
      const countUp = getTimeValue(this.minDate, 'year');
      const countNext = getTimeValue(this.maxDate, 'year');
      for (let i = countUp; i <= countNext; i++) {
        this.yearList.push(i);
      }
      this.yearList = this.filter && typeof this.filter === 'function' && this.filter('year', this.yearList) || this.yearList
      return this.yearList;
    },

    // 得到月份
    getMonthFn() {
      this.monthList = []
      const {year: minYear, month: minMonth} = getTimeValue(this.minDate)
      const {year: maxYear, month: maxMonth} = getTimeValue(this.maxDate)
      // 如果选中的当前年和当前月恰好是可选的最大月份
      const maxCount = this.year >= maxYear ? maxMonth : 12 
      // 如果选中的当前年和当前月恰好是可选的最小月份
      const minCount = this.year <= minYear ? minMonth : 1
      for (let i = minCount; i <= maxCount; i++) {
        this.monthList.push(i);
      }
     
      this.monthList = this.filter && typeof this.filter === 'function' && this.filter('month', this.monthList) || this.monthList
      return this.monthList;
    },

    // 得到天数日期
    getDaysFn() {
      // 得到当前操作月有多少天
      this.dayList = [];
      const {year: minYear, month: minMonth, dateDay: minDay} = getTimeValue(this.minDate)
      const {year: maxYear, month: maxMonth, dateDay: maxDay} = getTimeValue(this.maxDate)
      // 赋值传进去的日期天数
      let c = 0
      if (this.year >= maxYear && this.month >= maxMonth) {
        c = maxDay
      }
      //得到可循环的最小数
      let d = 1
      let dayCount = new Date(this.year, this.month, c).getDate();
      if (this.year <= minYear && this.month <= minMonth) {
        d = minDay
      }
      for (let i = d; i <= dayCount; i++) {
        this.dayList.push(i);
      }
      this.dayList = this.filter && typeof this.filter === 'function' && this.filter('days', this.dayList) || this.dayList
      return this.dayList;
    },

    // 得到小时
    getHoursFn() {
      this.hoursList = []
      let max = 60
      let min = 0
      if (this.type == 'hours-minutes') {
        max = this.maxHours + 1
        min = this.minHours
      } else {
          const {year: minYear, month: minMonth, dateDay: minDay, hours: minHours} = getTimeValue(this.minDate)
          const {year: maxYear, month: maxMonth, dateDay: maxDay, hours: maxHours} = getTimeValue(this.maxDate)
        
          if (this.year >= maxYear && this.month >= maxMonth && this.days >= maxDay) {
            max = maxHours + 1
          }
          if (this.year <= minYear && this.month <= minMonth && this.days <= minDay) {
            min = minHours
          } 
        }
      for (let i = min; i < max; i++) {
        this.hoursList.push(i);
      }
      this.hoursList = this.filter && typeof this.filter === 'function' && this.filter('hours', this.hoursList) || this.hoursList
      return this.hoursList;
    },
    //得到分钟
    getMinutesFn() {
      this.minutesList = []
      let max = 60
      let min = 0
      if (this.type == 'hours-minutes') {
        if (this.hours >= this.maxHours) {
          max = this.maxMinutes + 1
        }
        if (this.hours <= this.minHours) {
          min = this.minMinutes
        }
      } else {
        const {year: minYear, month: minMonth, dateDay: minDay, hours: minHours, minutes: minMinutes} = getTimeValue(this.minDate)
        const {year: maxYear, month: maxMonth, dateDay: maxDay, hours: maxHours, minutes: maxMinutes} = getTimeValue(this.maxDate)
        if (this.year >= maxYear && this.month >= maxMonth && this.days >= maxDay && this.hours >= maxHours) {
          max = maxMinutes + 1
        }
        if (this.year <= minYear && this.month <= minMonth && this.days <= minDay && this.hours <= minHours) {
          min = minMinutes
        }
      }
      for (let i = min; i < max; i++) {
        this.minutesList.push(i);
      }
      this.minutesList = this.filter && typeof this.filter === 'function' && this.filter('minutes', this.minutesList) || this.minutesList
      return this.minutesList;
    },
    columnChange (type, val) {
      this[type] = val
      obj[type] = this.isAddZero ? this.addZero(val) : val
      const result = {
        'datetime': `${obj.year}-${obj.month}-${obj.days} ${obj.hours}:${obj.minutes}`,
        "year-month-day": `${obj.year}-${obj.month}-${obj.days}`,
        "year-month": `${obj.year}-${obj.month}`,
        "hours-minutes": `${obj.hours}:${obj.minutes}`,
      };
      this.resultStr = result[this.type];
      this.$emit('change', this.resultStr)
    },
    // 确认事件
    onConfirm() {
      this.$emit('confirm', this.resultStr)
    },
    addZero (val) {
      return typeof val === 'number' && (val < 10 ? '0' + val : val) || val
    }
  },
  watch: {
    resultStr () {
      this.getMonthFn()
      this.getDaysFn();
      this.getHoursFn()
      this.getMinutesFn()
    },
  }
};
</script>

<style lang="scss">

.chh-datetime-box {
  background: #fff;
  .chh-datetime-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    .chh-datetime_cancel,
    .chh-datetime_confirm {
      color: #1989fa;
    }
    .chh-datetime-btn {
      padding: 10px 16px;
      font-size: 14px;
      &:active {
        background: #ebedf0;
      }
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: #ebedf0;
      opacity: 0.5;
    }
  }
  .chh-datetime-content {
    position: relative;
    padding: 0px 15px;
    display: flex;
    overflow: hidden;
    .van-picker__mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), 
      hsla(0, 0%, 100%, 0.4)), 
      linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), 
      hsla(0, 0%, 100%, 0.4));
      background-repeat: no-repeat;
      background-position: top, bottom;
      backface-visibility: hidden;
      pointer-events: none;
    }
    .chh-datetime-hairline_bottom {
      position: absolute;
      left: 0;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      z-index: 6;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      pointer-events: none;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
