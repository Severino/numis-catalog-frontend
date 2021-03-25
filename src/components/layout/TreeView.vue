<template>
  <div class="tree-view">
    <div v-for="twig in children" :key="twig.id" class="tree-item">
      <header
        :class="isCollapsible(twig) && twig.collapsed ? 'collabsible' : ''"
        @click.stop="toggleCollapsed(twig)"
      >
        <PlusBoxOutline v-if="isCollapsible(twig) && twig.collapsed" />
        <MinusBoxOutline v-if="isCollapsible(twig) && !twig.collapsed" />

        {{ twig.name }}
      </header>

      <div v-if="!twig.collapsed" class="children">
        <component v-if="twig.leaf" v-bind:is="twig.leaf" :data="twig.data" />

        <TreeView
          :collapsible="isCollapsible(twig)"
          v-if="twig.children && twig.children.length > 0"
          :children="twig.children"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlusBoxOutline from "/node_modules/vue-material-design-icons/PlusBoxOutline";
import MinusBoxOutline from "/node_modules/vue-material-design-icons/MinusBoxOutline";
import TypeLeaf from "../type/TypeLeaf.vue";

export default {
  name: "TreeView",
  components: {
    PlusBoxOutline,
    MinusBoxOutline,
    TypeLeaf,
  },
  props: {
    children: {
      required: true,
      type: Array,
    },
    loadChildren: Object,
  },
  methods: {
    toggleCollapsed: async function (twig) {
      if (twig.loadChildren) twig.children = await twig.loadChildren();

      twig.collapsed = !twig.collapsed;
    },
    isCollapsible: function (twig) {
      return twig.loadChildren || (twig.children && twig.children.length) > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-view {
  padding: 10px;
}

.tree-item {
  position: relative;
  cursor: pointer;
  background-color: whitesmoke;
  border: 1px solid gray;
  user-select: none;
  border-radius: 5px;
  // padding: 5px;
  margin-bottom: 5px;

  header {
    color: white;
    background-color: gray;
  }

  &.collapsible {
    background-color: red;
  }
}

.children {
  position: relative;
  padding-left: 30px;
}
</style>