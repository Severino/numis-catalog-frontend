<template>
  <Row class="button-group" :id="id">
    <Row
      v-for="(option, idx) in options"
      v-bind:key="option"
      class="radio-button"
    >
      <input type="radio" :name="id" :id="option" />
      <label :for="option" tabindex="0"
        ><span>{{ labels[idx] }}</span></label
      >
    </Row>
  </Row>
</template>


<script>
import Row from "../layout/Row.vue";
export default {
  components: { Row },
  name: "ButtonGroup",
  props: {
    id: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/scss/_import.scss";

.select {
  height: 37px;
}

label {
  margin: 0;
  font-size: 1rem;
  text-align: center;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0 !important;
  box-sizing: border-box;
}

input {
  display: none;
}

input:checked + label {
  background-color: $primary-color;

  color: $white;
  border-color: $white;
}

label {
  @include input;
}

.radio-button {
  align-items: stretch;
  margin-right: 0 !important;

  &:first-of-type {
    label {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
  }

  &:last-of-type {
    label {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style> 

