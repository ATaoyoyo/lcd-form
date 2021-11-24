import { uniqueId } from '@/utils'

const label = '计数器'
const name = 'inputNumber'

export default {
  icon: 'icon-number',
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      props: {},
    }
  },
  props() {
    return [
      {
        type: 'inputNumber',
        field: 'min',
        title: '设置计数器允许的最小值',
        value: null,
      },
      {
        type: 'inputNumber',
        field: 'max',
        title: '设置计数器允许的最大值',
        value: null,
      },

      { type: 'switch', field: 'disabled', title: '是否禁用计数器' },
      {
        type: 'switch',
        field: 'controls',
        title: '是否使用控制按钮',
        value: true,
      },
      { type: 'input', field: 'placeholder', title: '占位符' },
      { type: 'switch', field: 'controls-outside', title: '按钮形式' },
    ]
  },
}
