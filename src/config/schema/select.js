import { uniqueId } from '@/utils'

const label = '选择器'
const name = 'select'

export default {
  icon: 'icon-select',
  label,
  name,
  childrenName: 'option',
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      effect: { fetch: '' },
      props: {},
      options: [
        { value: '选项1', label: '选项1' },
        { value: '选项2', label: '选项2' },
      ],
    }
  },
  props() {
    const jsonValue = JSON.stringify(this.rule().options, null, 2)
    return [
      {
        type: 'struct',
        field: 'options',
        title: '选项数据',
        props: { title: '编辑数据', jsonValue },
      },
      { type: 'input', field: 'placeholder', title: '占位符' },
      { type: 'input', field: 'prefix', title: '前缀图标' },
      { type: 'switch', field: 'multiple', title: '是否多选' },
      {
        type: 'inputNumber',
        field: 'max-tag-count',
        title: '多选标签（tag）数量',
        value: null,
        props: { min: 2 },
      },
      { type: 'switch', field: 'filterable', title: '可搜索' },
      { type: 'switch', field: 'clearable', title: '是否可以清空选项' },
      { type: 'switch', field: 'popperAppendToBody', title: '弹出框至于最外层', value: true },
    ]
  },
}
