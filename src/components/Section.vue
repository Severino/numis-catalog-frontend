<template>
  <section>
    <Heading>{{ title }}</Heading>
    <slot></slot>
  </section>
</template>

<script>
import Heading from "./Heading.vue";

export default {
  name: "Section",
  components: {
    Heading,
  },
  props: {
    title: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
section {
  border: 0 solid rgb(214, 214, 214);
  border-top-width: 1px;
  border-bottom-width: 1px;

  padding-bottom: 40px;
  padding-top: 40px;
}
</style> 