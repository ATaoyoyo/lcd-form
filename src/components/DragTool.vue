<template>
  <div class="lcd-drag-tool" :class="{ active: active }" @click.stop="$emit('active')">
    <template v-if="active">
      <div class="lcd-drag-tool-move tool" @click="$emit('move')">
        <Icon type="md-move" />
      </div>
      <div class="lcd-drag-tool-copy tool" @click="$emit('copy')">
        <Icon type="md-albums" />
      </div>
      <div
        class="lcd-drag-tool-link tool"
        v-if="schema.active && schema.active.type === 'row'"
        @click="$emit('link')"
      >
        <Icon type="md-link" />
      </div>
      <div class="lcd-drag-tool-delete tool" @click="$emit('delete')">
        <Icon type="md-trash" />
      </div>
    </template>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DragTool',

  provide: {},

  inject: ['schema'],

  components: {},

  filters: {},

  props: {
    active: Boolean,
  },

  // 定义属性
  data() {
    return {}
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
}
</script>

<style lang="less" scoped>
.lcd-drag-tool {
  position: relative;
  margin: 0 2px 6px 2px;
  padding: 1px;
  outline: 1px dashed rgb(40, 95, 212);
  box-sizing: border-box;

  &.active {
    outline: 2px solid rgb(40, 95, 212);
  }

  .tool {
    position: absolute;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    background-color: rgb(40, 95, 212);
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    cursor: pointer;
    z-index: 99;
  }

  &-move {
    left: 0;
    top: 0;

    &:hover {
      cursor: move;
    }
  }

  &-copy {
    right: 20px;
    bottom: 0;
  }

  &-link {
    right: 40px;
    bottom: 0;
  }

  &-delete {
    right: 0;
    bottom: 0;
    background-color: #ed4014 !important;
  }
}
</style>
