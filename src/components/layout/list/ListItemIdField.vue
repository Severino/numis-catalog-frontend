<template>
  <span id="id">{{ value }}</span>
</template>

<script>
export default {
  name: "ListItemIdField",
  props: {
    value: String
  },
};
</script>

<style lang="scss" scoped>
#id {
  flex: 0;
  color: gray;
  background-color: whitesmoke;
  font-size: 0.75em;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  //   padding: $padding;
  min-width: 16px;
  //   margin-right: $padding * 2;
}
</style>