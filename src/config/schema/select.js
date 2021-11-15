import { uniqueId } from '../../utils'
import { makeOptionsRule } from '../../utils/index'

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
      effect: { fetch: '', },
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
      { type: 'switch', field: 'multiple', title: '是否多选' },
      { type: 'switch', field: 'clearable', title: '是否可以清空选项' },
      { type: 'input', field: 'placeholder', title: '占位符' },
      { type: 'switch', field: 'popperAppendToBody', title: '弹出框至于最外层', value: true },
    ]
  },
}
