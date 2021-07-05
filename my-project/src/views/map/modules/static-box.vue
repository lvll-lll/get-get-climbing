<template>
<border-box>
  <ul class="static-item">
    <li v-for="item of staticData" :key="item.code">
      <div class="num">{{ item.value }}</div>
      <div class="lable">{{ item.label }}</div>
    </li>
  </ul>
</border-box>
</template>

<script>
import BorderBox from '@/components/border-box'
export default {
  name: 'static-box',
  components: {
    BorderBox
  },
  data () {
    return {
      staticData: [
        {
          code: 'sumWork',
          value: 138,
          label: '总工单'
        },
        {
          code: 'delayWork',
          value: 0,
          label: '超时工单'
        },
        {
          code: 'newWork',
          value: 0,
          label: '新增工单'
        },
        {
          code: 'sumPeople',
          value: 19,
          label: '总人数'
        },
        {
          code: 'livePeople',
          value: 7,
          label: '在线人数'
        },
        {
          code: 'courtNum',
          value: 7,
          label: '台区数'
        },
        {
          code: 'facilityNum',
          value: 7,
          label: '设备数'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.static-item {
  overflow: hidden;
  text-align: center;
  li {
    width: calc(100% / 7);
    height: 100%;
    line-height: 2.2rem;
    float: left;
    padding-top: 2rem;
    .num {
      font-weight: bold;
      font-size: 2rem;
    }
    .lable {
      color: #166799;
      font-size: 1rem;
      font-weight: bold;
    }
  }
}
</style>
