import { uniqueId } from '@/utils'

const label = '输入框'
const name = 'input'

export default {
  icon: 'icon-input',
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      props: {},
      validate: [],
    }
  },
  props() {
    return [
      {
        type: 'select',
        field: 'type',
        title: '类型',
        value: 'text',
        options: [
          { label: '文字（text）', value: 'text' },
          { label: '文本域（textarea）', value: 'textarea' },
          { label: '数字（number）', value: 'number' },
          { label: '密码（password）', value: 'password' },
        ],
      },
      {
        type: 'input',
        field: 'placeholder',
        title: '输入框占位文本',
        value: '',
      },
      // {
      //   type: 'switch',
      //   field: 'show-word-limit',
      //   title: '开启长度限制',
      //   props: { trueValue: true, falseValue: false },
      // },
      {
        type: 'inputNumber',
        field: 'maxlength',
        title: '输入长度限制',
        value: null,
        props: { min: 0 },
      },
      { type: 'input', field: 'prefix', title: '前缀图标' },
      { type: 'input', field: 'suffix', title: '后缀图标' },
      { type: 'switch', field: 'border', title: '显示边框', value: true },
      { type: 'switch', field: 'autosize', title: '文本域自适应（类型为文本域时生效）' },
      { type: 'switch', field: 'clearable', title: '是否可清空' },
      { type: 'switch', field: 'search', title: '搜索框' },
      { type: 'switch', field: 'enter-button', title: '搜索框按钮形式' },
      { type: 'input', field: 'enter-button', title: '搜索框按钮文字' },
    ]
  },
}
