<template>
  <div class="tree-view">
    <div v-for="(twig, index) in children" :key="twig.id" class="tree-item">
      <header
        :class="isCollapsible(twig) && twig.collapsed ? 'collabsible' : ''"
        @click.stop="toggleCollapsed(twig, index)"
      >
        <PlusBoxOutline v-if="isCollapsible(twig) && twig.collapsed" />
        <MinusBoxOutline v-if="isCollapsible(twig) && !twig.collapsed" />

        {{ twig.name }} {{ twig.collapsed }}
      </header>

      <div v-if="!twig.collapsed" class="children">
        <component v-if="twig.leaf" v-bind:is="twig.leaf" :data="twig.data" />

        <TreeView
          :collapsible="isCollapsible(twig)"
          v-if="twig.children && twig.children.length > 0"
          :children="twig.children"
          @changed="changed($event, index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlusBoxOutline from "/node_modules/vue-material-design-icons/PlusBoxOutline";
import MinusBoxOutline from "/node_modules/vue-material-design-icons/MinusBoxOutline";
import TypeLeaf from "../type/TypeLeaf.vue";

const nodepath = require("path");

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
    toggleCollapsed: async function(twig, index) {
      if (twig.loadChildren) twig.children = await twig.loadChildren();

      twig.collapsed = !twig.collapsed;
      console.log(index);
      this.changed({ path: "", object: twig }, index);
    },
    isCollapsible: function(twig) {
      return twig.loadChildren || (twig.children && twig.children.length) > 0;
    },
    changed({ path = "", object = {} } = {}, index) {
      // this.$set(this.children, index, object)

      console.log(index);
      this.$emit("changed", {
        object,
        path: nodepath.join(path, index.toString()),
      });
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
