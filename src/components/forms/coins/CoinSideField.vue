<template>
  <div class="coin-side-field">
    <Heading v-if="title">{{ title }}</Heading>
    <LabeledInputContainer :label="prefix + $tc('property.field_text')">
      <SimpleFormattedField ref="fieldTextField" />
    </LabeledInputContainer>

    <LabeledInputContainer :label="prefix + $t('property.inner_circular_text')">
      <SimpleFormattedField ref="innerInscriptField" />
    </LabeledInputContainer>

    <LabeledInputContainer
      :label="prefix + $t('property.intermediate_circular_text')"
    >
      <SimpleFormattedField ref="intermediateInscriptField" />
    </LabeledInputContainer>

    <LabeledInputContainer :label="prefix + $t('property.outer_circular_text')">
      <SimpleFormattedField ref="outerInscriptField" />
    </LabeledInputContainer>

    <LabeledInputContainer :label="prefix + $t('property.border_and_misc')">
      <SimpleFormattedField ref="miscField" />
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
  data: function () {
    return {};
  },
  props: {
    title: {
      type: String,
    },
    prefix: {
      type: String,
      default: "",
    },
  },
  methods: {
    setFieldContent({
      fieldText = "",
      innerInscript = "",
      intermediateInscript = "",
      outerInscript = "",
      misc = "",
    } = {}) {
      function centerWhenEmpty(text) {
        return text || "<div style='text-align: center;'><br></div>";
      }

      this.$refs.fieldTextField.setContent(centerWhenEmpty(fieldText));
      this.$refs.innerInscriptField.setContent(centerWhenEmpty(innerInscript));
      this.$refs.intermediateInscriptField.setContent(
        centerWhenEmpty(intermediateInscript)
      );
      this.$refs.outerInscriptField.setContent(centerWhenEmpty(outerInscript));
      this.$refs.miscField.setContent(centerWhenEmpty(misc));
    },
    getFieldContent() {
      return {
        fieldText: this.$refs.fieldTextField.getContent(),
        innerInscript: this.$refs.innerInscriptField.getContent(),
        intermediateInscript: this.$refs.intermediateInscriptField.getContent(),
        outerInscript: this.$refs.outerInscriptField.getContent(),
        misc: this.$refs.miscField.getContent(),
      };
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

.inscript {
  text-align: center;
}
</style>
