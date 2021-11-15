import { uniqueId } from "@/utils";

const label = "输入框";
const name = "input";

export default {
  icon: "icon-input",
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: "",
      props: {},
      validate: [],
    };
  },
  props() {
    return [
      {
        type: "select",
        field: "type",
        title: "类型",
        value: "text",
        options: [
          { label: "文字（text）", value: "text" },
          { label: "多行输入（textarea）", value: "textarea" },
          { label: "数字（number）", value: "number" },
          { label: "密码（password）", value: "password" },
        ],
      },
      {
        type: "input",
        field: "placeholder",
        title: "输入框占位文本",
        value: "",
      },
      { type: "switch", field: "clearable", title: "是否可清空", value: false },
    ];
  },
};
