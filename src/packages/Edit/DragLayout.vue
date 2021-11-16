<template>
  <Layout>
    <Sider width="266">
      <slot name="left-aside"></slot>
    </Sider>

    <Layout>
      <Content>
        <Header>
          <slot name="header"></slot>
        </Header>
        <slot name="content"></slot>
      </Content>

      <Sider width="266">
        <slot name="right-aside"></slot>
      </Sider>
    </Layout>
  </Layout>
</template>

<script>
export default {
  name: "DragLayout",

  provide: {},

  components: {},

  filters: {},

  props: {},

  // 定义属性
  data() {
    return {};
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
  methods: {},
};
</script>

<style lang="less" scoped>
.ivu-layout {
  width: 100%;
  height: 100%;
}

.ivu-layout-header {
  display: flex;
  align-items: center;
  padding: 0;
  background: transparent;
  box-sizing: border-box;
}
</style>
