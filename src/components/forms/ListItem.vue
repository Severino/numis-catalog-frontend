<template>
  <div class="list-item">
    <div class="slot">
      <slot></slot>
    </div>
    <button @click="triggerRemove">
      <MinusCircle />
    </button>
  </div>
</template>

<script>
import MinusCircle from "vue-material-design-icons/MinusCircle";

export default {
  components: {
    MinusCircle,
  },
  name: "Section",
  props: {
    object: {
      default: null,
      required: true,
    },
  },
  methods: {
    triggerRemove: function () {
      this.$emit("remove", this.$props.object);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/scss/_import.scss";

.list-item {
  display: flex;
  align-items: center;
  margin-bottom: $padding;
}

.list-item > :first-child {
  flex: 1;
  // margin-right: 10px;
}

button {
  align-self: stretch;
  color: whitesmoke;
  background-color: rgb(231, 106, 106);
  &:focus {
    border-color: rgb(189, 81, 81);
  }
}

#slot {
  flex: 1;
}
</style> 