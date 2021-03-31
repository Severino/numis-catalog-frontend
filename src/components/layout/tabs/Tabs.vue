<template>
  <div class="tabs">
    <header>
      <TabHeader
        v-for="(tab, index) in tabs"
        v-bind:key="`tabheader-${tab}-${index}`"
        @select="select(index)"
        :class="selected == index ? 'active' : ''"
      >
        {{ tab }}
      </TabHeader>
    </header>
    <tab-body>
      <slot :name="'tab-'+selected" />
    </tab-body>
  </div>
</template>

<script>
import TabBody from "./TabBody.vue";
import TabHeader from "./TabHeader.vue";
export default {
  components: { TabHeader, TabBody },
  name: "Tabs",
  props: {
    tabs: {
      type: Array,
      required: true,
      validator: function(tabs) {
        return tabs.every((item) => typeof item === "string");
      },
    },
  },
  data: function() {
    return {
      selected: 0,
    };
  },
  methods: {
    select: function(idx) {
      console.log("SELECT:", idx);
      this.selected = idx;
    },
  },
};
</script>

<style lang="scss">
.tab-header {
    position: relative;
  padding: 10px 20px;
  margin-right: 3px;

    top:1px;
  min-width: 100px;
  text-align: center;
  background-color: rgb(224, 224, 224);
  user-select: none;
  cursor: pointer;
  
  border: 1px solid black;
  border-bottom: none;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
//   z-index: ;

  &.active {
    //   z-index: 2;
    
  padding-top: 12px;
    background-color: white;
  }
}

.tab-body {
    // z-index: 1;
  background-color: white;
  min-height: 50px;
  padding: 10px 30px;
  border-radius: 5px;
  border: 1px solid black;
}
</style>
