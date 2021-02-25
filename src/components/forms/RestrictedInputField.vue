<template>
  <div class="restricted-input">
    <input type="text" :value="value" @input="validateInput" />
    <div class="empty">
      <Info
        :trigger="trigger"
        :time="3000"
        type="warning"
        class="info"
        message="Es sind nur Werte zwischen -999 und 999 erlaubt. Es kann auch 'x' angegeben werden."
      />
    </div>
  </div>
</template>

<script>
import Info from "./Info.vue";
export default {
  components: { Info },
  name: "RestrictedInputField",
  props: {
    value: String,
    pattern: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      oldValue: "",
      trigger: 0,
    };
  },
  methods: {
    validateInput: function (event) {
      if (!event.target.value.match(new RegExp(this.$props.pattern))) {
        this.$data.trigger++;
        event.target.value = this.$data.oldValue;
      } else {
        this.$data.oldValue = event.target.value;
        this.$emit("input", event.target.value)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";

.restricted-input {
  position: relative;
  display: flex;
  flex-direction: column;
}

.info {
  position: absolute;
}
</style>
