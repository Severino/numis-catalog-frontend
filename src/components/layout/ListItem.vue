<template>
  <div class="list-item" @click="click">
      <slot></slot>
  </div>
</template>

<script>

export default {
  name: "ListItem",
  methods: {
    click: function () {
      this.$emit("click");
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/scss/_import.scss";

.list-item {
  @include interactive();
  @include input();

  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  border-bottom-width: 0;

  &:last-of-type {
    border-bottom-width: 1px;
  }
}

.removeBtn {
  position: absolute;
  right: 0;
  max-height: 100%;
}

.slot {
  flex: 1;
  // padding: $padding;
  display: flex;

  > * {
    flex: 1;
  }
}


</style> 