<template>
  <div class="list-item" @click="click">
    <span id="id">{{ id }}</span>
    <div class="slot">
      <slot></slot>
    </div>

    <DynamicDeleteButton @remove="triggerRemove" v-if="!noRemove" />
  </div>
</template>

<script>
import DynamicDeleteButton from "./DynamicDeleteButton.vue";

export default {
  components: {
    DynamicDeleteButton,
  },
  name: "ListItem",
  data: function () {
    return {
      removing: false,
      removeTimeout: null,
    };
  },
  props: {
    id: {
      required: true,
    },
    noRemove: { type: Boolean, default: false },
  },
  beforeDestroy: function () {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }
  },
  methods: {
    triggerRemove: function () {
      this.$emit("remove", this.$props.id);
    },
    click: function () {
      this.$emit("click", this.$props.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/scss/_import.scss";

.list-item {
  @include interactive();
  @include input();

  display: flex;
  align-items: center;
  padding: 0;
}

.slot {
  flex: 1;
  padding: $padding;
}

#id {
  color: gray;
  background-color: whitesmoke;
  font-size: 0.75em;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $padding;
  min-width: 16px;
  margin-right: $padding * 2;
}
</style> 