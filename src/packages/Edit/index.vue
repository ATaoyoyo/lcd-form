<template>
  <div class="lcd-edit">
    <DragLayout>
      <template v-slot:left-aside>
        <MenuAside :menus="menus" />
      </template>

      <template v-slot:header>
        <DragHeader
          :title="gridForm.formTitle"
          @on-make-excel-json="onMakeExcelJson"
          @on-create-json="onCreateJson"
          @on-preview="onPreview"
          @on-clean="onRemove"
        />
      </template>

      <template v-slot:content>
        <DragWrapper
          :unique-id="uniqueId"
          :wrapper-form="wrapperForm"
          @on-choose="onChoose"
          @on-delete="onDelete"
        />
      </template>

      <template v-slot:right-aside>
        <ConfigAside
          :base-form="baseForm"
          :prop-form="propForm"
          :active-schema="activeSchema"
          @on-refresh="onRefresh"
          @on-change="onChange"
        />
      </template>
    </DragLayout>

    <Modal v-model="visible" title="表单预览" width="75%">
      <div class="preview-wrapper">
        <div class="preview-wrapper-content">
          <GridForm :title="gridForm.formTitle" :model="gridForm.formModel">
            <GridFormItem
              v-for="(schema, index) in gridForm.formSchema"
              :key="index"
              :schema="schema"
              :model="gridForm.formModel"
            />
          </GridForm>
        </div>
      </div>
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
import MenuAside from '@/packages/Edit/MenuAside'
import DragHeader from '@/packages/Edit/DragHeader'
import DragLayout from '@/packages/Edit/DragLayout'
import DragWrapper from '@/packages/Edit/DragWrapper'
import ConfigAside from '@/packages/Edit/ConfigAside'

import schema from '@/config/schema'
import { typeKeyMap, valueKeyMap } from '@/config/keyMap'

import MonacoEditor from 'vue-monaco'

export default {
  name: 'Edit',

  provide: {},

  components: {
    ConfigAside,
    DragWrapper,
    DragLayout,
    DragHeader,
    MenuAside,
    GridForm,
    GridFormItem,
    MonacoEditor,
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
    onChoose(schema) {
      this.uniqueId = schema.field
      this.makeSchemaRule(schema)
    },

    onDelete(schema, schemaIndex, columnIndex, elIndex) {
      const { wrapperForm } = this

      // 删除 row 中的组件
      if (schemaIndex >= 0) {
        this.wrapperForm.schema[schemaIndex].columns[columnIndex].list.splice(elIndex, 1)

        return
      }

      const index = wrapperForm.schema.findIndex(({ field }) => field === schema.field)
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

    onMakeExcelJson(formTableValue) {
      this.gridForm = formTableValue
      this.visible = true
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

<style lang="less" scoped>
.preview-wrapper {
  height: 350px;
  overflow: hidden;

  &-content {
    height: 100%;
    overflow: auto;
  }
}
</style>
