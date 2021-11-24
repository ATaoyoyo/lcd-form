import { uniqueId } from '@/utils'

const label = '栅格布局'
const name = 'row'

export default {
  icon: 'icon-row',
  label,
  name,
  columns: [
    { span: 12, list: [] },
    { span: 12, list: [] },
  ],
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      props: {},
      children: [],
    }
  },
  props() {
    return [
      {
        type: 'inputNumber',
        field: 'gutter',
        title: '栅格间隔',
        value: 0,
        props: { min: 0 },
      },
      {
        type: 'switch',
        field: 'type',
        title: 'flex布局模式',
        props: { trueValue: 'flex', falseValue: 'default' },
      },
      {
        type: 'select',
        field: 'justify',
        title: 'flex 布局下的水平排列方式',
        options: [
          { label: '开始（start）', value: 'start' },
          { label: '结束（end）', value: 'end' },
          { label: '居中（center）', value: 'center' },
          { label: '环绕（space-around）', value: 'space-around' },
          { label: '两端对齐（space-between）', value: 'space-between' },
        ],
      },
      {
        type: 'select',
        field: 'align',
        title: 'flex 布局下的垂直排列方式',
        options: [
          { label: '顶端对齐（top）', value: 'top' },
          { label: '居中对齐（middle）', value: 'middle' },
          { label: '底端对齐（bottom）', value: 'bottom' },
        ],
      },
    ]
  },
}
