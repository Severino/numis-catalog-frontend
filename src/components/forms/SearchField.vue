<template>
  <div class="search" :class="{ active }">
    <input
      type="search"
      name=""
      id=""
      :placeholder="$t('message.filter_list')"
      @input="filterChanged"
      :value="value"
    />
    <Magnify />
  </div>
</template>

<script>
import Magnify from "vue-material-design-icons/Magnify";
export default {
  components: {
    Magnify,
  },
  props: {
    value: String,
  },
  methods: {
    filterChanged(evt) {
      this.$emit("input", evt.target.value);
    },
  },
  computed: {
    active: function () {
      return this.value != "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";
.search {
  display: flex;
  position: relative;

  &.active {
    input {
      border-color: $primary-color;
      box-shadow: inset 0 0 5px $primary-color;
    }
    .material-design-icon {
      color: $primary-color;
    }
  }

  > input {
    box-sizing: border-box;
    flex: 1;
    border-radius: 25px;
    padding-left: 45px;

    transition: all 0.3s;
  }

  .material-design-icon {
    position: absolute;
    top: 7px;
    left: $padding;
    color: gray;
    pointer-events: none;
    transition: all 0.3s;
  }
}
</style>