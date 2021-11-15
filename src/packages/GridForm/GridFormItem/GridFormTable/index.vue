<template>
  <div class="grid-form-table">
    <Table
      :class="[
        'grid-form-table__table',
        preview ? '' : 'grid-form-table__table_medium',
      ]"
      :columns="columns"
      :data="model[schema.field]"
      v-bind="schema.props"
      :span-method="schema.spans && spanMethod"
    />
  </div>
</template>

<script>
export default {
  name: 'GridFormTable',

  components: {},

  props: {
    model: Object,
    schema: Object,
    preview: Boolean,
  },

  data() {
    return {}
  },

  computed: {
    columns() {
      const { columns, field } = this.schema
      const model = this.model
      const _columns = this.generateColumns(columns, field, model)

      return Object.freeze(_columns)
    },
  },

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    generateColumns(columns, field, model) {
      return columns.map((column) => {
        const isCustomize = column.customize
        const isCustomizeHeader = column.customizeHeader
        const hasChild = column.children

        if (hasChild) {
          column.children = this.generateColumns(column.children, field, model)
        }

        if (isCustomize) {
          column.render = this.preview
            ? null
            : this.getColumnRender(model, field, column)
        }

        if (isCustomizeHeader) {
          column.renderHeader = this.getColumnHeaderRender(column)
        }

        // delete column.customize
        return column
      })
    },

    getColumnHeaderRender(column) {
      const { title, customizeHeader, customize } = column
      const isRequired =
        customize &&
        customize.validate &&
        customize.validate.find(({ required }) => required === true)
      const { align } = customizeHeader
      return (h, { column, index }) => {
        return isRequired
          ? h('span', {}, [
              h('span', { style: { color: 'red', fontSize: '14px' } }, ' * '),
              h('span', {}, title),
            ])
          : h('span', {}, title)
      }
    },

    getColumnRender(model, field, column) {
      const { key, customize } = column
      const { type, props, validate, keys } = customize
      const _model = model[field]
      return (h, { row, column, index }) => {
        const { _type: dataType, _range: dataRange, _keys: dataKeys } = row
        let _row = _model[index]
        let temp = 0
        return h(
          'FormItem',
          {
            props: {
              label: '',
              prop: `${field}.${index}.${key}`,
              rules: validate,
              labelwidth: 0,
            },
          },
          dataType === 'sub-sum'
            ? [
                h('p', [
                  (_row[key] = this.formatNumberAccuracy(
                    dataRange
                      .map((index) => _model[index][key])
                      .reduce((a, b) => a + b)
                  )),
                ]),
              ]
            : [
                type === 'number'
                  ? h('InputNumber', {
                      props: { ...props, value: row[key] },
                      style: { width: '100%' },
                      on: { input: (val) => (_row[key] = val) },
                    })
                  : type === 'text'
                  ? h('Input', {
                      props: { ...props, value: row[key] },
                      on: { input: (val) => (_row[key] = val.trim()) },
                    })
                  : type === 'sum-number'
                  ? h('p', [
                      (_row[key] = this.formatNumberAccuracy(
                        keys.map((key) => _row[key]).reduce((a, b) => a + b)
                      )),
                    ])
                  : type === 'subtract-number'
                  ? h('p', [
                      (_row[key] = this.formatNumberAccuracy(
                        keys.map((key) => _row[key]).reduce((a, b) => a - b)
                      )),
                    ])
                  : h('p'),
              ]
        )
      }
    },

    spanMethod({ row, column, rowIndex, columnIndex }) {
      const { spans } = this.schema
      if (spans.length) {
        for (let index = 0; index < spans.length; index++) {
          const {
            rowIndex: _rowIndex,
            columnIndex: _columnIndex,
            rowspan,
            colspan,
          } = spans[index]
          if (rowIndex === _rowIndex && columnIndex === _columnIndex) {
            return [rowspan, colspan]
          }
        }
      }
    },

    formatNumberAccuracy(number, length = 4) {
      return Number.isInteger(number) ? number : Number(number.toFixed(4))
    },
  },
}
</script>

<style lang="less" scoped>
.grid-form-table {
  position: relative;
  width: 100%;

  &__table {
    &_medium {
      .ivu-table-small .ivu-table-summary {
        font-size: 14px;
      }
    }

    .ivu-table th:not(:last-child),
    .ivu-table td:not(:last-child) {
      border-right: 1px solid #e8eaec;
    }

    .ivu-table:before {
      height: 0;
    }

    .ivu-table-header .header-border-right-none {
      border-right: none !important;

      &.ivu-table-column-center {
        text-align: right;
      }

      .ivu-table-cell {
        padding-right: 0px;
      }
    }

    .ivu-table-summary .header-border-right-none {
      border-right: none !important;

      &.ivu-table-column-center {
        text-align: right;
      }

      .ivu-table-cell {
        padding-right: 0px;
        margin-right: -10px;
      }
    }
  }

  &__suffix {
    position: absolute;
    top: -25px;
    right: 0;
  }
}
</style>
