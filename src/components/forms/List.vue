<template>
  <div class="list">
    <div class="wrapper" >
      <Row class="title-row">
        <label v-if="title" class="title"
          >{{ title }} {{ length !== null ? `(${length})` : "" }}</label
        >
        <button @click.stop.prevent="addEntry">+</button>
      </Row>
    </div>

    <p v-if="description" class="description">{{ description }}</p>
    <div class="list-container">
      <slot />
    </div>
    <button @click.stop.prevent="addEntry">+</button>
  </div>
</template>

<script>
import Row from "../layout/Row.vue";
export default {
  components: { Row },
  name: "List",
  props: {
    title: String,
    description: String,
    length: { type: Number, default: null },
  },
  data: function () {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    addEntry: function () {
      this.$emit("add");
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_import.scss";
.list-container {
  box-sizing: border-box;

  $left: 19px;
  padding-left: $left * 2;
  position: relative;

  &.collapsed {
    display: none;
  }

  > * {
    margin-bottom: $padding/2;
  }

  &:not(:empty) {
    &::before {
      content: "";
      position: absolute;
      $size: 10px;
      width: $size;
      height: $size;
      background-color: $gray;
      left: $left;
      top: 0;
      transform: translate(-50%);
    }

    &::after {
      height: 50%;
      content: "";
      position: absolute;
      top: 0;
      border-left: 2px solid $gray;
      height: 100%;
      left: $left;
      transform: translateX(-50%);
    }
  }

  .list-item {
    position: relative;
  }

  // .list-item:after {
  //   position: absolute;

  //   content: "";
  //   border-bottom: 2px solid $gray;
  //   width: $left + 1px;
  //   left: 0;
  //   top: calc(50% - 1px);
  //   transform: translateX(-100%);
  // }
}

.description {
  font-size: 0.75rem;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/scss/_import.scss";

.list {
  position: relative;
  display: flex;
  flex-direction: column;
}

.list.collapsible .title-row {
  border: 1px solid gray;
  padding: 0 10px;
}

.list-container {
  width: 100%;

  &:not(:empty) {
    margin-top: $padding;
  }
}

.title {
  text-transform: capitalize;
}

  button{
    max-width: 38px;
    width: 38px;
    height: 38px;
  }

.title-row {
  align-items: baseline;


  > * :first-child {
    flex: 1;
  }
}
</style> 