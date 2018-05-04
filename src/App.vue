<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1 style="color: white">TSpider</h1>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>TSpider ©2018 Created by Xuantang Cun</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif
}

.el-container{
  background-color: rgb(236, 236, 236);
  width: available;
}

.el-header{
  background-color: #7e57c2;
  width: auto;
}

.h1{
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
