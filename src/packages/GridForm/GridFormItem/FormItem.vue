<script>
import GridFormBasis from './GridFormBasis'
import GridDynamicTable from './GridDynamicTable'
import GridFormTable from './GridFormTable'

export default {
  name: 'FormItem',

  components: {},

  props: {
    schema: Object,
    model: Object,
    preview: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  render: function (h) {
    const { model, schema, preview } = this
    const { type, className } = schema
    let formComponent
    if (['text', 'number', 'select', 'date', 'radio'].includes(type)) {
      formComponent = GridFormBasis
    } else if (type === 'formTable') {
      formComponent = GridFormTable
    } else if (type === 'dynamicTable') {
      formComponent = GridDynamicTable
    }
    return h(formComponent, {
      class: className ? className : '',
      props: {
        model: model,
        schema: schema,
        preview: preview,
        // preview: preview || schema.inherit
      },
      on: this.$listeners,
    })
  },

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {},
}
</script>
