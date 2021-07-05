<template>
<div class="border-box">
  <div class="border-top-left"></div>
  <div class="border-top-right"></div>
  <div class="border-bottom-left"></div>
  <div class="border-bottom-right"></div>
  <div
    v-show="title !== ''"
    class="title">
    {{title}}
  </div>
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'BorderBox',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color: #166799;
$border-style: 0.25rem solid $border-color;
$border-corner-offset: -0.15rem;
.border-box {
  border: 0.1rem solid $border-color;
  border-radius: 0.2rem;
  background-color: #202020cc;
  color: white;
  padding: 0 0.8rem;
  position: relative;
  .title {
    text-align: left;
    height: 2.6rem;
    line-height: 2.6rem;
    padding-left: 0.4rem;
    font-size: 1rem;
    font-weight: bold;
  }
  .content {
    width: 100%;
    height: calc(100% - 3.4rem);
  }
}
.border-top-left,
.border-top-right,
.border-bottom-left,
.border-bottom-right {
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
}
.border-top-left {
  top: $border-corner-offset;
  left: $border-corner-offset;
  border-top: $border-style;
  border-left: $border-style;
}
.border-top-right {
  top: $border-corner-offset;
  right: $border-corner-offset;
  border-top: $border-style;
  border-right: $border-style;
}
.border-bottom-left {
  bottom: $border-corner-offset;
  left: $border-corner-offset;
  border-bottom: $border-style;
  border-left: $border-style;
}
.border-bottom-right {
  bottom: $border-corner-offset;
  right: $border-corner-offset;
  border-bottom: $border-style;
  border-right: $border-style;
}
</style>
