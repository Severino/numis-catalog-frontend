<template>
  <div class="coin-side-field">
    <Heading v-if="title">{{ title }}</Heading>
    <LabeledInputContainer :label="$tc('property.field_text')">
      <SimpleFormattedField />
    </LabeledInputContainer>
    <LabeledInputContainer :label="$tc('property.circular_text')">
      <ul class="circular-list">
        <li>
          <label for="inner_circular"
            >{{ $t("property.inner_circular_text") }}
          </label>
          <input
            id="inner_circular"
            type="text"
            dir="rtl"
            v-model="innerInscript"
          />
        </li>
        <li>
          <label for="intermediate_circular"
            >{{ $t("property.intermediate_circular_text") }}
          </label>
          <input
            id="intermediate_circular"
            type="text"
            dir="rtl"
            v-model="inBetweenInscript"
          />
        </li>
        <li>
          <label for="outer_circular"
            >{{ $t("property.outer_circular_text") }}
          </label>
          <input
            id="outer_circular"
            type="text"
            dir="rtl"
            v-model="outerInscript"
          />
        </li>
      </ul>
    </LabeledInputContainer>

    <LabeledInputContainer :label="$t('property.border_and_misc')">
      <SimpleFormattedField  :content="misc" />
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
    addUmschrift: function () {
      let nextId = 0;
      const umschriften = this.circularTexts;
      umschriften.forEach((umschrift) => {
        if (umschrift.id >= nextId) nextId = umschrift.id + 1;
      });
      console.log(nextId);
      umschriften.push({ id: nextId, text: "" });
    },
    removeUmschrift: function (umschrift) {
      const umschriften = this.circularTexts;
      const indx = umschriften.findIndex((val) => val.id == umschrift.id);
      if (indx != -1) {
        umschriften.splice(indx, 1);
        this.changed();
      }
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