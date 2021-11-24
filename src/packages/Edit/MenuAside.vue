<template>
  <div class="lcd-menu-aside">
    <div class="lcd-left-aside-content" v-for="menu in menus" :key="menu.title">
      <h3 class="title">{{ menu.title }}</h3>

      <div class="lcd-left-aside-content-item">
        <draggable
          class="lcd-draggable"
          :group="{ name: 'default', pull: 'clone', put: false }"
          :sort="false"
          :list="menu.list"
          :clone="onClone"
        >
          <div class="draggable-schema" v-for="schema in menu.list" :key="schema.title">
            <div class="lcd-draggable-icon">
              <i class="lcd-icon" :class="schema.icon" />
            </div>
            <div class="lcd-draggable-label">
              <span>{{ schema.label }}</span>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import col from '@/config/schema/col'

export default {
  name: 'MenuAside',

  provide: {},

  components: { draggable },

  filters: {},

  props: {
    menus: Array,
  },

  // 定义属性
  data() {
    return {}
  },

  // 计算属性，会监听依赖属性值随之变化
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},

  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  // 生命周期 - 创建之前
  beforeCreate() {},

  // 生命周期 - 挂载之前
  beforeMount() {},

  // 生命周期 - 更新之前
  beforeUpdate() {},

  // 生命周期 - 更新之后
  updated() {},

  // 生命周期 - 销毁之前
  beforeDestroy() {},

  // 生命周期 - 销毁完成
  destroyed() {},

  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},

  // 方法集合
  methods: {
    onClone(value) {
      // vuedraggable clone模式下，两边数据引用的是同一个地址，后续使用里面的数据会用莫名其妙的bug
      const data = JSON.parse(JSON.stringify(value))
      const schema = value.rule()

      if (schema.type === 'formTable') {
        schema.props.model = { [schema.field]: schema.props.data }
        schema.props.schema = {
          field: schema.field,
          columns: schema.props.columns,
        }
      }

      if (schema.type === 'row') {
        const schema = col.rule()

        data.columns = [{ ...schema, schema, configProps: col.props() }]
      }

      return Object.assign(data, {
        ...schema,
        schema,
        configProps: value.props(),
      })
    },
  },
}
</script>

<style lang="less" scoped>
.lcd-menu-aside {
  height: 100%;
  background: #fff;
  overflow: auto;

  .lcd-left-aside-content {
    .title {
      padding: 10px;
    }

    &-item {
      padding: 0 10px;

      .lcd-draggable {
        display: flex;
        flex-wrap: wrap;

        .draggable-schema {
          width: 33%;
          height: 65px;
          text-align: center;
          transition: all 0.3s;
          cursor: pointer;

          &:hover {
            color: #fff;
            background-color: rgb(40, 95, 212);
          }

          .lcd-draggable-icon {
            .lcd-icon {
              font-size: 25px;
            }
          }
        }
      }
    }
  }
}
</style>
