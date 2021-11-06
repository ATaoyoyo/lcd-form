<template>
  <div id="app">
    <Layout>
      <Sider width="266">
        <div class="lcd-f-container">
          <div class="lcd-f-pane" v-for="menu in menuList" :key="menu.id">
            <h4 class="lcd-f-pane-title">{{ menu.title }}</h4>

            <draggable
              class="lcd-f-pane-container"
              :group="{ name: 'default', pull: 'clone', put: false }"
              :sort="false"
              :list="menu.list"
              :clone="onClone"
            >
              <div
                class="lcd-dragge-item"
                v-for="menuItem in menu.list"
                :key="menuItem.key"
              >
                <div class="lcd-icon-box">
                  <i :class="['lcd-icon', menuItem.icon]" />
                </div>
                <div class="lcd-label">{{ menuItem.label }}</div>
              </div>
            </draggable>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content>
          <GridForm title="TEST FORM" :rule="form.rule" :model="form.model" />
        </Content>

        <Sider width="266" hide-trigger>
          <div class="lcd-f-config-pane">
            <h4 class="title">表单配置</h4>
          </div>
        </Sider>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import draggable from "vuedraggable";

import createMenu from "./config/menu";
import GridForm from "./components/GridForm/index.vue";
import { uniqueId } from "./utils";
import ruleList from "./config/rule";

export default {
  name: "App",
  components: { draggable, GridForm },
  data() {
    return {
      menuList: createMenu(),
      form: {
        model: {},
        rule: this.makeDragRule([]),
      },
    };
  },

  mounted() {},

  methods: {
    makeDragRule(children) {
      //  add: (inject, evt) => this.dragAdd(children, evt),
      //     end: (inject, evt) => this.dragEnd(children, evt),
      //     start: (inject, evt) => this.dragStart(children, evt),
      //     unchoose: (inject, evt) => this.dragUnchoose(children, evt),
      return [
        this.makeDrag(children, {
          add: (inject, evt) => this.dragAdd(children, evt),
          end: (inject, evt) => this.dragEnd(children, evt),
          start: (inject, evt) => this.dragStart(children, evt),
          unchoose: (inject, evt) => this.dragUnchoose(children, evt),
        }),
      ];
    },

    makeDrag(children, on) {
      return {
        id: uniqueId(),
        props: {
          tag: "Col",
          direction: "vertical",
          ghostClass: "ghost",
          group: "default",
          animation: 150,
          emptyInsertThreshold: 0,
          list: children,
        },
        on,
        children,
      };
    },

    makeRule() {},

    dragAdd(children, evt) {
      console.log(children, evt);
      const newIndex = evt.newIndex;
      const menu = evt.item._underlying_vm_;
      if (!menu) {
        if (this.addRule) {
          const rule = this.addRule.children.splice(this.addRule.oldIndex, 1);
          children.splice(newIndex, 0, rule[0]);
        }
      } else {
        const rule = this.makeRule(ruleList[menu.name]);
        children.splice(newIndex, 0, rule);
      }
      this.added = true;
    },

    dragEnd(children, evt) {
      console.log(children, evt);
    },

    dragStart(children, evt) {
      console.log(children, evt);
    },

    dragUnchoose(children, evt) {
      console.log(children, evt);
    },

    onClone(value) {
      // vuedraggable clone模式下，两边数据引用的是同一个地址，后续使用里面的数据会用莫名其妙的bug
      const data = JSON.parse(JSON.stringify(value));
      return Object.assign(data, {
        field: uniqueId(),
        rule: value.rule(),
        props: value.props(),
      });
    },
  },
};
</script>

<style lang="less" scoped>
html,
body,
#app,
.ivu-layout {
  width: 100%;
  height: 100vh;
  font-weight: normal;
}

.title {
  padding: 10px;
  font-size: 18px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.lcd-f-container {
  max-height: 100vh;
  overflow: auto;

  .lcd-f-pane {
    background-color: #fff;

    &-title {
      padding: 5px 10px;
      font-size: 16px;
    }

    &-container {
      display: flex;
      flex-wrap: wrap;
      padding: 2px 15px;
      width: 100%;

      .lcd-dragge-item {
        padding: 10px 5px;
        width: calc((100%- 25) / 3);
        height: 65px;
        font-size: 12px;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          color: #fff;
          background-color: rgb(40, 95, 212);
          transition: all 0.3s;
        }

        .lcd-icon-box {
          .lcd-icon {
            font-size: 14px;
            margin-right: 2px;
          }
        }
      }
    }
  }
}

.lcd-f-config-pane {
  height: 100vh;
  background-color: #fff;
  overflow: auto;
}
</style>
