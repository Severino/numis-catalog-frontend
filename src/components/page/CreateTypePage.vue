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
        <DataSelectField table="Mint" attribute="name" />
      </LabeledInputContainer>

      <LabeledInputContainer :label="$t('property.mint_as_on_coin')">
        <input />
      </LabeledInputContainer>
    </Row>
    <Row>
      <LabeledInputContainer :label="$tc('property.material')">
        <DataSelectField table="Material" attribute="name" />
      </LabeledInputContainer>
      <LabeledInputContainer :label="$tc('property.nominal')">
        <DataSelectField table="Nominal" attribute="name" />
      </LabeledInputContainer>
    </Row>
    <Row>
      <LabeledInputContainer :label="$t('property.mint_year')">
        <RestrictedInputField pattern="^-?[0-9x]{0,3}$" />
      </LabeledInputContainer>
    </Row>

    <Row>
      <LabeledInputContainer :label="$tc('property.donativ') + ' (?)'">
        <Checkbox id="donativ" v-model="donativ" />
      </LabeledInputContainer>

      <LabeledInputContainer :label="$tc('property.procedure')">
        <ButtonGroup
          id="production"
          :labels="productionLabels"
          :options="productionOptions"
          v-model="procedure"
        ></ButtonGroup>
      </LabeledInputContainer>
    </Row>

    <List v-on:add="addCoinMaster" :title="$t('property.coin_master')">
      <TitledPersonSelect
        v-for="coin_master in coinMasters"
        table="persons"
        attribute="name"
        :key="'mint-warden-id-' + coin_master.id"
      ></TitledPersonSelect>
    </List>

    <List
      v-on:add="addOberherr"
      :description="$t('info.overlords')"
      :title="$tc('property.overlord', 2)"
      class="overlords needs-spacing"
    >
      <p></p>
      <div v-if="oberherren.length == 0" class="info">
        {{ $t("warning.list_is_empty") }}
      </div>

      <ListItem
        v-for="(oberherr, index) of oberherren"
        :key="oberherr.id"
        v-on:remove="removeOberherr"
        :object="'oberherren-id-'+oberherr"
      >
        <div class="list-number">{{ index + 1 }}</div>
        <TitledPersonSelect />
      </ListItem>
    </List>

    <LabeledInputContainer :label="$tc('role.caliph')" >
      <DataSelectField table="person" text="${name} (${role})" />
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
        :key="'other-person-id-' + other.id"
        v-on:remove="removeOtherPerson"
        :object="other"
      >
        <DataSelectField table="person" text="${name} (${role})" query="{getPersonsWithRole{id,name, role}}" queryCommand="getPersonsWithRole" />
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
        <Checkbox id="cursive" :v-model="hasCursiveScript" />
      </LabeledInputContainer>

      <LabeledInputContainer :label="$tc('property.isolated_character', 2)">
        <input type="text" v-model="isolatedCharacters" />
      </LabeledInputContainer>
    </Row>

    <List :title="$tc('property.piece', 2)" @add="addPiece" class="pieces-list">
      <div v-if="pieces.length == 0" class="info">
        {{ $t("warning.list_is_empty") }}
      </div>
      <ListItem
        v-for="piece in pieces"
        :key="'pieces-' + piece.id"
        :object="piece"
      >
        <input type="text" name="" id="" />
      </ListItem>
    </List>

    <LabeledInputContainer :label="$t('property.literature')">
      <SimpleFormattedField v-model="literatureHTML" />
    </LabeledInputContainer>

    <Row>
      <button>{{ $t("form.cancel") }}</button>
      <button>{{ $t("form.submit") }}</button>
    </Row>
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
import SimpleFormattedField from "../forms/SimpleFormattedField.vue";

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
    SimpleFormattedField,
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
      procedure: "pressed",
      productionOptions: ["pressed", "cast"],
      front: {
        fieldText: "",
        umschriften: [],
      },
      back: {
        fieldText: "",
        umschriften: [],
      },
      isolatedCharacters: "",
      hasCursiveScript: false,
      donativ: false,
      oberherren: [],
      oberherrenId: 0,
      otherPersons: [],
      otherPersonsId: 0,
      coinMasters: [{ id: 0, name: "", titles: [], honorifics: [] }],
      coinMastersId: 1,
      pieces: [],
      piecesId: 0,
      literatureHTML: "",
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
    removeOberherr: function(item) {
      console.log(item);
      const idx = this.oberherren.indexOf(item);
      if (idx != -1) {
        this.oberherren.splice(idx, 1);
      }
    },
    removeOtherPerson: function(item) {
      console.log(item);
      const idx = this.otherPersons.indexOf(item);
      if (idx != -1) {
        this.otherPersons.splice(idx, 1);
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

.overlords .list-item .slot {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  .titled-person-select {
    flex: 1;
  }
}

.pieces-list {
  .list-container button {
    padding: 0 10px;
  }
  .slot {
    display: flex;
    input {
      flex: 1;
    }
  }
}

.list-number {
  padding: 5px;
  display: flex;
  align-items: center;
}
</style>
