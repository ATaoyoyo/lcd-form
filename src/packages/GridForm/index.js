import GridForm from './GridForm'
import GridFormItem from './GridFormItem'

export { GridForm, GridFormItem }

let gridForm = {}

gridForm.install = function (Vue, options) {
  Vue.component(GridForm.name, GridForm)
  Vue.component(GridFormItem.name, GridFormItem)
}

export default gridForm
