<template>
  <div id="app">
    <Heading>Typenkatalog</Heading>
    <Row>
      <LabeledInputContainer label="Typennummer">
        <input />
      </LabeledInputContainer>

      <LabeledInputContainer label="Treadwell-Id">
        <input />
      </LabeledInputContainer>
    </Row>

    <Row>
      <LabeledInputContainer label="Prägeort">
        <DataSelectField table="Mint" attribute="name"></DataSelectField>
      </LabeledInputContainer>

      <LabeledInputContainer label="Prägejahr">
        <RestrictedInputField pattern="^-?[0-9x]{0,3}$" />
      </LabeledInputContainer>
    </Row>
    <Row>
      <LabeledInputContainer label="Nominal">
        <DataSelectField table="Nominal" attribute="name"></DataSelectField>
      </LabeledInputContainer>
      <LabeledInputContainer label="Donativ">
        <Checkbox id="donativ" />
      </LabeledInputContainer>
    </Row>

    <Row>
      <LabeledInputContainer label="Material">
        <DataSelectField table="Material" attribute="name"></DataSelectField>
      </LabeledInputContainer>

      <LabeledInputContainer label="Herstellung">
        <button-group
          id="production"
          :labels="productionLabels"
          :options="productionOptions"
        ></button-group>
      </LabeledInputContainer>
    </Row>

    <LabeledInputContainer label="Münzherr">
      <DataSelectField table="MasterOfCoins" attribute="name"></DataSelectField>
    </LabeledInputContainer>

    <LabeledInputContainer label="Oberherren">
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

    <LabeledInputContainer label="Kalif">
      <TitledPersonSelect />
    </LabeledInputContainer>
    <LabeledInputContainer label="Weitere Personen"> </LabeledInputContainer>

    <Section title="Voderseite"> </Section>
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
    <Section title="Rückseite">
      <CoinField> </CoinField>

      <LabeledInputContainer label="Umschrift">
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
import CoinField from "../forms/CoinField.vue";
import TitledPersonSelect from "../TitledPersonSelect.vue";
import RolePersonSelect from "../forms/RolePersonSelect.vue";

export default {
  name: "CreateCoinPage",
  components: {
    Heading,
    DataSelectField,
    LabeledInputContainer,
    Row,
    // TitledPersonSelect,
    // TitledPersonList,
    RestrictedInputField,
    Checkbox,
    ButtonGroup,
    List,
    ListItem,
    CoinField,
    TitledPersonSelect,
    RolePersonSelect,
  },
  data: function () {
    return {
      productionLabels: ["Gepresst", "Gegossen"],
      productionOptions: ["gepresset", "gegossen"],
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
      console.log("ADD UMSCHRIFT");
      this.umschriften.push({
        id: this.umschriftId++,
        text: "",
      });
    },
    addOberherr: function () {
      console.log("ADD UMSCHRIFT");
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
</style>
