<template>
  <div class="lcd-config-aside">
    <div style="height: 44px; line-height: 44px">
      <Button type="success" long @click="$emit('on-refresh')">刷新配置</Button>
    </div>

    <template v-if="activeSchema">
      <Divider>基础配置</Divider>
      <Form>
        <FormItem
          v-for="(prop, index) in baseForm.schema"
          :key="index"
          :label="prop.title"
          :prop="prop.field"
        >
          <render-component
            :schema="prop"
            @change="(schema, val) => $emit('on-change', schema, val)"
          />
        </FormItem>
      </Form>

      <Divider>属性配置</Divider>
      <Form>
        <Form label-position="top">
          <FormItem
            v-for="(prop, index) in propForm.schema"
            :key="index"
            :label="prop.title"
            :prop="prop.field"
          >
            <render-component
              :schema="prop"
              @change="(schema, val) => $emit('on-change', schema, val)"
            />
          </FormItem>
        </Form>
      </Form>

      <!--              <Divider>验证规则</Divider>-->
    </template>

    <div v-else class="lcd-right-aside-empty">
      <div class="lcd-icon">
        <Icon type="md-easel" />
      </div>
      <p>请选择一个组件进行配置</p>
    </div>
  </div>
</template>

<script>
import RenderComponent from '@/components/RenderComponent'
import Struct from '@/components/Struct'

export default {
  name: 'ConfigAside',

  provide: {},

  components: { RenderComponent, Struct },

  filters: {},

  props: {
    activeSchema: Object,

    baseForm: Object,

    propForm: Object,
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
.lcd-config-aside {
  padding: 10px;
  height: 100%;
  background: #fff;
  overflow: auto;

  .lcd-right-aside-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    height: 250px;
    border: 1px dashed rgba(0, 0, 0, 0.2);

    .lcd-icon {
      color: #999;
      font-size: 35px;
    }

    font-size: 18px;
    color: #999;
  }

  /deep/ .ivu-form .ivu-form-item-label {
    text-align: left;
  }
}
</style>
