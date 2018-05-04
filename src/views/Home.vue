<template>
  <div>
    <spider/>
  </div>
</template>
<script>
import spider from '@/views/Spider'
export default {
  name: 'home',
  components: { spider }
}
</script>

<style scoped>
  .el-container{
    background-color: rgb(236, 236, 236);
    width: available;
  }

  .el-header{
    background-color: #7e57c2;
    width: auto;
  }

  .h2{
    font-size: 30px;
    color: white;
    display: inline-block;
    padding: 10px 20px;
  }

  .el-footer{
    padding: 20px 0;
    text-align: center;
  }
</style>
