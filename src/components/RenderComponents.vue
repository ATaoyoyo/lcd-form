<script>
import { upper } from "../utils";
export default {
  name: "RenderComponents",

  functional: true,

  render(h, context) {
    const { props } = context;
    const name = upper(props.rule.type);
    return h(name, {
      props: { ...props.rule.props },
      on: context.listeners,
    });
  },
};
</script>
