import { uniqueId } from "@/utils";

const label = "表格";
const name = "formTable";

const columns = [
  { title: "Name", key: "name", customize: { type: "input" } },
  { title: "Age", key: "age", customize: { type: "inputNumber" } },
  { title: "Address", key: "address", customize: { type: "input" } },
];

const data = [
  {
    name: "John Brown",
    age: 18,
    address: "New York No. 1 Lake Park",
    date: "2016-10-03",
  },
  {
    name: "Jim Green",
    age: 24,
    address: "London No. 1 Lake Park",
    date: "2016-10-01",
  },
  {
    name: "Joe Black",
    age: 30,
    address: "Sydney No. 1 Lake Park",
    date: "2016-10-02",
  },
  {
    name: "Jon Snow",
    age: 26,
    address: "Ottawa No. 2 Lake Park",
    date: "2016-10-04",
  },
];

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
      props: {
        columns: columns,
        data: data,
      },
      validate: [],
    };
  },
  props() {
    return [];
  },
};
