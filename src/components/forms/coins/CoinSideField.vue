<template>
  <div class="coin-side-field">
    <Heading v-if="title">{{ title }}</Heading>
    <LabeledInputContainer :label="prefix+$tc('property.field_text')">
      <SimpleFormattedField ref="fieldTextField" />
    </LabeledInputContainer>
    <LabeledInputContainer :label="prefix+$t('property.inner_circular_text')">
      <input class="inscript" type="text" v-model="value.innerInscript" />
    </LabeledInputContainer>

    <LabeledInputContainer
      v-if="value.outerInscript || value.intermediateInscript"
      :label="prefix+$t('property.intermediate_circular_text')"
    >
      <input
        class="inscript"
        type="text"
        v-model="value.intermediateInscript"
      />
    </LabeledInputContainer>

    <LabeledInputContainer
      v-if="value.innerInscript || value.outerInscript"
      :label="prefix+$t('property.outer_circular_text')"
    >
      <input class="inscript" type="text" v-model="value.outerInscript" />
    </LabeledInputContainer>

    <LabeledInputContainer :label="prefix+$t('property.border_and_misc')">
      <input class="inscript" type="text" v-model="value.misc" />
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
    prefix: {
      type: String,
      default:""
    }
  },
  methods: {
    setFieldContent({ fieldText = "", misc = "" } = {}) {
      const content = fieldText || "<div style='text-align: center;'>a</div>"
      this.$refs.fieldTextField.setContent(content);
      console.log(content)
    },
    getFieldContent() {
      return {
        fieldText: this.$refs.fieldTextField.getContent(),
      };
    },
    changed: function({
      innerInscript = this.innerInscript,
      outerInscript = this.outerInscript,
      intermediateInscript = this.intermediateInscript,
      misc = this.misc,
    } = {}) {
      console.log({
        innerInscript,
        outerInscript,
        intermediateInscript,
        misc,
      });
      this.$emit("change", {
        innerInscript,
        outerInscript,
        intermediateInscript,
        misc,
      });
    },
    innerInscriptChanged: function(event) {
      const innerInscript = event.target.value;
      this.changed({ innerInscript });
    },
    intermediateInscriptChanged: function(event) {
      const intermediateInscript = event.target.value;
      this.changed({ intermediateInscript });
    },
    outerInscriptChanged: function(event) {
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
