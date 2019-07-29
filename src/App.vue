<template>
  <div id="myApp">
    <!-- 这是根组件,以后别的组件都在这里挖坑 -->
    <!-- <p>项目如何开始</p> -->
    <!-- 挖坑,将引入的单组件进行页面渲染 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'myApp'
}
</script>

<style>

</style>
