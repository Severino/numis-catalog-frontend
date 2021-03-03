<template>
  <div class="list-item">
    <div class="slot">
      <slot></slot>
    </div>
    <button :class="removing ? 'removing' : ''" @click="triggerRemove">
      <Minus />
    </button>
  </div>
</template>

<script>
import Minus from "vue-material-design-icons/Minus";

export default {
  components: {
    Minus,
  },
  name: "Section",
  props: {
    object: {
      default: null,
      required: true,
    },
  },
  data: function () {
    return {
      removing: false,
    };
  },
  methods: {
    triggerRemove: function () {
      if (this.removing) {
        this.$emit("remove", this.$props.object);
      } else {
        this.removing = true;
        setTimeout(() => {
          this.removing = false;
        }, 1000);
      }
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
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  $size: 38px;
  width: $size;
  height: $size;
  border-color: #cccccc;

  transition: background-color 0.2s;

 .material-design-icon {
    margin-top: 4px;
  }
 
  background-color: #bdbdbd;

  &.removing {
    background-color: rgb(231, 106, 106);
    &:focus {
      border-color: rgb(189, 81, 81);
    }
  }
}

#slot {
  flex: 1;
}
</style> 