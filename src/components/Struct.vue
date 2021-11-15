<template>
  <div class="lcd-struct">
    <Button type="dashed" @click="visiable = true" long>
      {{ title }}
    </Button>
    <Modal v-model="visiable" title="编辑数据" @on-ok="onOk" width="45%">
      <MonacoEditor
        style="height: 400px"
        v-if="visiable"
        v-model="value"
        language="json"
        theme="vs-dark"
      />
    </Modal>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'

export default {
  name: 'Struct',

  provide: {},

  components: { MonacoEditor },

  filters: {},

  props: {
    title: { type: String, default: '编辑数据' },
    jsonValue: { type: String, default: JSON.stringify({}, null, 2) },
  },

  // 定义属性
  data() {
    return {
      visiable: false,
      value: this.jsonValue,
    }
  },

  // 计算属性，会监听依赖属性值随之变化
  computed: {},

  // 监控data中的数据变化
  watch: {
    jsonValue() {
      this.value = this.jsonValue
    },
  },

  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},

  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  // 生命周期 - 创建之前
  beforeCreate() {},

  // 生命周期 - 挂载之前
  beforeMount() {},

  // 生命周期 - 更新之前
  beforeUpdate() {},

  // 生命周期 - 更新之后
  updated() {},

  // 生命周期 - 销毁之前
  beforeDestroy() {},

  // 生命周期 - 销毁完成
  destroyed() {},

  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},

  // 方法集合
  methods: {
    onOk() {
      if (this.value !== this.jsonValue) {
        this.$Message.success('编辑成功！')
        this.$emit('on-change', this.value)
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
