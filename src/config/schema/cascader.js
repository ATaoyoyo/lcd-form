import { uniqueId } from '@/utils'

const label = '级联选择器'
const name = 'cascader'

const data = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          {
            value: 'yizhi',
            label: '一致',
          },
          {
            value: 'fankui',
            label: '反馈',
          },
          {
            value: 'xiaolv',
            label: '效率',
          },
          {
            value: 'kekong',
            label: '可控',
          },
        ],
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          {
            value: 'cexiangdaohang',
            label: '侧向导航',
          },
          {
            value: 'dingbudaohang',
            label: '顶部导航',
          },
        ],
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout 布局',
          },
          {
            value: 'color',
            label: 'Color 色彩',
          },
          {
            value: 'typography',
            label: 'Typography 字体',
          },
          {
            value: 'icon',
            label: 'Icon 图标',
          },
          {
            value: 'button',
            label: 'Button 按钮',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio 单选框',
          },
          {
            value: 'checkbox',
            label: 'Checkbox 多选框',
          },
          {
            value: 'input',
            label: 'Input 输入框',
          },
          {
            value: 'input-number',
            label: 'InputNumber 计数器',
          },
          {
            value: 'select',
            label: 'Select 选择器',
          },
          {
            value: 'cascader',
            label: 'Cascader 级联选择器',
          },
          {
            value: 'switch',
            label: 'Switch 开关',
          },
          {
            value: 'slider',
            label: 'Slider 滑块',
          },
          {
            value: 'time-picker',
            label: 'TimePicker 时间选择器',
          },
          {
            value: 'date-picker',
            label: 'DatePicker 日期选择器',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器',
          },
          {
            value: 'upload',
            label: 'Upload 上传',
          },
          {
            value: 'rate',
            label: 'Rate 评分',
          },
          {
            value: 'form',
            label: 'Form 表单',
          },
        ],
      },
    ],
  },
]

export default {
  icon: 'icon-cascader',
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
      props: {
        data: data,
      },
    }
  },
  props() {
    return [
      {
        type: 'select',
        field: 'trigger',
        title: '次级菜单的展开方式',
        options: [
          { label: '点击展开', value: 'click' },
          { label: '移入展开', value: 'hover' },
        ],
      },
      {
        type: 'select',
        field: 'size',
        title: '尺寸',
        options: [
          { label: '大', value: 'large' },
          { label: '小', value: 'small' },
        ],
        props: { clearable: true },
      },
      { type: 'input', field: 'placeholder', title: '输入框占位文本' },
      { type: 'switch', field: 'transfer', title: '弹窗放置最外层（建议开启）', value: true },
      { type: 'input', field: 'transfer-class-name', title: '弹窗样式名' },
      { type: 'switch', field: 'disabled', title: '是否禁用' },
      { type: 'switch', field: 'clearable', title: '是否支持清空选项', value: true },
      { type: 'switch', field: 'filterable', title: '是否支持搜索' },
      { type: 'switch', field: 'change-on-select', title: '任意层级可点击' },
    ]
  },
}
