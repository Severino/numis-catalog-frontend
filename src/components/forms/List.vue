<template>
  <div class="list">
    <button @click="addEntry">+</button>
    <div class="list-container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  methods: {
    addEntry: function () {
      console.log("ADD ENTRY");
      this.$emit("add");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import "@/scss/_import.scss";

.list {
  position: relative;
  display: flex;
  flex-direction: column;
}

.list-container {
  width: 100%;
  margin-top: $padding;
}
</style> 