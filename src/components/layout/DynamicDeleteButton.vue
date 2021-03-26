<template>
  <div
    id="delete"
    :class="active ? 'active' : 'inactive'"
    @click.stop="requestRemove"
  >
    <MinusCircle class="icon" />
    <span id="text">{{ $t("general.delete_submit") }}</span>
  </div>
</template>

<script>
import MinusCircle from "vue-material-design-icons/MinusCircle";
export default {
  components: {
    MinusCircle,
  },
  props: {
      time: {
          type: Number,
          default: 1500
      }
  },
  data: function () {
    return {
      active: false,
    };
  },
  methods: {
    requestRemove: function () {
      if (!this.active) {
        this.open();
      } else {
        this.$emit("click");
      }
    },
    open: function () {
      if (!this.removeTimeout) {
        this.active = true;
        this.removeTimeout = setTimeout(() => {
          this.active = false;
          this.removeTimeout = null;
        }, this.time);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";

#delete {
  background-color: gray;
  align-self: stretch;

  display: flex;
  align-items: center;
  color: $red;

  align-self: stretch;
  box-sizing: border-box;
  font-family: $sans-serif;
  font-size: $small-font;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  transition: background-color $long-transition-time;

  > * {
    color: white;
  }

  .icon {
    padding: 10px;
  }

  #text {
    text-align: center;
    width: 0px;
    opacity: 0;
    transition: all $long-transition-time;
    flex: 1;
  }

  &.active {
    background-color: $red;
    padding-left: $padding;
    padding-right: $padding;

    #text {
      opacity: 1;
      width: 130px;
    }
  }
}
</style>