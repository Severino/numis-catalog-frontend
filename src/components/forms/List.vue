<template>
  <div class="list">
    <Row class="title-row">
      <div v-if="title" class="title">{{ title }}</div>
      <button @click="addEntry">+</button>
    </Row>
    <div class="list-container">
      <slot />
    </div>
  </div>
</template>

<script>
import Row from "../layout/Row.vue";
export default {
  components: { Row },
  name: "List",
  props: {
    title: String,
  },
  methods: {
    addEntry: function () {
      console.log("ADD ENTRY");
      this.$emit("add");
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_import.scss";
.list-container {
  box-sizing: border-box;

  $left: 15px;
  padding-left: $left * 2;
  position: relative;

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

  .list-item:after {
    position: absolute;

    content: "";
    border-bottom: 2px solid $gray;
    width: $left + 1px;
    left: 0;
    top: calc(50% - 1px);
    transform: translateX(-100%);
  }
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

.list-container {
  width: 100%;

  &:not(:empty) {
    margin-top: $padding;
  }
}

.title {
  text-transform: capitalize;
}

.title-row {
  align-items: center;

  button:not(:first-child) {
    max-width: 37px;
  }

  > * :first-child {
    flex: 1;
  }
}
</style> 