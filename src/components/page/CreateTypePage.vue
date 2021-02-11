<template>
  <div class="types-page">
    <Heading>{{ $t("general.type_catalogue") }}</Heading>
    <Row>
      <LabeledInputContainer :label="$tc('property.type_id')">
        <input />
      </LabeledInputContainer>

      <LabeledInputContainer label="Treadwell-Id">
        <input />
      </LabeledInputContainer>
    </Row>

    <Row>
      <LabeledInputContainer :label="$tc('property.mint')">
        <DataSelectField table="Mint" attribute="name"></DataSelectField>
      </LabeledInputContainer>

      <LabeledInputContainer :label="$t('property.mint_year')">
        <RestrictedInputField pattern="^-?[0-9x]{0,3}$" />
      </LabeledInputContainer>
    </Row>
    <Row>
      <LabeledInputContainer :label="$tc('property.nominal')">
        <DataSelectField table="Nominal" attribute="name"></DataSelectField>
      </LabeledInputContainer>
      <LabeledInputContainer :label="$tc('property.donativ')">
        <Checkbox id="donativ" />
      </LabeledInputContainer>
    </Row>

    <Row>
      <LabeledInputContainer :label="$tc('property.material')">
        <DataSelectField table="Material" attribute="name"></DataSelectField>
      </LabeledInputContainer>

      <LabeledInputContainer :label="$tc('property.procedures.cast')">
        <ButtonGroup
          id="production"
          :labels="productionLabels"
          :options="productionOptions"
        ></ButtonGroup>
      </LabeledInputContainer>
    </Row>

    <LabeledInputContainer :label="$t('property.coin_master')">
      <DataSelectField table="MasterOfCoins" attribute="name"></DataSelectField>
    </LabeledInputContainer>

    <List v-on:add="addOberherr" :title="$tc('property.overlord', 2)" class="needs-spacing">
      <ListItem
        v-for="oberherr of oberherren"
        :key="oberherr.id"
        v-on:remove="removeOberherr"
        :object="oberherr"
      >
        <TitledPersonSelect />
      </ListItem>
    </List>

    <LabeledInputContainer :label="$t('property.caliph')">
      <TitledPersonSelect />
    </LabeledInputContainer>
    <List :title="$t('property.additional_persons')" class="needs-spacing" v-on:add="addOtherPerson">
      <ListItem
        v-for="other in otherPersons"
        :key="other.id"
        v-on:remove="removeOtherPerson"
        :object="other"
      >
        <DataSelectField />
      </ListItem>
    </List>

    <Section title="Voderseite">
      <Heading>{{ $t("property.sides.front") }}</Heading>

      <LabeledInputContainer :label="$tc('property.field_text')">
        <Row style="margin-bottom: 10px;">
          <button>Left</button>
          <button>Center</button>
          <button>Right</button>
          <span style="margin-right: 50px; "></span>
          <button>Bold</button>
          <button>Cursive</button>
        </Row>
        <textarea name="" id="" cols="30" rows="10">
          
        </textarea>
      </LabeledInputContainer>

      <LabeledInputContainer :label="$tc('property.circular_text')">
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

    
    <Section title="Rückseite">
      <Heading>{{ $t("property.sides.back") }}</Heading>

      <LabeledInputContainer :label="$tc('property.field_text')">
        <Row style="margin-bottom: 10px;">
          <button>Left</button>
          <button>Center</button>
          <button>Right</button>
          <span style="margin-right: 50px; "></span>
          <button>Bold</button>
          <button>Cursive</button>
        </Row>
        <textarea name="" id="" cols="30" rows="10">
          
        </textarea>
      </LabeledInputContainer>

      <LabeledInputContainer :label="$tc('property.circular_text')">
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
import DataSelectField from "@/components/forms/DataSelectField.vue";
import LabeledInputContainer from "@/components/LabeledInputContainer.vue";
import Row from "@/components/layout/Row.vue";
import RestrictedInputField from "../forms/RestrictedInputField.vue";
import Checkbox from "../forms/Checkbox.vue";
import ButtonGroup from "../forms/ButtonGroup.vue";
import List from "../forms/List.vue";
import ListItem from "../forms/ListItem.vue";
import TitledPersonSelect from "../forms/TitledPersonSelect.vue";

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
  },
  data: function () {
    return {
      productionLabels: [
        this.$t("property.procedures.pressed"),
        this.$t("property.procedures.cast"),
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


@import "@/scss/_import.scss";

h3,
label {
  text-transform: capitalize;
}

.types-page {
  margin-bottom: 50vh;
}

.needs-spacing{
  margin: $padding 0;
}
</style>
