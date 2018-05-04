<template>
  <el-dialog
    title="Warning"
    :visible.sync="$store.state.dialog.show"
    width="30%"
    :before-close="handleClose">
    <slot name="content">This is a message</slot>
    <span slot="footer" class="dialog-footer">
    <el-button @click="$store.state.dialog.show = false">Cancel</el-button>
    <el-button type="primary" @click="$store.state.dialog.show = false">Confirm</el-button>
  </span>
  </el-dialog>

</template>

<script>
export default {
  name: 'my-dialog',
  methods: {
    handleClose (done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
