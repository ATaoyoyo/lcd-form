<template>
  <div class="grid-form-item">
    <p v-if="schema.category" class="grid-form-item__category-title">
      {{ schema.category }}
    </p>
    <Row class-name="grid-form-item__category-content">
      <i-col
        v-for="item in schema.children"
        :class="[item.children ? '' : 'grid-form-item__col_bottom']"
        :span="item.span"
        :key="item.field"
      >
        <template v-if="item.type === 'classification'">
          <div class="grid-form-item__classification">
            <div
              class="grid-form-item__classification-title"
              :style="{
                width: item['title-width']
                  ? `${item['title-width']}px`
                  : '150px',
              }"
            >
              <p>{{ item.title }}</p>
            </div>
            <Row
              class-name="grid-form-item__classification-content"
              type="flex"
            >
              <i-col
                v-for="item in item.children"
                :class="[item.children ? '' : 'grid-form-item__col_bottom']"
                :span="item.span"
                :key="item.field"
              >
                <template v-if="item.type === 'classification'">
                  <div class="grid-form-item__classification">
                    <div
                      class="grid-form-item__classification-title"
                      :style="{
                        width: item['title-width']
                          ? `${item['title-width']}px`
                          : '150px',
                      }"
                    >
                      <p>{{ item.title }}</p>
                    </div>
                    <Row
                      class-name="grid-form-item__classification-content"
                      type="flex"
                    >
                      <i-col
                        v-for="item in item.children"
                        :class="['grid-form-item__col_bottom']"
                        :span="item.span"
                        :key="item.field"
                      >
                        <FormItem
                          :model="model"
                          :schema="item"
                          :preview="preview"
                          @on-annex-delete="onAnnexDelete"
                        />
                      </i-col>
                    </Row>
                  </div>
                </template>

                <template v-else>
                  <FormItem
                    :model="model"
                    :schema="item"
                    :preview="preview"
                    @on-annex-delete="onAnnexDelete"
                  />
                </template>
              </i-col>
            </Row>
          </div>
        </template>

        <template v-else>
          <FormItem
            :model="model"
            :schema="item"
            :preview="preview"
            @on-annex-delete="onAnnexDelete"
          />
        </template>
      </i-col>
    </Row>
  </div>
</template>

<script>
import FormItem from './FormItem'

export default {
  name: 'GridFormItem',

  components: { FormItem },

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

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    onAnnexDelete(params) {
      this.$emit('on-annex-delete', params)
    },
  },
}
</script>

<style lang="less">
.grid-form-item {
  & + & {
    margin-top: 15px;
  }

  .ivu-form-item {
    .ivu-input {
      border: none;
      text-align: center;
      //   &:focus {
      //     border-color: #608cff;
      //   }
    }

    .ivu-input-number {
      border: none;
    }

    .ivu-input-number-input {
      text-align: center;
    }

    .ivu-select-selection {
      border: none;
    }

    .ivu-select-input {
      text-align: center;
    }

    .ivu-form-item-error-tip {
      padding-top: 0;
      top: 60%;
      // left: 50%;
      // transform: translate(-50%);
    }

    .ivu-form-item-content {
      line-height: 1;
    }

    // &.ivu-form-item-error {
    //   .ivu-input {
    //     border-color: #ed4014;
    //   }
    // }
  }

  &__category-title {
    font-size: 15px;
    line-height: 1.2;
    font-weight: 450;
    color: #3e6eff;
    padding-top: 10px;
    padding-bottom: 15px;
    text-align: center;
  }

  &__category-content {
    border-top: 1px solid #e2e2e2;
  }

  &__col {
    &_bottom {
      width: 100%;
      border-bottom: 1px solid #e2e2e2;
    }

    // &_right:nth-child(2) {
    //   border-right: none;
    // }
  }

  &__classification {
    display: flex;
  }

  &__classification-title {
    padding: 4px 8px;
    font-size: 14px;
    // font-weight: 450;
    background-color: #f8f8f9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e2e2e2;
  }

  &__classification-content {
    flex: 1;
    border-left: 1px solid #e2e2e2;
  }
}
</style>
