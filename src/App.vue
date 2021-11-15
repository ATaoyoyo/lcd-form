<template>
  <div id="app">
    <Edit v-model="data" @change="onChange" />
  </div>
</template>

<script>
import Edit from './packages/Edit.vue'
import data from '@/data'

export default {
  name: 'App',

  provide: {},

  components: { Edit },

  filters: {},

  props: {},

  // 定义属性
  data() {
    return {
      data: data,
    }
  },

  // 计算属性，会监听依赖属性值随之变化
  computed: {},

  // 监控data中的数据变化
  watch: {},

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
    onChange() {
      console.log('onChange')
    },
  },
}
</script>

<style lang="less">
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .lcd-form-label {
    margin-bottom: 0;
  }
}
</style>
