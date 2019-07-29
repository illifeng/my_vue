<template>
  <div class="orders">
      <p>{{msg}}</p>
    <el-calendar v-model="value"></el-calendar>
  </div>
</template>
<script>
export default {
    data(){
         return {
        value: new Date(),
        msg:'今天是个好日子'
      }
    }
};
</script>
<style lang="less" scoped>
</style>
