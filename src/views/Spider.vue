<template>
  <el-row>
    <el-col :span="24">
      <h4>输入爬虫配置:</h4>
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="config"/>
    </el-col>
    <el-row>
      <el-col span="11">
        <el-button class="el-alert" @click="submitTask" style="margin-top: 50px">
          提交
        </el-button>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-button class="el-alert" @click="configTask" style="margin-top: 50px">
          配置
        </el-button>
      </el-col>
    </el-row>

    <el-col :span="24">
      <h4>输入项目ID:</h4>
      <el-input type="text" v-model="task_id"
                placeholder="请输入内容"/>
    </el-col>
    <el-col :span="24">
      <el-button class="el-alert" @click="queryTask" style="margin-top: 50px">
        查询
      </el-button>
    </el-col>
    <el-col :span="24">
      <el-table
        :data=data
        style="width: 100%; text-align: left"
        max-height="500">
        <el-table-column
          prop="url"
          label="url"
          width="900">
        </el-table-column>
        <el-table-column
          prop="state"
          label="state"
          width="220">
        </el-table-column>
        <el-table-column
          prop="code"
          label="code"
          width="320">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <el-button class="el-alert" @click="downloadTask" style="margin-top: 50px">
        下载
      </el-button>
    </el-col>
    <el-col :span="24">
      <my-dialog>
        <p slot="content">{{ message }}</p>
      </my-dialog>
    </el-col>
  </el-row>
</template>

<script>
import { submitTask, queryTask } from '../api/api'
import dialog from '@/views/Dialog'
export default {
  name: 'spider',

  data () {
    return {
      config: '',
      task_id: '',
      data: [],
      message: ''
    }
  },

  components: { 'my-dialog': dialog },

  // created: {
  //   start: function () {
  //     this.config = JSON.stringify(this.$store.state.spider.form)
  //   }
  // },
  methods: {
    submitTask: function () {
      let params = {data: this.config}
      if (this.config === '') {
        this.$store.state.dialog.show = true
        this.message = '请输入 Task Config'
      } else {
        submitTask(params).then(data => {
          console.log(data)
          this.task_id = data.content
        }).catch(error => {
          console.log(error)
        })
      }
    },

    queryTask: function () {
      if (this.task_id === '') {
        this.$store.state.dialog.show = true
        this.message = '请输入 Task Id'
      } else {
        queryTask(this.task_id).then(data => {
          this.data = data.content
          console.log(data)
        }).catch(error => {
          console.log(error)
        })
      }
    },

    downloadTask: function () {
      if (this.task_id === '') {
        this.$store.state.dialog.show = true
        this.message = '请输入 Task Id'
      } else {
        window.open('http://localhost:8088/task/result/' + this.task_id + '?token=tspider', '_blank')
      }
    },

    configTask: function () {
      this.$router.push('/config')
    }
  }
}
</script>

<style scoped>

</style>
