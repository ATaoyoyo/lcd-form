<template>
  <Form class="lcd-grid-form" ref="form" :model="model">
    <div class="lcd-grid-form-title">
      <div class="lcd-grid-form-title-text">
        <Input v-model="title" />
      </div>
      <div class="lcd-grid-form-title-btn">
        <Button type="primary" icon="md-eye">预览</Button>
        <Button type="error" icon="md-trash" @click="draggList = []">
          清空
        </Button>
      </div>
    </div>
    <div class="lcd-drid-form-pane" v-for="item in rule" :key="item.id">
      <draggable
        class="draggable-pane"
        tag="Col"
        direction="vertical"
        ghostClass="ghost"
        group="default"
        :animation="150"
        :emptyInsertThreshold="0"
        :list="draggList"
      >
        <DragTool
          v-for="cpn in draggList"
          :key="cpn.field"
          :unique="unique"
          :active="unique === cpn.field"
          @active="onActive(cpn)"
          @add="onDragAdd(cpn)"
          @copy="onDragCopy(cpn)"
          @delete="onDragDelete(cpn)"
        >
          <BaseForm :schema="cpn" :model="model" />
        </DragTool>
      </draggable>
    </div>
  </Form>
</template>

<script>
import draggable from "vuedraggable";
import DragTool from "../DragTool.vue";
import BaseForm from "./BaseForm.vue";

export default {
  name: "GridForm",

  provide: {},

  components: { DragTool, BaseForm, draggable },

  filters: {},

  props: {
    title: String,
    model: Object,
    schema: Object,
    rule: Array,
  },

  // 定义属性
  data() {
    return {
      unique: "",
      cpnList: [],
      draggList: [],
    };
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
    onActive(cpn) {
      this.unique = cpn.field;
    },

    onDragAdd() {},

    onDragCopy() {},

    onDragChild() {},

    onDragDelete() {},
  },
};
</script>

<style lang="less" scoped>
.lcd-grid-form {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;

  .lcd-grid-form-title {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;

    &-text {
      flex: 1;
      margin-right: 10px;
    }

    &-btn {
      button {
        margin-left: 5px;
      }
    }
  }

  .lcd-drid-form-pane {
    height: calc(100% - 70px);
  }

  .draggable-pane {
    margin-top: 10px;
    height: 100%;
    background-color: #fff;
  }
}
</style>
