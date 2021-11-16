<template>
  <div class="lcd-drag-wrapper">
    <Row style="display: block; height: 100%">
      <Form>
        <draggable
          class="lcd-draggable-wrapper"
          direction="vertical"
          ghostClass="ghost"
          group="default"
          tag="Col"
          handle=".lcd-drag-tool-move"
          :animation="150"
          :emptyInsertThreshold="0"
          :list="wrapperForm.schema"
        >
          <drag-tool
            v-for="schema in wrapperForm.schema"
            :key="schema.field"
            :active="uniqueId === schema.field"
            @active="$emit('on-choose', schema)"
            @move="$emit('on-move', schema)"
            @delete="$emit('on-delete', schema)"
          >
            <div class="lcd-form-item">
              <p class="lcd-form-label" v-if="schema.type !== 'formTable'">
                <span>{{ schema.title }}</span>
              </p>
              <FormItem :prop="schema.prop">
                <render-component :schema="schema" />
              </FormItem>
            </div>
          </drag-tool>
        </draggable>
      </Form>
    </Row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import dragTool from '@/components/DragTool'
import Struct from '@/components/Struct'
import RenderComponent from '@/components/RenderComponent'
import FormTable from '@/packages/GridForm/GridFormItem/GridFormTable'

export default {
  name: 'DragWrapper',

  provide: {},

  components: { draggable, dragTool, RenderComponent, FormTable ,Struct},

  filters: {},

  props: {
    wrapperForm: Object,
    uniqueId: String,
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
.lcd-drag-wrapper {
  margin: 10px;
  height: calc(100% - 84px);
  background-color: #fff;
  overflow: auto;

  .ivu-row,
  .ivu-form {
    height: 100%;
  }

  .lcd-draggable-wrapper {
    height: 100%;

    .lcd-form-item {
      display: flex;
      align-items: center;
      margin-bottom: 2px;
      padding: 2px;
      width: 100%;
      // border: 1px dashed rgb(40, 95, 212);
      box-sizing: border-box;

      &.active {
        border: 1px solid rgb(40, 95, 212);
      }

      .lcd-form-label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 130px;
        height: 40px;
        background-color: #f0f0f0;
      }

      .ivu-form-item {
        flex: 1;
        padding: 5px 10px;
        margin: 0;
        box-sizing: border-box;
      }
    }
  }
}
</style>
