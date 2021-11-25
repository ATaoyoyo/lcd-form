import { uniqueId } from '@/utils'

const label = '多选框'
const name = 'checkbox'

export default {
  icon: 'icon-checkbox',
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
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
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
      { type: 'switch', field: 'disabled', title: '是否禁用' },
    ]
  },
}
