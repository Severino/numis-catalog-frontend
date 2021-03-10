<template>
  <div class="tree-view">
    <div v-for="twig in children" :key="twig.id" class="tree-item">
      <PlusBoxOutline /> {{ twig.name }}
      <div class="children">
        <TreeView
          v-if="twig.children && twig.children.length > 0"
          :children="twig.children"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlusBoxOutline from "/node_modules/vue-material-design-icons/PlusBoxOutline";

export default {
  name: "TreeView",
  components: {
    PlusBoxOutline,
  },
  props: {
    children: {
      required: true,
      type: Array,
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
  padding: 5px;
  margin-bottom: 5px;

  &::before {
    position: absolute;
    content: "";
    border-top: 2px dotted red;
    top: 11px;
    left: -26px;
    width: 30px;
  }
}

.children {
  position: relative;
  padding-left: 30px;

  &::after {
    position: absolute;
    content: "";
    left: 11px;
    top: -10px;
    bottom: -20px;
    border-left: dotted 2px black;
    z-index: 1;
  }
}
</style>