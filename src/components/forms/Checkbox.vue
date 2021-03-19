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
      <Row>
        <span v-if="label">{{ label }}</span>
        <CheckboxBlankOutline v-if="!value" />
        <CheckboxMarked v-if="value" />
      </Row>
    </label>
  </div>
</template>

<script>
import Row from "../layout/Row.vue";
import CheckboxBlankOutline from "vue-material-design-icons/CheckboxBlankOutline";
import CheckboxMarked from "vue-material-design-icons/CheckboxMarked";

export default {
  name: "Checkbox",
  components: {
    Row,
    CheckboxMarked,
    CheckboxBlankOutline,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
    },
    label: String,
  },
  methods: {
    input: function (event) {
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

  .material-design-icon {
    flex: 0;
  }
}

label {
  margin: 0;
  flex: 1;

  span {
    display: block;
  }
}
</style>
