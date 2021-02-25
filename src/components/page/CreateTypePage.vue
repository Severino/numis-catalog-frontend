<template>
  <form class="types-page" @submit.prevent="">
    <div v-if="coin.id" class="error">UPDATE IS NOT SUPPORTED YET</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <Heading>{{ $t("general.type_catalogue") }}</Heading>
    <LoadingSpinner v-if="loading" />
    <div v-if="!loading" class="loading-area">
      <input :value="coin.id" type="text" readonly />
      <Row>
        <LabeledInputContainer :label="$tc('property.type_id')">
          <input v-model="coin.projectId" />
        </LabeledInputContainer>

        <LabeledInputContainer :label="$tc('property.treadwell_id')">
          <input v-model="coin.treadwellId" />
        </LabeledInputContainer>
      </Row>

      <Row>
        <LabeledInputContainer :label="$tc('property.mint')">
          <DataSelectField table="Mint" attribute="name" v-model="coin.mint" />
        </LabeledInputContainer>

        <LabeledInputContainer :label="$t('property.mint_as_on_coin')">
          <input v-model="coin.mintAsOnCoin" />
        </LabeledInputContainer>
      </Row>
      <Row>
        <LabeledInputContainer :label="$tc('property.material')">
          <DataSelectField
            v-model="coin.material"
            table="Material"
            attribute="name"
          />
        </LabeledInputContainer>
        <LabeledInputContainer :label="$tc('property.nominal')">
          <DataSelectField
            v-model="coin.nominal"
            table="Nominal"
            attribute="name"
          />
        </LabeledInputContainer>
      </Row>
      <Row>
        <LabeledInputContainer :label="$t('property.mint_year')">
          <RestrictedInputField
            v-model="coin.yearOfMinting"
            pattern="^-?[0-9x]{0,3}$"
          />
        </LabeledInputContainer>
      </Row>

      <Row>
        <LabeledInputContainer :label="$tc('property.donativ') + ' (?)'">
          <Checkbox id="donativ" v-model="coin.donativ" />
        </LabeledInputContainer>

        <LabeledInputContainer :label="$tc('property.procedure')">
          <ButtonGroup
            id="production"
            :labels="productionLabels"
            :options="productionOptions"
            v-model="coin.procedure"
          ></ButtonGroup>
        </LabeledInputContainer>
      </Row>

      <List v-on:add="addIssuer" :title="$t('property.issuer')">
        <div v-if="coin.issuers.length == 0" class="info">
          {{ $t("warning.list_is_empty") }}
        </div>
        <ListItem
          v-for="(issuer, issuer_idx) in coin.issuers"
          :key="'issuer-wrapper-key-' + issuer.key"
          v-on:remove="removeIssuer"
          :object="issuer"
        >
          <TitledPersonSelect
            name="isser"
            table="persons"
            attribute="name"
            :value="issuer"
            :key="`issuer-${issuer.key}`"
            @input="issuerChanged($event, issuer_idx)"
          ></TitledPersonSelect>
        </ListItem>
      </List>
      <List
        v-on:add="addOverlord"
        :description="$t('info.overlords')"
        :title="$tc('property.overlord', 2)"
        class="overlords needs-spacing"
      >
        <p></p>
        <div v-if="coin.overlords.length == 0" class="info">
          {{ $t("warning.list_is_empty") }}
        </div>

        <ListItem
          v-for="(overlord, index) of coin.overlords"
          :key="'overlord-key-' + overlord.key"
          v-on:remove="removeOverlord"
          :object="overlord"
        >
          <div class="list-number">{{ index + 1 }}</div>
          <TitledPersonSelect
            name="overlord"
            :value="overlord"
            :key="`overlord-${overlord.key}`"
            @change="overlordChanged"
          />
        </ListItem>
      </List>

      <LabeledInputContainer :label="$tc('role.caliph')">
        <DataSelectField
          v-model="coin.caliph"
          attribute="name"
          table="person"
          text="${name} (${role})"
        />
      </LabeledInputContainer>
      <List
        :title="$t('property.additional_persons')"
        class="needs-spacing"
        v-on:add="addOtherPerson"
      >
        <div v-if="coin.otherPersons.length == 0" class="info">
          {{ $t("warning.list_is_empty") }}
        </div>

        <ListItem
          v-for="otherPerson in coin.otherPersons"
          :key="'other-person-id-' + otherPerson.id"
          v-on:remove="removeOtherPerson"
          :object="otherPerson"
        >
          <DataSelectField
            table="person"
            attribute="name"
            :value="otherPerson"
            text="${name} (${role})"
            query="{getPersonsWithRole{id,name, role}}"
            queryCommand="getPersonsWithRole"
          />
        </ListItem>
      </List>

      <Section title="Voderseite">
        <CoinSideField
          :title="$t('property.sides.front')"
          :value="coin.avers"
          @change="aversChanged"
        />
      </Section>

      <Section title="Rückseite">
        <CoinSideField
          :title="$t('property.sides.back')"
          :value="coin.reverse"
          @change="reverseChanged"
        />
      </Section>

      <Row>
        <LabeledInputContainer :label="$t('property.cursive_script') + ' (?)'">
          <Checkbox id="cursive" v-model="coin.cursiveScript" />
        </LabeledInputContainer>

        <LabeledInputContainer :label="$tc('property.isolated_character', 2)">
          <input type="text" v-model="coin.isolatedCharacters" />
        </LabeledInputContainer>
      </Row>

      <List
        :title="$tc('property.piece', 2)"
        @add="addPiece"
        class="pieces-list"
      >
        <div v-if="coin.pieces.length == 0" class="info">
          {{ $t("warning.list_is_empty") }}
        </div>
        <ListItem
          v-for="(piece, idx) in coin.pieces"
          :key="'pieces-' + piece.key"
          :object="piece"
          @remove="removePiece(idx)"
        >
          <input type="text" v-model="coin.pieces[idx].value" />
        </ListItem>
      </List>

      <LabeledInputContainer :label="$t('property.literature')">
        <!-- <SimpleFormattedField v-model="coin.literature" /> -->
        <textarea v-model="coin.literature"></textarea>
      </LabeledInputContainer>

      <Row>
        <button @click.stop="cancel">{{ $t("form.cancel") }}</button>
        <button @click.stop="submitForm" type="submit">
          {{ $t("form.submit") }}
        </button>
      </Row>
    </div>
  </form>
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
import Query from "../../database/query.js";
import LoadingSpinner from "../misc/LoadingSpinner.vue";

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
    LoadingSpinner,
  },
  computed: {
    productionLabels: function () {
      return [
        this.$t("property.procedures.pressed"),
        this.$t("property.procedures.cast"),
      ];
    },
  },
  mounted: function () {
    // window.onbeforeunload = function (event) {
    //   return "ASD";
    // };
  },
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      Query.raw(
        `
        {
            getCoinType(id:${id}){
                id
                projectId
                treadwellId
                mint {
                  id,
                  name
                }
                mintAsOnCoin
                material {
                  id,
                  name
                }
                nominal {
                  id,
                  name
                }
                yearOfMinting
                donativ
                procedure
                issuers {
                  id
                  person {
                    id,
                    name,
                    role
                  }
                  titles {
                    id,
                    name
                  }
                  honorifics{
                    id,
                    name}
                }
                overlords {
                  id
                  rank
                  person {
                    id,
                    name,
                    role
                  }
                  titles {
                    id,
                    name
                  }
                  honorifics{
                    id,
                    name}
                }
                otherPersons {
                  id
                  name
                  role
                }
                caliph {
                  id
                  name
                  role
                }
                avers {
                  fieldText
                  innerInscript
                  intermediateInscript
                  outerInscript
                  misc
                }
                reverse {
                  fieldText
                  innerInscript
                  intermediateInscript
                  outerInscript
                  misc
                }
                cursiveScript
                isolatedCharacters
                literature
                pieces 
        }
      }
      `
      )
        .then((obj) => {
          if (obj.message && obj.message.errors && obj.message.errors.length > 0) {
            this.errorMessage = obj.message.errors[0];
            console.log("ERROR")
          } else {
            const type = obj.data.data.getCoinType;

            if(type.literature) type.literature = decodeURI(type.literature)

            // Sorts the overlords appropriately
            if(!type.overlords) type.overlords = []
            type.overlords.sort((a, b) => (a.rank > b.rank ? 1 : -1));

            type.overlords.forEach((overlord) => {
              overlord.key = this.key++;
              console.log(overlord.rank);
              overlord.titles.forEach((title) => (title.key = this.key++));
              overlord.honorifics.forEach(
                (honorific) => (honorific.key = this.key++)
              );
            });

            if(!type.issuers) type.issuers = []
            type.issuers.forEach((issuer) => {
              issuer.key = this.key++;
              issuer.titles.forEach((title) => (title.key = this.key++));
              issuer.honorifics.forEach(
                (honorific) => (honorific.key = this.key++)
              );
            });

            if(!type.otherPersons) type.otherPersons = []
            type.otherPersons.forEach(
              (otherPerson) => (otherPerson.key = this.key++)
            );

            if(!type.pieces) type.pieces = []
            type.pieces.forEach((piece, index) => {
              type.pieces[index] = { key: this.key++, value: piece };
            });

            /**
             * Provide them with an initial value.
             */
            type.mint = type.mint ? type.mint : { id: null, name: "" };
            type.material = type.material
              ? type.material
              : { id: null, name: "" };
            type.nominal = type.nominal ? type.nominal : { id: null, name: "" };
            type.caliph = type.caliph ? type.caliph : { id: null, name: "" };

            Object.assign(this.$data.coin, type);
          }
        })
        .catch((error) => {
          this.errorMessage = error;
        })
        .finally((this.loading = false));
    } else {
      this.addIssuer();
      this.loading = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (confirm(this.$t("warning.leave_without_saving"))) {
      next();
    } else next(false);
  },
  data: function () {
    return {
      coin: {
        id: null,
        projectId: "",
        treadwellId: "",
        mint: { id: null, name: "" },
        mintAsOnCoin: "",
        material: { id: null, name: "" },
        nominal: { id: null, name: "" },
        yearOfMinting: "",
        donativ: false,
        procedure: "pressed",
        issuers: [],
        overlords: [],
        otherPersons: [],
        caliph: { id: null, name: "", role: null },
        avers: {
          fieldText: "",
          innerInscript: "",
          intermediateInscript: "",
          outerInscript: "",
          misc: "",
        },
        reverse: {
          fieldText: "",
          innerInscript: "",
          intermediateInscript: "",
          outerInscript: "",
          misc: "",
        },
        cursiveScript: false,
        isolatedCharacters: "",
        literature: "",
        pieces: [],
      },
      errorMessage: "",
      loading: true,
      productionOptions: ["pressed", "cast"],
      key: 0,
    };
  },
  watch: {
    key: function (old, next) {
      console.log(next);
    },
  },
  methods: {
    aversChanged: function (coinSideObject) {
      this.coin.avers = coinSideObject;
    },
    cancel: function () {
      this.$router.push("/type/");
    },
    reverseChanged: function (coinSideObject) {
      console.log(coinSideObject.misc);

      this.coin.reverse = coinSideObject;
    },
    issuerChanged: function (issuer, index) {
      this.coin.issuers.splice(index, 1, issuer);
    },
    addPiece: function () {
      this.coin.pieces.push({
        key: "piece-" + this.key++,
        text: "",
      });
    },
    removePiece: function (index) {
      this.coin.pieces.splice(index, 1);
    },
    addIssuer: function () {
      this.coin.issuers.push({
        key: "issuer-" + this.key++,
        person: {
          id: null,
          name: "",
          role: "",
        },
        titles: [],
        honorifics: [],
      });
    },
    removeIssuer: function (item) {
      const idx = this.coin.issuers.indexOf(item);
      if (idx != -1) {
        this.coin.issuers.splice(idx, 1);
        this.coin.issuers.forEach((overlord, idx) => {
          overlord.rank = idx;
        });
      }
    },
    addOverlord: function () {
      this.coin.overlords.push({
        key: "overlord-" + this.key++,
        rank: this.coin.overlords.length,
        person: {
          id: null,
          name: "",
        },
        titles: [],
        honorifics: [],
      });
    },
    addOtherPerson: function () {
      this.coin.otherPersons.push({
        id: this.key++,
        name: "",
        role: "",
      });
    },
    overlordChanged: function (overlord, index) {
      this.coin.overlords.splice(index, 1, overlord);
    },
    removeOverlord: function (item) {
      const idx = this.coin.overlords.indexOf(item);
      if (idx != -1) {
        this.coin.overlords.splice(idx, 1);
        this.coin.overlords.forEach((overlord, idx) => {
          overlord.rank = idx;
        });
      }
    },
    removeOtherPerson: function (item) {
      console.log(item);
      const idx = this.coin.otherPersons.indexOf(item);
      if (idx != -1) {
        this.coin.otherPersons.splice(idx, 1);
      }
    },
    submitForm: function () {
      function transformCoinObject(obj) {
        const pieces = [];
        for (let [key, val] of Object.entries(obj)) {
          pieces.push(`${key}:"${val}"`);
        }

        return `{${pieces.join(",")}}`;
      }

      if (!this.coin.id) {
        const mutation = `mutation {
          addCoinType(data:{
                projectId: "${this.coin.projectId}",
                treadwellId: "${this.coin.treadwellId}",
                mint: ${this.coin.mint.id},
                mintAsOnCoin: "${this.coin.mintAsOnCoin}",
                material: ${this.coin.material.id},
                nominal: ${this.coin.nominal.id},
                yearOfMinting: "${this.coin.yearOfMinting}",
                donativ: ${this.coin.donativ},
                procedure: "${this.coin.procedure}",
                issuers: [${this.coin.issuers
                  .filter((issuer) => issuer.person && issuer.person.id != null)
                  .map(
                    (issuer) =>
                      `{ person: ${
                        issuer.person.id
                      }, titles: [${issuer.titles
                        .map((title) => title.id)
                        .join(",")}], honorifics: [${issuer.honorifics
                        .map((honorific) => honorific.id)
                        .join(",")}]}`
                  )}],
                otherPersons: [${this.coin.otherPersons
                  .filter((op) => op.person && op.person.id != null)
                  .map((person) => person.id)
                  .join(",")}]
                overlords: [${this.coin.overlords
                  .filter(
                    (overlord) => overlord.person && overlord.person.id != null
                  )
                  .map(
                    (overlord) =>
                      `{ person: ${overlord.person.id},rank: ${
                        overlord.rank
                      }, titles: [${overlord.titles
                        .map((title) => title.id)
                        .join(",")}], honorifics: [${overlord.honorifics
                        .map((honorific) => honorific.id)
                        .join(",")}]}`
                  )}],
                caliph: ${this.coin.caliph.id} ,
                avers: ${transformCoinObject(this.coin.avers)},
                reverse: ${transformCoinObject(this.coin.reverse)} ,
                cursiveScript: ${this.coin.cursiveScript},
                isolatedCharacters: "${this.coin.isolatedCharacters}",
                literature: "${encodeURI(this.coin.literature)})",
                pieces: [${this.coin.pieces
                  .map((piece) => '"' + piece.text + '"')
                  .join(",")}]
            })
        }
        `;

        console.log(mutation);

        Query.raw(mutation)
          .then((result) => console.log(result))
          .catch(console.error);
      } else {
        const errorMsg = "UPDATE NOT SUPPORTED YET";
        console.error(errorMsg);
        this.errorMessage = errorMsg;
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_import.scss";

.error {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 100px;
  background-color: red;
  z-index: 100000;
}

textarea {
  width: 100%;
  resize: none;
  min-height: 200px;
}

input[required] {
  border-color: red;
}

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
