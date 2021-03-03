<template>
  <div class="coin-side-field">
    <Heading v-if="title">{{ title }}</Heading>
    <LabeledInputContainer :label="$tc('property.field_text')">
      <SimpleFormattedField
        ref="fieldTextField"
      />
    </LabeledInputContainer>
    <LabeledInputContainer :label="$t('property.inner_circular_text')">
      <input class="inscript" type="text" v-model="value.innerInscript" />
    </LabeledInputContainer>

    <LabeledInputContainer
      v-if="value.outerInscript || value.intermediateInscript"
      :label="$t('property.intermediate_circular_text')"
    >
      <input
        class="inscript"
        type="text"
        v-model="value.intermediateInscript"
      />
    </LabeledInputContainer>

    <LabeledInputContainer
      v-if="value.innerInscript || value.outerInscript"
      :label="$t('property.outer_circular_text')"
    >
      <input class="inscript" type="text" v-model="value.outerInscript" />
    </LabeledInputContainer>

    <LabeledInputContainer :label="$t('property.border_and_misc')">
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
  props: {
    title: {
      type: String,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setFieldContent({ fieldText = "", misc = "" } = {}) {
      this.$refs.fieldTextField.setContent(fieldText);
      this.$refs.miscField.setContent(misc);
    },
    getFieldContent() {
      return {
        fieldText: this.$refs.fieldTextField.getContent(),
        misc: this.$refs.miscField.getContent(),
      };
    },
    changed: function ({
      innerInscript = this.innerInscript,
      outerInscript = this.outerInscript,
      intermediateInscript = this.intermediateInscript,
    } = {}) {
      this.$emit("change", {
        innerInscript,
        outerInscript,
        intermediateInscript,
      });
    },
    innerInscriptChanged: function (event) {
      const innerInscript = event.target.value;
      this.changed({ innerInscript });
    },
    intermediateInscriptChanged: function (event) {
      const intermediateInscript = event.target.value;
      this.changed({ intermediateInscript });
    },
    outerInscriptChanged: function (event) {
      const outerInscript = event.target.value;
      this.changed({ outerInscript });
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