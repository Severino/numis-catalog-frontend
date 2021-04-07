<template>
  <div class="tree-item" v-bind:class="{leafItem: twig.leaf}">
    
    <header
      :class="isCollapsible(twig) && collapsed ? 'collabsible' : ''"
      @click.stop="toggleCollapsed()"
    >
      <PlusBoxOutline v-if="isCollapsible(twig) && collapsed" class="icon"/>
      <MinusBoxOutline v-if="isCollapsible(twig) && !collapsed" class="icon"/>
      {{ twig.name }}
    </header>

    <div v-if="!collapsed" class="children">
      <component v-if="twig.leaf && !twig.preventCollapse" v-bind:is="twig.leaf" :data="twig.data" @click="selected(twig.data)" />

      <TreeView
        v-if="twig.children && twig.children.length > 0"
        :children="twig.children"
        @select="selected($event)"
      />
    </div>
  </div>
</template>

<script>
import PlusBoxOutline from "/node_modules/vue-material-design-icons/PlusBoxOutline";
import MinusBoxOutline from "/node_modules/vue-material-design-icons/MinusBoxOutline";
import TypeLeaf from "../type/TypeLeaf.vue";

export default {
  name: "TreeItem",
  components: {
    PlusBoxOutline,
    MinusBoxOutline,
    TypeLeaf,
  },
  props: {
    twig: { type: Object, required: true },
  },
  data: function () {
    return {
      collapsed: true,
    };
  },
  beforeCreate: function () {
    // This is required, as due to the recursive nature of the treeview, we are using a circular dependency here.
    this.$options.components.TreeView = require("./TreeView.vue").default;
  },
  methods: {
    toggleCollapsed: async function () {
      if (this.collapsed && this.twig.loadChildren)
        this.twig.children = await this.twig.loadChildren();

      this.collapsed = !this.collapsed;

      if(this.twig.leaf){
        this.selected(this.twig.data)
      }
    },
    isCollapsible: function (twig) {
      console.log(twig.leaf)
      return (
        twig.loadChildren ||
        (twig.children && twig.children.length) > 0
      );
    },
    selected(data){
      this.$emit("select", data)
    }
  },
};
</script>

<style lang="scss" scoped>
    header {
      padding: 7px 15px;
        user-select: none;
        cursor: pointer;
    }

    .leafItem {
        box-sizing: border-box;
        border: 1px solid black;
        display: inline-block;


        header {
            background-color: whitesmoke;
        }
    }

    .icon {
      margin-right: 5px;
    }
</style>