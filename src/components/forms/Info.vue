<template>
  <div :class="'info ' + type" :hidden="hidden">
    <p>
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info",
      validator: (value) => {
        return ["info", "error", "warning"].indexOf(value) != -1;
      },
    },
    trigger: {
      default: 0,
      type: Number,
    },
    time: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      hidden: true,
    };
  },
  watch: {
    trigger: function () {
      this.show();
    },
  },
  methods: {
    show: function () {
      this.$data.hidden = false;

      if (this.$props.time > 0) {
        setTimeout(this.hide, this.$props.time);
      }
    },
    hide: function () {
      this.$data.hidden = true;
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_import.scss";

.info {
  color: white;
  background-color: gray;
  padding: $padding 2 * $padding;
  width: 100%;
  font-size: $small-font;
  box-sizing: border-box;
}

.warning {
  background-color: $yellow;
}

.error {
  background-color: $red;
}
</style>
