<template>
  <div class="labeled-input-container">
    <label>{{ label }} {{ warning }}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LabeledInputContainer",
  props: {
    label: String,
    warning: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.labeled-input-container {
  display: flex;
  flex-direction: column;

  > *:not(:first-child) {
    flex: 1;
  }
}
</style> 