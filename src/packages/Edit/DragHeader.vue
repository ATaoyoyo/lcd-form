<template>
  <div class="lcd-drag-header">
    <div class="lcd-drag-header-title">
      <Input v-model="title" placeholder="请输入标题" />
    </div>
    <div class="lcd-drag-header-opt">
      <input
        ref="upload-input"
        :multiple="false"
        style="display: none"
        type="file"
        accept=".xlsx, .xls"
        @change="onFileChange"
      />
      <Button @click="$refs['upload-input'].click()">上传Excel</Button>
      <Button type="primary" @click="$emit('on-create-json')">生成JSON</Button>
      <Button type="info" @click="$emit('on-preview')">预览</Button>
      <Button type="error" @click="$emit('on-clean')">清空</Button>
    </div>
  </div>
</template>

<script>
import xlsx from 'xlsx'
import { uniqueId } from '@/utils'

export default {
  name: 'DragHeader',

  provide: {},

  components: {},

  filters: {},

  props: {
    title: String,
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
    onFileChange(e) {
      const cloneFiles = Array.prototype.slice.call(e.target.files)

      if (cloneFiles.length === 0) return

      const file = cloneFiles.slice(0, 1)[0]

      if (!/^.*\.(?:xls|xlsx)$/i.test(file.name)) {
        this.$Message.warning('请上传Excel文件！')
        return
      }

      this.readFile(file)
    },

    readFile(file) {
      const formData = new FormData()
      const fileReader = new FileReader()
      formData.append('file', file.raw)
      formData.append('fileType', '3')

      fileReader.onload = (event) => {
        const data = event.target.result
        const workbook = xlsx.read(data, {
          type: 'buffer',
          cellText: true,
          cellNF: false,
          raw: true,
        })

        // const { Sheets, SheetNames } = workbook
        // const result = xlsx.utils.sheet_to_json(Sheets[SheetNames[0]], {
        //   defval: '',
        // })

        // 例子，第二行开始，第九列结束
        const row = Array.prototype.slice.call(workbook.Strings, 2 - 1, 9 + 2)

        this.makeExcelJson(row)
      }

      fileReader.readAsArrayBuffer(file)
    },

    makeExcelJson(row) {
      const model = {}
      const tableField = uniqueId()
      const columns = row.map((item) => {
        const key = uniqueId()
        model[key] = ''
        return {
          title: item.t,
          key: key,
          align: 'center',
          customize: { type: 'text' },
          validate: [],
        }
      })
      const formTableValue = {
        formTitle: '',
        formModel: { [tableField]: [model] },
        formSchema: [
          {
            category: '',
            children: [
              {
                type: 'formTable',
                span: 24,
                field: tableField,
                props: { border: true },
                columns: columns,
              },
            ],
          },
        ],
      }

      this.$emit('on-make-excel-json', formTableValue)
    },
  },
}
</script>

<style lang="less" scoped>
.lcd-drag-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  background-color: #fff;

  &-title {
    flex: 1;
  }

  &-opt {
    display: flex;
    align-items: center;

    button {
      margin: 0 5px;
    }

    .upload-input {
      height: 32px;
      background: #ffffff;
    }
  }
}
</style>
