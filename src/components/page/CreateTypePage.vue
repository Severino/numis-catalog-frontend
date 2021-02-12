<template>
  <div class="types-page">
    <BackHeader />
    <Heading>{{ $t("general.type_catalogue") }}</Heading>
    <Row>
      <LabeledInputContainer :label="$tc('property.type_id')">
        <input />
      </LabeledInputContainer>

      <LabeledInputContainer :label="$tc('property.treadwell_id')">
        <input />
      </LabeledInputContainer>
    </Row>

    <Row>
      <LabeledInputContainer :label="$tc('property.mint')">
        <DataSelectField table="Mint" attribute="name"></DataSelectField>
      </LabeledInputContainer>

      <LabeledInputContainer :label="$t('property.mint_as_on_coin')">
        <input />
      </LabeledInputContainer>
    </Row>
    <Row>
      <LabeledInputContainer :label="$tc('property.material')">
        <DataSelectField table="Material" attribute="name"></DataSelectField>
      </LabeledInputContainer>
      <LabeledInputContainer :label="$tc('property.nominal')">
        <DataSelectField table="Nominal" attribute="name"></DataSelectField>
      </LabeledInputContainer>
    </Row>
    <Row>
      <LabeledInputContainer :label="$t('property.mint_year')">
        <RestrictedInputField pattern="^-?[0-9x]{0,3}$" />
      </LabeledInputContainer>
    </Row>

    <Row>
      <LabeledInputContainer :label="$tc('property.donativ') + ' (?)'">
        <Checkbox id="donativ" v-model="value"  />
      </LabeledInputContainer>

      <LabeledInputContainer :label="$tc('property.procedure')">
        <ButtonGroup
          id="production"
          :labels="productionLabels"
          :options="productionOptions"
          :selected="0"
        ></ButtonGroup>
      </LabeledInputContainer>
    </Row>

    <List v-on:add="addCoinMaster" :title="$t('property.coin_master')">
      <TitledPersonSelect
        v-for="coin_master in coinMasters"
        table="MasterOfCoins"
        attribute="name"
        :key="coin_master.id"
      ></TitledPersonSelect>
    </List>

    <List
      v-on:add="addOberherr"
      :title="$tc('property.overlord', 2)"
      class="needs-spacing"
    >
      <div v-if="oberherren.length == 0" class="info">
        {{ $t("warning.list_is_empty") }}
      </div>

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
      <data-select-field />
    </LabeledInputContainer>
    <List
      :title="$t('property.additional_persons')"
      class="needs-spacing"
      v-on:add="addOtherPerson"
    >
      <div v-if="oberherren.length == 0" class="info">
        {{ $t("warning.list_is_empty") }}
      </div>

      <ListItem
        v-for="other in otherPersons"
        :key="other.id"
        v-on:remove="removeOtherPerson"
        :object="other"
      >
        <DataSelectField table="person" attribute="name" />
      </ListItem>
    </List>

    <Section title="Voderseite">
      <CoinSideField
        :title="$t('property.sides.front')"
        :field="front.fieldText"
        :umschriften="front.umschriften"
        @change="frontChanged"
      />
    </Section>

    <Section title="Rückseite">
      <CoinSideField
        :title="$t('property.sides.back')"
        :field="back.fieldText"
        :umschriften="back.umschriften"
        @change="backChanged"
      />
    </Section>

    <Row>
      <LabeledInputContainer :label="$t('property.cursive_script') + ' (?)'">
        <Checkbox :checked="hasCursiveScript" @input="cursiveChanged" />
      </LabeledInputContainer>

      <LabeledInputContainer :label="$tc('property.isolated_character', 2)">
        <input type="text" v-model="isolatedCharacater" />
      </LabeledInputContainer>
    </Row>

    <List :title="$tc('property.piece', 2)" @add="addPiece">
      <ListItem v-for="piece in pieces" :key="'pieces-' + piece.id">
        <input type="text" name="" id="" />
      </ListItem>
    </List>

    <LabeledInputContainer />
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
import CoinSideField from "../forms/coins/CoinSideField.vue";
import BackHeader from "../layout/BackHeader.vue";

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
    CoinSideField,
    BackHeader,
  },
  computed: {
    productionLabels: function() {
      return [
        this.$t("property.procedures.pressed"),
        this.$t("property.procedures.cast"),
      ];
    },
  },
  data: function() {
    return {
      productionOptions: ["pressed", "cast"],
      front: {
        fieldText: "",
        umschriften: [],
      },
      back: {
        fieldText: "",
        umschriften: [],
      },
      isolierteBuchstaben: "",
      cursiveScript: false,
      donativ: false,
      oberherren: [],
      oberherrenId: 0,
      otherPersons: [],
      otherPersonsId: 0,
      coinMasters: [{ id: 0, name: "", titles: [], honorifics: [] }],
      coinMastersId: 1,
      pieces: [],
      piecesId: 0,
      literatureText: "",
    };
  },
  methods: {
    frontChanged: function(coinSideObject) {
      this.front = coinSideObject;
    },
    backChanged: function(coinSideObject) {
      this.back = coinSideObject;
    },
    cursiveChanged: function(value) {
      console.log(value)
      this.hasCursiveScript = value;
    },
    addPiece: function() {
      this.pieces.push({
        id: this.piecesId++,
        text: "",
      });
    },
    addCoinMaster: function() {
      this.coinMasters.push({
        id: this.coinMastersId++,
        text: "",
      });
    },
    addUmschrift: function() {
      this.umschriften.push({
        id: this.umschriftId++,
        text: "",
      });
    },
    addOberherr: function() {
      this.oberherren.push({
        id: this.oberherrenId++,
        text: "",
      });
    },
    addOtherPerson: function() {
      this.otherPersons.push({
        id: this.otherPersonsId++,
        name: "",
        role: "",
      });
    },
    removeUmschrift: function(item) {
      console.log(item);
      const idx = this.$data.umschriften.indexOf(item);
      if (idx != -1) {
        this.oberherren.splice(idx, 1);
      }
    },
    removeOberherr: function(item) {
      console.log(item);
      const idx = this.$data.oberherren.indexOf(item);
      if (idx != -1) {
        this.oberherren.splice(idx, 1);
      }
    },
    removeOtherPerson: function(item) {
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

  > h3 {
    font-size: 2rem;
    font-weight: bold;
  }
}

.needs-spacing {
  margin: $padding 0;
}
</style>
