<template>
  <div class="tree-view">
    <TreeItem
      v-for="twig in children"
      :key="twig.id"
      @select="selected($event)"
      :twig="twig"
      v-bind:class="{inline: twig.inline}"
    />
  </div>
</template>

<script>
import TreeItem from "./TreeItem.vue";

export default {
  name: "TreeView",
  components: {
    TreeItem,
  },
  props: {
    children: {
      required: true,
      type: Array,
    },
    loadChildren: Object,
  },
  data: function () {
    return {
      collapsed: true,
    };
  },
  methods: {
    selected: function (data) {
      this.$emit("select", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-item {
  margin-left: 50px;
}

</style>
