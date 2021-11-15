<template>
  <div class="lcd-edit">
    <Layout>
      <Sider width="266">
        <div class="lcd-left-aside">
          <div class="lcd-left-aside-content" v-for="menu in menus" :key="menu.title">
            <h3 class="title">{{ menu.title }}</h3>

            <div class="lcd-left-aside-content-item">
              <draggable
                class="lcd-draggable"
                :group="{ name: 'default', pull: 'clone', put: false }"
                :sort="false"
                :list="menu.list"
                :clone="onClone"
              >
                <div class="draggable-schema" v-for="schema in menu.list" :key="schema.title">
                  <div class="lcd-draggable-icon">
                    <i class="lcd-icon" :class="schema.icon" />
                  </div>
                  <div class="lcd-draggable-label">
                    <span>{{ schema.label }}</span>
                  </div>
                </div>
              </draggable>
            </div>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content>
          <Header>
            <div class="lcd-header">
              <div class="lcd-header-form-title">
                <Input v-model="gridForm.formTitle" placeholder="请输入标题" />
              </div>
              <div class="lcd-header-opt">
                <Button type="primary" @click="onCreateJson">生成JSON</Button>
                <Button type="info" @click="onPreview">预览</Button>
                <Button type="error" @click="onRemove">清空</Button>
              </div>
            </div>
          </Header>
          <div class="lcd-wrapper">
            <Row style="display: block; height: 100%">
              <Form>
                <draggable
                  class="lcd-draggable-wrapper"
                  direction="vertical"
                  ghostClass="ghost"
                  group="default"
                  tag="Col"
                  handle=".lcd-dragg-tool-move"
                  :animation="150"
                  :emptyInsertThreshold="0"
                  :list="wrapperForm.schema"
                >
                  <dragg-tool
                    v-for="schema in wrapperForm.schema"
                    :key="schema.field"
                    :active="uniqueId === schema.field"
                    @active="onChoose(schema)"
                    @move="onMove(schema)"
                    @delete="onDelete(schema)"
                  >
                    <div class="lcd-form-item">
                      <p class="lcd-form-label" v-if="schema.type !== 'formTable'">
                        <span>{{ schema.title }}</span>
                      </p>
                      <FormItem :prop="schema.prop">
                        <render-component :schema="schema" />
                      </FormItem>
                    </div>
                  </dragg-tool>
                </draggable>
              </Form>
            </Row>
          </div>
        </Content>
        <Sider width="266">
          <div class="lcd-right-aside">
            <div style="height: 44px; line-height: 44px">
              <Button type="success" long @click="onRefresh">刷新配置</Button>
            </div>

            <template v-if="activeSchema">
              <Divider>基础配置</Divider>
              <Form label-position="top">
                <FormItem
                  v-for="(prop, index) in baseForm.schema"
                  :key="index"
                  :label="prop.title"
                  :prop="prop.field"
                >
                  <render-component :schema="prop" @change="onChange" />
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
                    <render-component :schema="prop" @change="onChange" />
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
        </Sider>
      </Layout>
    </Layout>

    <Modal v-model="visible" title="表单预览" width="75%">
      <GridForm :title="gridForm.formTitle" :model="gridForm.formModel">
        <GridFormItem
          v-for="(schema, index) in gridForm.formSchema"
          :key="index"
          :schema="schema"
          :model="gridForm.formModel"
        />
      </GridForm>
    </Modal>

    <Modal v-model="jsonVisible" title="表单JSON" width="75%">
      <MonacoEditor
        style="height: 400px"
        v-if="jsonVisible"
        v-model="gridFormJson"
        language="json"
        theme="vs-dark"
      />
    </Modal>
  </div>
</template>

<script>
import { GridForm, GridFormItem } from '@/packages/GridForm'
import FormTable from '@/packages/GridForm/GridFormItem/GridFormTable'
import RenderComponent from '@/components/RenderComponent.vue'
import DraggTool from '@/components/DraggTool.vue'
import Struct from '@/components/Struct'

import schema from '@/config/schema'
import { typeKeyMap, valueKeyMap } from '@/config/keyMap'

import draggable from 'vuedraggable'
import MonacoEditor from 'vue-monaco'

export default {
  name: 'Edit',

  provide: {},

  components: {
    RenderComponent,
    DraggTool,
    GridForm,
    GridFormItem,
    FormTable,
    draggable,
    MonacoEditor,
    Struct,
  },

  filters: {},

  props: {},

  model: {},

  // 定义属性
  data() {
    return {
      uniqueId: null,
      menus: schema,
      wrapperForm: { model: {}, schema: [] },
      baseForm: {},
      propForm: {},
      activeSchema: null,
      visible: false,
      jsonVisible: false,
      gridFormJson: '{}',
      gridForm: { formTitle: '', formModel: {}, formSchema: [] },
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
    onClone(value) {
      // vuedraggable clone模式下，两边数据引用的是同一个地址，后续使用里面的数据会用莫名其妙的bug
      const data = JSON.parse(JSON.stringify(value))
      const schema = value.rule()

      if (schema.type === 'formTable') {
        schema.props.model = { [schema.field]: schema.props.data }
        schema.props.schema = {
          field: schema.field,
          columns: schema.props.columns,
        }
      }

      return Object.assign(data, {
        ...schema,
        schema,
        configProps: value.props(),
      })
    },

    onChoose(schema) {
      this.uniqueId = schema.field
      this.makeSchemaRule(schema)
    },

    onMove(schema) {
      console.log(schema)
    },

    onDelete(schema) {
      const index = this.wrapperForm.schema.findIndex(({ field }) => field === schema.field)
      this.wrapperForm.schema.splice(index, 1)
      this.baseForm = {}
      this.propForm = {}
      this.activeSchema = null
    },

    onChange(schema, value) {
      this.updateBaseRule(schema, value)
      this.updatePropRule(schema, value)
    },

    onRefresh() {
      if (!this.activeSchema) {
        this.$Message.warning('请选择一个组件！')
        return
      }
      const { field } = this.activeSchema
      const index = this.wrapperForm.schema.findIndex((schema) => schema.field === field)
      if (index !== -1) this.wrapperForm.schema.splice(index, 1, this.activeSchema)
    },

    onRemove() {
      this.wrapperForm = { model: {}, schema: [] }
      this.baseForm = {}
      this.propForm = {}
      this.activeSchema = null
    },

    onPreview() {
      this.onCreateJson('preview')
      this.visible = true
    },

    onCreateJson(type = 'create') {
      this.gridForm.formModel = {}

      const { schema } = this.wrapperForm
      const schemas = schema.map((item) => {
        this.gridForm.formModel[item.field] = valueKeyMap[item.type] || ''

        if (item.type === 'formTable') {
          this.gridForm.formModel[item.field] = item.props.data
          return {
            label: item.title,
            type: typeKeyMap[item.type] || item.type,
            field: item.field,
            props: { border: true },
            columns: item.props.columns,
            validate: item.validate || [],
          }
        }

        return {
          label: item.title,
          type: typeKeyMap[item.type] || item.type,
          field: item.field,
          span: 24,
          props: item.props,
          options: item.options || [],
          validate: item.validate || [],
        }
      })
      this.gridForm.formSchema = [{ category: '', children: schemas }]

      this.gridFormJson = JSON.stringify(this.gridForm, null, 2)

      if (type === 'preview') return

      this.jsonVisible = true
    },

    makeSchemaRule(schema) {
      this.baseForm.schema = [
        { type: 'input', title: '字段ID', field: 'field', value: schema.field },
        { type: 'input', title: '字段名称', field: 'name', value: schema.title },
      ]
      this.propForm.schema = schema.configProps

      this.activeSchema = schema
    },

    updateBaseRule(schema, value) {
      const { field } = schema
      if (field === 'name') {
        this.activeSchema.title = value
      } else if (field === 'field') {
        this.activeSchema.field = value
      }
      this.onRefresh()
    },

    updatePropRule(schema, value) {
      if (schema.type === 'struct') {
        this.activeSchema.options = JSON.parse(value)
      }

      this.activeSchema.props[schema.field] = value
      this.activeSchema.configProps.forEach((item) => {
        if (item.field === schema.field) {
          item.value = value

          if (item.type === 'struct') {
            item.props.jsonValue = value
          }
        }
      })
      this.onRefresh()
    },
  },
}
</script>

<style lang="less" scoped>
.lcd-edit {
  width: 100%;
  height: 100%;

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

  .lcd-left-aside {
    height: 100%;
    background: #fff;
    overflow: auto;

    .lcd-left-aside-content {
      .title {
        padding: 10px;
      }

      &-item {
        padding: 0 10px;

        .lcd-draggable {
          .draggable-schema {
            display: flex;
            align-items: center;
            height: 65px;
            border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              color: #fff;
              background-color: rgb(40, 95, 212);
            }

            .lcd-draggable-icon {
              margin: 0 20px 0 50px;

              .lcd-icon {
                font-size: 30px;
              }
            }
          }
        }
      }
    }
  }

  .lcd-right-aside {
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
  }

  .lcd-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    background-color: #fff;

    &-form-title {
      flex: 1;
    }

    &-opt {
      button {
        margin: 0 5px;
      }
    }
  }

  .lcd-wrapper {
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
}
</style>
