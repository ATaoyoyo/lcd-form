<script>
import draggable from "vuedraggable";

export default {
  name: "DragBox",
  props: ["rule"],
  components: { draggable },
  functional: true,
  render(h, context) {
    console.log("DragBoxContext: ", context);

    return h(
      "draggable",
      {
        class: "draggable-pane",
        ...context.props.rule.props,
        props: { ...context.props.rule.props },
      },
      context.children
    );
  },
};
</script>
