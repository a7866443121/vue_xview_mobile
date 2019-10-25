<template>
  <div class="customer-service-rating">
    {{ 
      `${label}${supportStaffAverageScore !== null ? supportStaffAverageScore +'分 ': ''}${supportStaffScoreTimes !== null ? supportStaffScoreTimes +'次': ''}`
    }}
  </div>
</template>

<script>


export default {
  name: 'customer-service-rating',
  props: {
    //客服评价分数
    supportStaffAverageScore: {
      type: Number,
      default: null
    },
    //客服评价次数
    supportStaffScoreTimes: {
      type: Number,
      default: null
    },
    //表单中传''
    label: {
      type: String,
      default: '客服评分：'
    }
  },
}
</script>
