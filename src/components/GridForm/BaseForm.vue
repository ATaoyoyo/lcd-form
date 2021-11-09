<template>
  <div class="lcd-base-form">
    <div class="lcd-base-label-box">
      <span class="lcd-base-validte">*</span>
      <span class="lcd-base-label">{{ schema.label }}</span>
    </div>
    <div class="lcd-base-components">
      <FormItem :prop="schema.rule.field" :show-message="true">
        <RenderComponents v-bind="schema" />
      </FormItem>
    </div>
  </div>
</template>

<script>
import RenderComponents from "../RenderComponents.vue";
export default {
  name: "BaseForm",

  props: {
    model: Object,
    schema: Object,
  },

  components: { RenderComponents },

  // 定义属性
  data() {
    return {};
  },

  // 计算属性，会监听依赖属性值随之变化
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {},

  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},

  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  beforeCreate() {}, // 生命周期 - 创建之前

  beforeMount() {}, // 生命周期 - 挂载之前

  beforeUpdate() {}, // 生命周期 - 更新之前

  updated() {}, // 生命周期 - 更新之后

  beforeDestroy() {}, // 生命周期 - 销毁之前

  destroyed() {}, // 生命周期 - 销毁完成

  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
.lcd-base-form {
  display: flex;

  .lcd-base-label-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 175px;
    font-size: 14px;
    color: #333;
    background-color: #f2f2f2;

    .lcd-base-validte {
      margin-right: 3px;
      font-size: 14px;
      color: #f20;
    }
  }

  .lcd-base-components {
    flex: 1;
    padding: 5px 10px;
    .ivu-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
