<script>
export default {
  name: "RenderComponents",

  functional: true,

  render(h, context) {
    const { props } = context;
    return h(props.rule.cpnName, {
      props: { ...props.rule.props },
      on: context.listeners,
    });
  },
};
</script>
