export default {
  state: {
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
    }
  }
}
