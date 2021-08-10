<template>
<div class="app-header">
  营销服务监控
</div>
</template>

<script>
export default {
  name: 'static-box',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  font-size: 1.6rem;
  letter-spacing: 0.2rem;
  text-align: center;
  width: 26rem;
  height: 2rem;
  line-height: 2rem;
  position: absolute;
  // top: 1.2rem;
  top: 5rem;
  left: calc(50% - 13rem);
  z-index: 99;
  color: white;
  text-shadow: 0 0 0.3rem #166799;
  padding-bottom: 0.6rem;
  border-bottom: 0.15rem solid #166799;
  &:before {
    content: " ";
    position: absolute;
    bottom: -0.5rem;
    width: 70%;
    height: 0.15rem;
    left: 15%;
    background: #166799;
  }
  &:after {
    content: " ";
    position: absolute;
    bottom: -0.85rem;
    width: 40%;
    height: 0.15rem;
    left: 30%;
    background: #166799;
  }
}
</style>
