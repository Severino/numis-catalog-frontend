<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :name="id"
      :id="id"
      :checked="checked"
      @input="checked = $event.target.checked"
    />
    <label :for="id"
      ><span>{{ text }}</span></label
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
  },
  data: function () {
    return { checked: false };
  },
  computed: {
    text: function () {
      return this.$data.checked ? "Ja" : "Nein";
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

  span {
    display: block;
  }

  @include interactive();
  @include input();
}
</style>
