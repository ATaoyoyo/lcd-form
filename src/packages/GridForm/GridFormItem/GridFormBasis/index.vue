<template>
  <div class="grid-form-basis" type="flex">
    <div
      class="grid-form-basis__label grid-form-basis__label_bg"
      :style="{
        width: schema['label-width'] ? `${schema['label-width']}px` : '150px',
        justifyContent: schema['label-position'] ? schema['label-position'] : 'center',
        textAlign: schema['text-align'] ? schema['text-align'] : 'center',
      }"
    >
      <template v-if="preview">
        <span
          v-if="
            schema.type !== 'annex' &&
            schema.type !== 'geoRange' &&
            schema.validate.find(({ required }) => required === true)
          "
          class="grid-form-basis__label_required"
        >
          *
        </span>
      </template>
      <template v-else>
        <span
          v-if="schema.type === 'annex'"
          :class="[
            'grid-form-basis__label_required',
            schema.validate.find(({ required }) => required === true)
              ? ''
              : 'grid-form-basis__label_required-hide',
          ]"
        >
          *
        </span>
        <span
          v-else-if="schema.validate.find(({ required }) => required === true)"
          class="grid-form-basis__label_required"
        >
          *
        </span>
      </template>

      <Tooltip v-if="schema.tooltip" :content="schema.tooltip" max-width="250" transfer>
        <span v-html="schema.label"></span>
      </Tooltip>
      <span v-else v-html="schema.label"></span>
    </div>
    <div class="grid-form-basis__value">
      <div class="grid-form-basis__value-enter">
        <template v-if="preview">
          <p v-if="schema.type === 'select' && model[schema.field]">
            {{
              onSelectMounted() && schema.options.length
                ? schema.options.find(({ value }) => value === model[schema.field]).label
                : model[schema.field]
            }}
          </p>
          <p v-else>{{ model[schema.field] }}</p>
        </template>
        <FormItem
          v-else
          class="grid-form-basis__form-item"
          :prop="schema.field"
          :rules="getValidateRules(schema.type, schema.validate)"
          :show-message="true"
        >
          <Input
            v-if="schema.type === 'text'"
            v-model.trim="model[schema.field]"
            v-bind="schema.props"
          />
          <InputNumber
            v-else-if="schema.type === 'number'"
            v-model="model[schema.field]"
            v-bind="schema.props"
            style="width: 100%"
          />
          <Select
            v-else-if="schema.type === 'select'"
            v-model="model[schema.field]"
            v-bind="schema.props"
            :loading="selectLoading"
            @on-create="onSelectCreate"
            @on-change="onSelectChange"
            @on-open-change="onSelectOpenChange"
            @hook:mounted="onSelectMounted()"
          >
            <Option
              v-for="(option, index) in schema.options"
              :value="option.value"
              :key="index"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </Option>
          </Select>
          <DatePicker
            v-else-if="schema.type === 'date'"
            :value="model[schema.field]"
            v-bind="schema.props"
            style="width: 100%"
            @on-change="(date) => (model[schema.field] = date)"
            @hook:mounted="schema.props.initDate && onDatePickerMounted()"
          ></DatePicker>
          <RadioGroup
            v-else-if="schema.type === 'radio'"
            v-model="model[schema.field]"
            v-bind="schema.props"
          >
            <Radio
              v-for="(option, index) in schema.options"
              :key="index"
              :label="option.label"
              :disabled="option.disabled"
            >
              {{ option.description || option.label }}
            </Radio>
          </RadioGroup>
          <CheckBoxGroup v-else-if="schema.type === 'checkbox'" v-model="model[schema.field]">
            <Checkbox
              v-for="(option, index) in schema.options"
              :key="index"
              :label="option.label"
              :disabled="option.disabled"
            ></Checkbox>
          </CheckBoxGroup>
        </FormItem>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from './helper'

export default {
  name: 'GridFormBasis',

  inject: {
    validateField: { default: () => {} },
  },

  components: {},

  props: {
    model: Object,
    schema: Object,
    preview: Boolean,
  },

  data() {
    return {
      selectLoading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {
    // console.log('updated: ', this.model[this.schema.field])
  },

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    onSelectMounted() {
      const { dictionary, dictionaryKey } = this.schema.props
      if (!dictionary) return
      this.selectLoading = true
      const value_key = dictionaryKey ? dictionaryKey.value : 'desc'
      const label_key = dictionaryKey ? dictionaryKey.label : 'desc'
      getDictionaryValueListApi(dictionary).then(({ data }) => {
        this.selectLoading = false
        this.schema.options = data
          ? data.map((item) => ({
              label: item[label_key],
              value: item[value_key],
              code: item.codeInfo,
            }))
          : []
      })
    },

    onSelectOpenChange(status) {
      if (!this.schema.props.dictionary || !status || this.schema.options.length) return
      this.onSelectMounted()
    },

    onDatePickerMounted() {
      const { format } = this.schema.props
      this.model[this.schema.field] = format ? formatDate(format) : formatDate('yyyy-MM-dd')
    },

    onSelectCreate(val) {
      this.schema.options.push({
        value: val,
        label: val,
      })
    },

    onSelectChange() {},

    getValidateRules(type, rules) {
      if (!rules) return null
      if (type === 'annex') {
        const isRequired = rules.find(({ required }) => required === true)
        const _rule = rules.map((rule) => {
          const { customize, ..._rule } = rule
          if (!customize) return rule
          return {
            ..._rule,
            validator(rule, value, callback, source, options) {
              const { format, 'max-size': maxSize, message } = customize
              if (format || maxSize) {
                const isFile = Object.prototype.toString.call(value) === '[object File]'
                if (!isRequired && !isFile) return callback()
                const file = Array.isArray(value) ? value[0] : value
                const { name } = file
                const fileFormat = name.substr(name.lastIndexOf('.') + 1)
                const isFormat = format && !format.includes(fileFormat)
                const isOverSize = maxSize && maxSize * 1024 < file.size
                if (isFormat) {
                  callback(message ? message : `上传文件”${name}“格式不正确`)
                } else if (isOverSize) {
                  callback(message ? message : `上传文件”${name}“过大`)
                } else {
                  callback()
                }
              } else {
                callback()
              }
            },
          }
        })
        return _rule
      } else {
        const hasValidator = rules.find(({ validator }) => validator)
        if (hasValidator) {
          return rules.map((rule) => {
            const { validator, ..._rule } = rule
            if (!validator) return rule
            const looseFunctionParse = Function('"use strict";return (' + validator + ')')()
            return {
              ..._rule,
              validator: looseFunctionParse,
            }
          })
        } else {
          return rules
        }
      }
    },

    onItemAnnexUpload(file) {
      this.model[this.schema.field] = file
      const validateField = this.validateField
      validateField(this.schema.field)
    },

    onItemAnnexDelete() {
      const file = this.model[this.schema.field]
      const isExistFile = Boolean(file.url)
      const callback = () => {
        this.model[this.schema.field] = null
        const validateField = this.validateField
        validateField(this.schema.field)
      }
      if (isExistFile) {
        this.$emit('on-annex-delete', { file, callback })
      } else {
        callback()
      }
    },
  },
}
</script>

<style lang="less">
.grid-form-basis {
  display: flex;
  height: 100%;

  &__label {
    // width: 150px;
    min-height: 40px;
    padding: 6px 8px;
    font-size: 14px;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    // justify-content: center;

    &_required {
      color: red;
      font-size: 16px;
      padding-right: 3px;
      align-self: flex-start;
    }

    &_required-hide {
      visibility: hidden;
    }

    &_bg {
      background-color: #f8f8f9;
    }
  }

  &__value {
    flex: 1;
    border-left: 1px solid #e2e2e2;
    text-align: center;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  &__value-enter {
    flex: 1;
  }

  &__value-suffix {
    font-size: 13px;
    padding-left: 8px;
  }

  &__form-item {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}
</style>
