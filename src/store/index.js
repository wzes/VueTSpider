import Vue from 'vue'
import Vuex from 'vuex'
import dialogStore from '../components/dialog_store.js'
import spiderStore from '../components/spider.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dialog: dialogStore,
    spider: spiderStore
  }
})
