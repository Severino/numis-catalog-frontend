<template>
  <div class="tree-explorer">
    <h1>Explorer</h1>
    <TreeView :children="twigs" />
  </div>
</template>

<script>
import TreeView from "../layout/TreeView.vue";
export default {
  components: { TreeView },
  props: {
    categories: {
      type: Array,
      default: function () {
        return ["Material", "Nominal"];
      },
    },
  },
  created: function () {
    this.categories.forEach((name) => {
      this.twigs.push({
        name,
        id: this.twigId++,
        collapsed: true,
        children: [],
      });
    });
  },
  data: function () {
    return {
      twigId: 0,
      twigs: [],
    };
  },
};
</script>


<style lang="scss">
.tree-explorer > .tree-view > .tree-item::before {
  content: none;
}
</style>