<template>
  <i-form class="grid-form" ref="form" :model="model">
    <p v-if="title" class="grid-form__title">{{ title }}</p>

    <slot />
  </i-form>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'GridForm',

  provide() {
    return { validateField: this.validateField }
  },

  components: {},

  props: {
    model: Object,
    title: String,
    preview: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      uploadTableLoading: false,
    }
  },

  computed: {
    // ...mapGetters(['token']),
    // headers({ token }) {
    //   return {
    //     token: token
    //   }
    // }
  },

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    handleUploadFormatError(file) {
      this.$Message.error(`上传文件${file.name}格式不正确`)
    },

    onUploadTableSuccess(response, file, fileList) {
      const { code, data, message } = response
      if (code !== 200000) {
        this.$Message.error({ duration: 3, content: message })
        this.uploadTableLoading = false
        return
      }
      this.$emit('on-upload-success', data)
      this.uploadTableLoading = false
    },

    resetFields() {
      this.$refs['form'].resetFields()
    },

    validateField(field, callback) {
      return this.$refs['form'].validateField(field, callback)
    },

    validateForm() {
      if (Object.keys(this.model).length === 0) {
        return new Promise((resolve, reject) => {
          resolve(true)
        })
      }
      return this.$refs['form'].validate((valid) => {
        // console.log('valid: ', valid)
        return valid
      })
    },
  },
}
</script>

<style lang="less">
.grid-form {
  // .ivu-input {
  //   border-color: #fff;
  //   &:focus {
  //     border-color: #608cff;
  //   }
  // }

  .ivu-form-item {
    margin: 5px 0 5px 0;
  }

  &__project-code {
    text-align: right;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    color: #3e6eff;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
  }

  &__tools {
    text-align: right;
    padding-bottom: 5px;
  }

  &__upload-table {
    display: inline-block;
  }

  &__tools-btn {
    margin-left: 10px;
  }
}
</style>
