<template>
  <div class="list-item" @click="click">
    <span id="id">{{ id }}</span>
    <div class="slot">
      <slot></slot>
    </div>
    <button @click.stop="triggerRemove">
      <Remove />
    </button>
  </div>
</template>

<script>
import Remove from "vue-material-design-icons/Minus";

export default {
  components: {
    Remove,
  },
  name: "ListItem",
  props: {
    id: {
      required: true,
    },
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

button {
    padding:0;
    min-width: 16px;
    align-self: stretch;
    color: whitesmoke;
    background-color: rgb(231, 106, 106);
    &:focus {
        border-color: rgb(189, 81, 81);
    }
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