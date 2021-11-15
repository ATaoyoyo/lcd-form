<script>
import { upper } from '@/utils'

const typeKeyMap = {
  radio: 'RadioGroup',
  switch: 'i-switch',
}

export default {
  functional: true,

  props: ['schema'],

  render(h, context) {
    console.log(context)

    const { props, listeners } = context

    const { schema } = props

    // i-view 中 Switch 与 Circle 需要使用 i- 前缀
    const name = typeKeyMap[schema.type]
      ? typeKeyMap[schema.type]
      : upper(schema.type)

    return h(
      name,
      {
        style: name !== 'i-switch' ? { width: '100%' } : {},
        domProps: schema.text ? { innerText: schema.text || '' } : {},
        props: { ...schema.props, value: schema.value },
        on: Object.keys(listeners).length
          ? {
              'on-change': (e) =>
                context.listeners.change(
                  schema,
                  schema.type === 'input' ? e.target.value : e
                ),
            }
          : {},
      },
      [
        schema.type === 'select'
          ? schema.options.map((item) =>
              h('Option', { props: { value: item.value, label: item.label } })
            )
          : schema.type === 'radio'
          ? schema.options.map((item) =>
              h('Radio', { props: { value: item.value, label: item.label } })
            )
          : null,
      ]
    )
  },
}
</script>
