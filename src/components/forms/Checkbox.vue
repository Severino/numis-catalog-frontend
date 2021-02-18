<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :name="id"
      :id="id"
      :checked="value"
      @input="input"
    />
    <label :for="id" tabindex="0">
      <span>{{ text }}</span></label
    >
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean
    }
  },
  computed: {
    text: function() {
      return this.value === true? this.$t("general.yes") : this.$t("general.no");
    },
  },
  methods: {
    input: function(event) {
      const checked = event.target.checked;
      this.$emit("input", checked);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";

input {
  display: none;
}

.checkbox {
  display: flex;
}

input:checked + label {
  background-color: $primary-color;
  color: $white;
  border-color: $white;
}

label {
  margin: 0;
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: $border-radius;

  span {
    display: block;
  }

  @include interactive();
  @include input();
}
</style>
