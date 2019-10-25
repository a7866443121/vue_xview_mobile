/**
 * 订单业务
 * codeName => 业务类型，value => 订单类型, valueName => 订单类型名称
 */
const ORDER_BIZ = {
  ROAD_ASSISTANCE: {
    codeName: '道路救援',
    value: 'ROAD', 
    valueName: '救援'
  },
  CAR_BEAUTY: {
    codeName: '美容',
    value: 'REPAIR',
    valueName: '到店'
  }, 
  CAR_MAINTENANCE: {
    codeName: '保养',
    value: 'REPAIR', 
    valueName: '到店'
  },
  CAR_REPAIR: {
    codeName: '维修',
    value: 'REPAIR', 
    valueName: '到店'
  },
  CAR_WASH: {
    codeName: '洗车',
    value: 'REPAIR', 
    valueName: '到店'
  },
  DESIGNATED_DRIVING: {
    codeName: '代驾',
    value: 'DRIVING', 
    valueName: '代驾'
  },
  MOT: {
    codeName: '年检代办',
    value: 'MOT', 
    valueName: '年检代办',
  },
  SPARE_CAR: {
    codeName: '代步车',
    value: 'SPARECAR', 
    valueName: '代步车',
  }
}

// 腾讯地图
const ICON = {
  1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAtFBMVEUAAAAAc7wAc7wAc7wAc7wAc7wAc7wAc7z5/P0Jd74UfcH8/f4Jd77+/v8Id74Ac7zu9vvc7Pbo8vnJ4fHN5PIHdr5mq9fq8/n1+vzg7vfu9vvT5/PP5fLU5/Tq8/nb6/bk8Pinz+ir0emZx+Sp0Oi62e3O5PI1kMo9lMz7/f4AnP////8cp/+U1v+G0P9Muv8Pov/2/P8srf8Fnv/h9P/u+P/t+P/b8f/3/P81sf8nrP8Mof/EiZLUAAAAKnRSTlMABAwSJwgfFvEjGe03+0Mx06qkpG08KNnOxbm1tLKelY+Gg39zaF5NQ/C2YA+kAAABr0lEQVQ4y82U2XKDMAxFW2wMBhOafd/XErKSpUn+/78qMcEO63Tal943W2euxrKkt/+jd6liStc0EkrTdGDzMWsxaNmOY7cGCysPBawxstdS9qgBaIadRmpPTKI1oklTxVmVdUoVK0kC1wlD583ODx733eYcHjtAxjkj9Pva7r2n9ttD6Gkgqd5Banh7OnovOp7wrkbgRcqwYSPnezH5SNoNsJSGxhDz3ryEbph9aIBlZMjRcOultEVLLi11MoeLyz4N7i8QmBNdlqYM542XoQ0EylCiJ8g+4LzLAncQ+GARSLgJZz8L9CFgchKB1IFzkAUGEHBoHHz8BMTU99zUL2DxYxTIi8vDiSzPrKjgMybraInP/C80hexJndAq3ByOSe6ITVGl+IVR7hW++5pssysariCzajM6WSOZ0bgTim2mLN0+3h5So9B3lSFaEi7aargCPxqutuAwCrHhovXuOqVuncrhUqQYm3HMHAvJSRBI7i6r5gtWXbrcyFoVhFFRmvaapuOYzd60JCgjwGUtKYNRV9RLoLpwKTNgSeWtPWIxTkGcWQTX3l8WaXo1/1Lflg56VRNj6xkAAAAASUVORK5CYII=',
}

export {
  ORDER_BIZ,
  ICON
}