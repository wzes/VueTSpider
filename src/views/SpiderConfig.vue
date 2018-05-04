<template>
  <div>
    <el-header>
      <h1>TSpider Config</h1>
    </el-header>
    <el-main>
      <el-form label-width="80px" :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="入口">
          <el-input type="textarea" v-model="url"></el-input>
        </el-form-item>
        <el-form-item label="页面类型">
          <el-select v-model="form.pageType" placeholder="请选择">
            <el-option
              v-for="item in pageTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="6">
              <el-button class="add" @click="addRule">添加爬虫规则</el-button>
            </el-col>
          </el-row>
          <div v-for="(rule, index) in form.extractRules" :key="rule.name">
            <el-row>
              <el-col :span="20">
                <el-form class="rule" label-width="80px" :model="rule">
                  <el-form-item label="规则名称">
                    <el-input v-model="rule.name"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-error" @click="removeRule(index)" style="margin-top: 13px; margin-left: 15px"></i>
              </el-col>

            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                <el-button class="add" @click="addItem(index)">添加解析规则</el-button>
              </el-col>
            </el-row>
            <div v-for="(item, itemIndex) in rule.extractItems" :key="item.name">
              <el-form class="item" label-width="80px" :model="item">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="item名称">
                      <el-input v-model="item.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="item类型">
                      <el-select v-model="item.extractType" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row typeof="flex" justify="center">
                  <el-col :span="15">
                    <el-form-item label="Selector">
                      <el-input v-model="item.selector"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <i class="el-icon-error" @click="removeItem(index, itemIndex)" style="margin-top: 13px; margin-left: 15px"></i>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-form>
      <my-dialog>
        <p slot="content">{{ message }}</p>
      </my-dialog>
    </el-main>
    <el-footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" @click="submitTask">提交爬虫任务</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script>
import { submitTask } from '../api/api'
import dialog from '@/views/Dialog'
export default {
  name: 'spider-config',
  data () {
    return {
      ruleCount: 1,
      itemCount: 1,
      message: '',
      url: '',
      form: {
        name: '',
        task_id: '',
        urls: [],
        pageType: '',
        numThreads: 1,
        config: {
          timeout: 10000
        },
        extractRules: [{
          name: 'rule_1',
          extractItems: [{
            name: 'item_1',
            extractType: '',
            selector: ''
          }]
        }]
      },
      options: [{
        value: 'EXTRACT_TEXT',
        label: '文本'
      }, {
        value: 'EXTRACT_LINK',
        label: '链接'
      }, {
        value: 'EXTRACT_IMG',
        label: '图片'
      }, {
        value: 'EXTRACT_FILE',
        label: '文件'
      }],
      pageTypeOptions: [{
        value: 'PAGE_COMMON',
        label: '普通页面'
      }, {
        value: 'PAGE_AJAX',
        label: 'AJAX页面'
      }]
    }
  },
  components: { 'my-dialog': dialog },

  methods: {
    submitTask: function () {
      this.form.urls = this.url.split('\n')
      let params = { data: JSON.stringify(this.form) }
      console.log(params)
      if (this.form.name === '') {
        this.$store.state.dialog.show = true
        this.message = '请输入 Name'
      } else {
        submitTask(params).then(data => {
          console.log(data)
          this.$store.state.spider.task_id = data.content
          this.$store.state.spider.form = this.from
          this.$router.push('/')
        }).catch(error => {
          console.log(error)
        })
      }
    },
    addRule: function () {
      let rule = {
        name: 'rule_' + (this.ruleCount + 1),
        extractItems: [{
          name: 'item_1',
          extractType: '',
          selector: ''
        }]
      }
      this.ruleCount++
      this.form.extractRules.push(rule)
    },
    addItem: function (index) {
      let item = {
        name: 'item_' + (this.itemCount + 1),
        extractType: '',
        selector: ''
      }
      this.itemCount++
      this.form.extractRules[index].extractItems.push(item)
    },
    removeItem: function (index, itemIndex) {
      this.form.extractRules[index].extractItems.splice(itemIndex, 1)
    },
    removeRule: function (index) {
      this.form.extractRules.splice(index, 1)
    }
  }
}
</script>
<style scoped>
  .rule {
    margin-left: 50px;
  }
  .item {
    margin-left: 100px;
  }

  .add {
    display: inline-block;
    margin-bottom: 20px;
  }

</style>
