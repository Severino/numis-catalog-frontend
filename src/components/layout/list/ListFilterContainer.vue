<template>
  <div class="list-filter-container">
    <header @click="toggleCollapse">
      <span>Filter</span>

      <div class="icon">
        <Plus v-if="collapsed" />
        <Minus v-if="!collapsed" />
      </div>
    </header>
    <div v-if="!collapsed" class="list-filter-container-content">
      <slot />
    </div>
  </div>
</template>

<script>
import Plus from "vue-material-design-icons/Plus";
import Minus from "vue-material-design-icons/Minus";

export default {
  name: "ListFilterContainer",
  components: {
    Plus,
    Minus,
  },
  data: function () {
    return {
      collapsed: true,
    };
  },
  methods: {
    toggleCollapse: function () {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-filter-container {
  border: 1px solid #ccc;
  border-radius: 3px;
  overflow: hidden;
}

header {
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

header,
.list-filter-container-content {
  padding: 10px;
}

.list-filter-container-content > *:not(:last-child) {
    margin-bottom: 10px;
}

.icon{
    margin-left: auto;
}

.material-design-icon{
    display: block;
    display: flex;
    align-items: center;
}
</style>