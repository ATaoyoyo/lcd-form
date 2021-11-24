import { uniqueId } from '@/utils'

const label = '单选框'
const name = 'radio'

export default {
  icon: 'icon-radio',
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      effect: {
        fetch: '',
      },
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
      { type: 'switch', field: 'border', title: '显示边框' },
      {
        type: 'switch',
        field: 'type',
        title: '按钮形式',
        props: { trueValue: 'button', falseValue: 'default' },
      },
      { type: 'switch', field: 'disabled', title: '是否禁用' },
    ]
  },
}
