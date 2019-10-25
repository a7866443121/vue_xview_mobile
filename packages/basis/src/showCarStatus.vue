<template>
  <div class="components-showCarStatus">
    <div v-if="isdefaultEmpty" class="car-box">
      <div @click="$router.push({ path: './vehicle' })" class="no-car">
        <van-icon name="add-o" size="24px" />请添加车辆
      </div>
    </div>
    <div v-else class="car-box" @click="onSelecePlate">
      <div v-if="activeCar.brandLogo" class="logo" :style="{background: `url(${baseURL + '/pic/' + activeCar.brandLogo}) center center / cover no-repeat`}"></div>
      <div v-else class="logo detault"></div>
      <div class="info">
        <div class="brand">{{activeCar.seriesName}}</div>
        <div class="number">{{activeCar.plateNumber}}</div>
      </div>
      <div class="right">
        更换车辆<van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import commonSelectCar from '@/views/common/selectCar'
export default {
  props: {
    isRefreh: Boolean
  },
  computed: {
    isdefaultEmpty () {
      return this.$plugins.isEmptyObject(this.activeCar)
    },
    ...mapGetters(['getDefaultCar'])
  },
  data() {
    return {
      baseURL: window.CHH.IMG_URL,
      activeCar: {}
    }
  },
  watch: {
    isRefreh () {
      this.init()
    }
  },
  methods: {
    // 选择车辆
    init () {
      this.$checkDefaultCar(() => {
        this.activeCar = this.getDefaultCar
        this.$emit('on-change', this.activeCar)
        })
    },
    onSelecePlate () {
      this.$popup(commonSelectCar, this.activeCar).then(res => {
        this.activeCar = res
        this.$emit('on-change', this.activeCar)
      }).catch(() => {
      })
    }
  },
}
</script>

<style lang="scss">
.components-showCarStatus {
  .car-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 15px;
    height: 110px;
    border-radius: 8px;
    background: url('../../../assets/img/annual/bg@3x.png') center center / cover no-repeat;
    overflow: hidden;
    color: #fff;
    .van-icon {
      line-height: initial;
    }
    .no-car {
      display: flex;
      align-items: center;
      font-size: 18px;
      .van-icon {
        margin-right: 5px;
      }
    }
    .logo {
      width: 50px;
      height: 50px;
      margin: 0 15px;
      border-radius: 50%;
      overflow: hidden;
      &.detault {
        background: url('../../../assets/img/icon-default-car@3x.png') center center / cover no-repeat;
      }
    }
    .info {
      flex: 1;
      overflow: hidden;
      .brand {
        margin-bottom: 5px;
        font-size: 15px;
      }
      .number {
        font-size: 13px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      margin-right: 15px;
      font-size: 14px;
      .van-icon {
        margin-left: 5px;
      }
    }
  }
}
</style>