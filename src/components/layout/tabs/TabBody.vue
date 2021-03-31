<template>
  <div class="tab-body">
    <slot />
  </div>
</template>

<script>
export default {
  name: "TabBody",
};
</script>

<style scoped>

.tab-body {
  box-sizing: border-box;
  overflow: auto;
}

</style>
