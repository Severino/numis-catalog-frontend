<template>
  <div>
    <Heading>{{ $t("general.type_catalogue") }}</Heading>
    <Row>
      <LabeledInputContainer :label="$tc('properties.type_id')">
        <input />
      </LabeledInputContainer>

      <LabeledInputContainer label="Treadwell-Id">
        <input />
      </LabeledInputContainer>
    </Row>

    <Row>
      <LabeledInputContainer :label="$tc('properties.mint')">
        <DataSelectField table="Mint" attribute="name"></DataSelectField>
      </LabeledInputContainer>

      <LabeledInputContainer :label="$t('properties.mint_year')">
        <RestrictedInputField pattern="^-?[0-9x]{0,3}$" />
      </LabeledInputContainer>
    </Row>
    <Row>
      <LabeledInputContainer :label="$tc('properties.nominal')">
        <DataSelectField table="Nominal" attribute="name"></DataSelectField>
      </LabeledInputContainer>
      <LabeledInputContainer :label="$tc('properties.donativ')">
        <Checkbox id="donativ" />
      </LabeledInputContainer>
    </Row>

    <Row>
      <LabeledInputContainer :label="$tc('properties.material')">
        <DataSelectField table="Material" attribute="name"></DataSelectField>
      </LabeledInputContainer>

      <LabeledInputContainer :label="$tc('properties.procedures.cast')">
        <ButtonGroup
          id="production"
          :labels="productionLabels"
          :options="productionOptions"
        ></ButtonGroup>
      </LabeledInputContainer>
    </Row>

    <LabeledInputContainer :label="$t('properties.coin_master')">
      <DataSelectField table="MasterOfCoins" attribute="name"></DataSelectField>
    </LabeledInputContainer>

    <LabeledInputContainer :label="$tc('properties.overlord', 2)">
      <List v-on:add="addOberherr">
        <ListItem
          v-for="oberherr of oberherren"
          :key="oberherr.id"
          v-on:remove="removeOberherr"
          :object="oberherr"
        >
          <TitledPersonSelect />
        </ListItem>
      </List>
    </LabeledInputContainer>

    <LabeledInputContainer :label="$t('properties.caliph')">
      <TitledPersonSelect />
    </LabeledInputContainer>
    <LabeledInputContainer :label="$t('properties.additional_persons')">
    </LabeledInputContainer>

    <Section title="Voderseite">
      <Heading>{{ $t("properties.sides.front") }}</Heading>

      <List v-on:add="addOtherPerson">
        <ListItem
          v-for="other in otherPersons"
          :key="other.id"
          v-on:remove="removeOtherPerson"
          :object="other"
        >
          <RolePersonSelect role="other.role" person="other.person" />
        </ListItem>
      </List>

      <LabeledInputContainer :label="$tc('properties.circular_text')">
        <List v-on:add="addUmschrift">
          <ListItem
            v-for="umschrift of umschriften"
            :key="umschrift.id"
            v-on:remove="removeUmschrift"
            :object="umschrift"
          >
            <input
              type="text"
              name=""
              id=""
              dir="ltr"
              :value="umschrift.text"
            />
          </ListItem>
        </List>
      </LabeledInputContainer>
    </Section>
  </div>
</template>

<script>
import Heading from "@/components/Heading.vue";
import DataSelectField from "@/components/DataSelectField.vue";
import LabeledInputContainer from "@/components/LabeledInputContainer.vue";
import Row from "@/components/layout/Row.vue";
import RestrictedInputField from "../forms/RestrictedInputField.vue";
import Checkbox from "../forms/Checkbox.vue";
import ButtonGroup from "../forms/ButtonGroup.vue";
import List from "../forms/List.vue";
import ListItem from "../forms/ListItem.vue";
import TitledPersonSelect from "../TitledPersonSelect.vue";
import RolePersonSelect from "../forms/RolePersonSelect.vue";

export default {
  name: "CreateTypePage",
  components: {
    Heading,
    DataSelectField,
    LabeledInputContainer,
    Row,
    RestrictedInputField,
    Checkbox,
    ButtonGroup,
    List,
    ListItem,
    TitledPersonSelect,
    RolePersonSelect,
  },
  data: function () {
    return {
      productionLabels: [
        this.$t("procedures.pressed"),
        this.$t("procedures.cast"),
      ],
      productionOptions: ["pressed", "cast"],
      umschriften: [],
      umschriftId: 0,
      oberherren: [],
      oberherrenId: 0,
      otherPersons: [],
      otherPersonsId: 0,
    };
  },
  methods: {
    addUmschrift: function () {
      this.umschriften.push({
        id: this.umschriftId++,
        text: "",
      });
    },
    addOberherr: function () {
      this.oberherren.push({
        id: this.oberherrenId++,
        text: "",
      });
    },
    addOtherPerson: function () {
      this.otherPersons.push({
        id: this.otherPersonsId++,
        name: "",
        role: "",
      });
    },
    removeUmschrift: function (item) {
      console.log(item);
      const idx = this.$data.umschriften.indexOf(item);
      if (idx != -1) {
        this.oberherren.splice(idx, 1);
      }
    },
    removeOberherr: function (item) {
      console.log(item);
      const idx = this.$data.oberherren.indexOf(item);
      if (idx != -1) {
        this.oberherren.splice(idx, 1);
      }
    },
    removeOtherPerson: function (item) {
      console.log(item);
      const idx = this.$data.otherPersons.indexOf(item);
      if (idx != -1) {
        this.oberherren.splice(idx, 1);
      }
    },
  },
};
</script>

<style lang="scss">
h3,
label {
  text-transform: capitalize;
}
</style>
