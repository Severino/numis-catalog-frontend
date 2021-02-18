<template>
  <div class="coin-side-field">
    <Heading v-if="title">{{ title }}</Heading>
    <LabeledInputContainer :label="$tc('property.field_text')">
      <SimpleFormattedField />
    </LabeledInputContainer>
    <LabeledInputContainer :label="$t('property.inner_circular_text')">
      <input
        id="inner_circular"
        type="text"
        dir="rtl"
        v-model="innerInscript"
      />
    </LabeledInputContainer>

    <LabeledInputContainer  v-if="outerInscript" :label="$t('property.intermediate_circular_text')">
      <input
        id="intermediate_circular"
        type="text"
        dir="rtl"
        v-model="inBetweenInscript"
      />
    </LabeledInputContainer>

    <LabeledInputContainer v-if="innerInscript" :label="$t('property.outer_circular_text')">
      <input
        id="outer_circular"
        type="text"
        dir="rtl"
        v-model="outerInscript"
      />
    </LabeledInputContainer>

    <LabeledInputContainer :label="$t('property.border_and_misc')">
      <SimpleFormattedField :content="misc" />
    </LabeledInputContainer>
  </div>
</template>

<script>
import LabeledInputContainer from "../../LabeledInputContainer";

import Heading from "@/components/Heading.vue";
import SimpleFormattedField from "../SimpleFormattedField.vue";

export default {
  components: { LabeledInputContainer, Heading, SimpleFormattedField },
  name: "CoinSideField",
  props: {
    title: {
      type: String,
    },
    circularTexts: {
      type: Array,
      default: function () {
        return [];
      },
    },
    fieldText: {
      type: String,
    },
    innerInscript: {
      type: String,
    },
    inBetweenInscript: {
      type: String,
    },
    outerInscript: {
      type: String,
    },
    misc: {
      type: String,
    },
  },
  methods: {
    changed: function () {
      this.$emit("change", this.circularTexts);
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  font-size: 0.9rem;
}
ul.circular-list {
  list-style-type: none;
  padding-left: 0;

  li {
    margin: 0;
    position: relative;
    input {
      width: 100%;
    }
  }
}
</style>