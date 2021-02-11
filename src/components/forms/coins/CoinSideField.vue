<template>
  <div class="coin-side-field">
    <Heading v-if="title">{{ title }}</Heading>
    <LabeledInputContainer :label="$tc('property.field_text')">
      <SimpleFormattedField />
    </LabeledInputContainer>
    <LabeledInputContainer>
      <List :title="$tc('property.circular_text')" @add="addUmschrift">
        <div v-if="circularTexts.length == 0" class="info">
          {{ $t("warning.list_is_empty") }}
        </div>
        <ListItem
          v-for="umschrift of circularTexts"
          :key="umschrift.id"
          v-on:remove="removeUmschrift"
          :object="umschrift"
        >
          <input type="text" name="" id="" dir="ltr" :value="umschrift.text" />
        </ListItem>
      </List>
    </LabeledInputContainer>
  </div>
</template>

<script>
import LabeledInputContainer from "../../LabeledInputContainer";

import ListItem from "../ListItem.vue";
import Heading from "@/components/Heading.vue";
import List from "../List.vue";
import SimpleFormattedField from '../SimpleFormattedField.vue';

export default {
  components: { ListItem, LabeledInputContainer, Heading, List, SimpleFormattedField },
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