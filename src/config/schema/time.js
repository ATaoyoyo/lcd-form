import { uniqueId } from '@/utils'

const label = '时间选择器'
const name = 'timePicker'

export default {
  icon: 'icon-time',
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
      { type: 'switch', field: 'readonly', title: '完全只读' },
      { type: 'switch', field: 'disabled', title: '禁用' },
      { type: 'switch', field: 'editable', title: '文本框可输入', value: true },
      { type: 'switch', field: 'split-panels', title: '面板不联动（范围日期生效）' },
      { type: 'switch', field: 'clearable', title: '是否显示清除按钮', value: true },
      { type: 'switch', field: 'confirm', title: '带有确认按钮' },
      { type: 'switch', field: 'show-week-numbers', title: '显示星期数' },
      { type: 'switch', field: 'transfer', title: '弹窗放置最外层（建议开启）', value: true },
      { type: 'input', field: 'transfer-class-name ', title: '弹窗样式名' },
      { type: 'input', field: 'placeholder', title: '占位符' },
      { type: 'input', field: 'format', title: '日期格式' },
      { type: 'input', field: 'separator', title: '两个日期之间的分割符' },
    ]
  },
}
