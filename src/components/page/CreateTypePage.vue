<template>
  <form class="types-page" @submit.prevent="">
    <div v-if="errorMessage" class="global error">{{ errorMessage }}</div>
    <Heading>{{ $tc("general.type") }}</Heading>
    <LoadingSpinner v-if="loading" />
    <div v-if="!loading" class="loading-area">
      <Row>
        <LabeledInputContainer :label="$tc('property.type_id')">
          <input v-model="coin.projectId" required />
        </LabeledInputContainer>

        <LabeledInputContainer :label="$tc('property.treadwell_id')">
          <input v-model="coin.treadwellId" />
        </LabeledInputContainer>
      </Row>

      <Row>
        <LabeledInputContainer :label="$tc('property.mint')">
          <DataSelectField
            table="Mint"
            attribute="name"
            v-model="coin.mint"
            @select="mintSelected"
          />
        </LabeledInputContainer>

        <LabeledInputContainer :label="$t('property.mint_as_on_coin')">
          <RemovableInputField
            v-model="coin.mintAsOnCoin"
            @remove="removeMintAsOnCoin"
          />
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

        <LabeledInputContainer :label="$tc('property.procedure')">
          <ButtonGroup
            id="production"
            :labels="productionLabels"
            :options="productionOptions"
            v-model="coin.procedure"
          ></ButtonGroup>
        </LabeledInputContainer>
      </Row>

      <Row>
        <Checkbox
          id="donativ"
          v-model="coin.donativ"
          :label="$tc('property.donativ')"
        />
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
            queryCommand="searchPersonsWithoutRole"
            :queryParams="['id', 'name']"
          ></TitledPersonSelect>
          <div v-if="issuer.error" class="invalid-warning">
            {{ issuer.error }}
          </div>
        </ListItem>
      </List>
      <List
        v-on:add="addOverlord"
        :description="$t('info.overlords')"
        :title="$tc('property.overlord', 2)"
        class="overlords needs-spacing"
      >
        <div v-if="coin.overlords.length == 0" class="info">
          {{ $t("warning.list_is_empty") }}
        </div>
        <ListItem
          v-for="(overlord, index) of coin.overlords"
          :key="'overlord-key-' + overlord.key"
          v-on:remove="removeOverlord"
          :object="overlord"
        >
          <div class="overlord-rank">{{ overlord.rank }}</div>
          <TitledPersonSelect
            name="overlord"
            :value="overlord"
            :key="`overlord-${overlord.key}`"
            @input="overlordChanged($event, index)"
            queryCommand="searchPersonsWithoutRole"
            :queryParams="['id', 'name']"
          />
          <div v-if="overlord.error" class="invalid-warning">
            {{ overlord.error }}
          </div>
        </ListItem>
      </List>

      <LabeledInputContainer :label="$tc('role.caliph')">
        <DataSelectField
          v-model="coin.caliph"
          attribute="name"
          table="person"
          queryCommand="searchPersonsWithRole"
          :queryParams="['id', { role: ['id', 'name'] }, 'name']"
          :additionalParameters="{ include: ['caliph'] }"
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
          v-for="(otherPerson, index) in coin.otherPersons"
          :key="'other-person-id-' + otherPerson.key"
          v-on:remove="removeOtherPerson"
          :object="otherPerson"
        >
          <DataSelectField
            table="person"
            attribute="name"
            :value="otherPerson"
            @input="otherPersonChanged($event, index)"
            text="${name} (${role.name})"
            queryCommand="searchPersonsWithRole"
            :additionalParameters="{ exclude: ['caliph'] }"
            :queryParams="['id', { role: ['id', 'name'] }, 'name']"
          />
          <div v-if="otherPerson.error" class="invalid-warning">
            {{ otherPerson.error }}
          </div>
        </ListItem>
      </List>

      <hr />
      <Section title="Voderseite">
        <CoinSideField
          :title="$t('property.sides.front')"
          ref="aversField"
          prefix="Av.-"
        />
      </Section>

      <hr />
      <Section title="Rückseite">
        <CoinSideField
          :title="$t('property.sides.back')"
          ref="reverseField"
          prefix="Rev.-"
        />
      </Section>

      <hr />

      <LabeledInputContainer :label="$t('property.specialities_and_variants')">
        <SimpleFormattedField ref="specialsField" />
      </LabeledInputContainer>

      <Checkbox
        id="cursive"
        :label="$t('property.cursive_script') + ' (?)'"
        v-model="coin.cursiveScript"
      />

      <List
        :title="$t('property.coin_mark')"
        @add="addCoinMark"
        class="coin-mark-list"
      >
        <div v-if="coin.coinMarks.length == 0" class="info">
          {{ $t("warning.list_is_empty") }}
        </div>
        <ListItem
          v-for="(coinmark, idx) in coin.coinMarks"
          :key="coinmark.key"
          :object="coinmark"
          @remove="removeCoinMark(idx)"
        >
          <DataSelectField
            type="text"
            table="CoinMark"
            attribute="name"
            v-model="coin.coinMarks[idx]"
          />
          <div v-if="coinmark.error" class="invalid-warning">
            {{ coinmark.error }}
          </div>
        </ListItem>
      </List>

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
          <input
            type="text"
            v-model="coin.pieces[idx].value"
            @input="pieceChanged(piece)"
          />
          <div v-if="piece.error" class="invalid-warning">
            {{ piece.error }}
          </div>
        </ListItem>
      </List>

      <LabeledInputContainer :label="$t('property.literature_and_remarks')">
        <SimpleFormattedField ref="literatureField" />
        <!-- <textarea v-model="coin.literature"></textarea> -->
      </LabeledInputContainer>

      <LabeledInputContainer :label="$t('property.internal_notes')">
        <SimpleFormattedField ref="internalNotesField" />
        <!-- <textarea v-model="coin.literature"></textarea> -->
      </LabeledInputContainer>

      <Row>
        <Checkbox
          id="exclude-from-type-catalog"
          v-model="coin.excludeFromTypeCatalogue"
          :label="$tc('property.excludeFromTypeCatalogue')"
        />

        <Checkbox
          id="exclude-from-map-app"
          v-model="coin.excludeFromMapApp"
          :label="$tc('property.excludeFromMapApp')"
        />
      </Row>

      <div class="submit-error-window">
        <div class="submit-error" v-for="err in errorMessages" :key="err.key">
          {{ err.message }}
        </div>
      </div>

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

import baseTemplate from "@/assets/template_types/base.json";
import RemovableInputField from "../forms/RemovableInputField.vue";

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
    RemovableInputField,
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
    window.onbeforeunload = (event) => {
      if (!this.submitted) return "ASD";
      else {
        window.onbeforeunload = null;
        return true;
      }
    };

    if (!this.$data.coin.id) {
      /**
       * Somehow the child object is not empties correctly.
       * Therefore we clone it here.
       */
      const reverse = Object.assign({}, baseTemplate.reverse);
      const avers = Object.assign({}, baseTemplate.avers);

      Object.assign(this.$data.coin, baseTemplate, {
        avers,
        reverse,
      });

      this.initFormattedFields.call(this);
    }
  },
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      this.$data.coin.id = id;
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
                    role {
                      id, name
                    }
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
                    role {
                      id, name
                    }
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
                  role {
                    id, name
                  }
                }
                caliph {
                  id
                  name
                  role {
                    id, name
                  }
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
                coinMarks {
                  id
                  name
                }
                literature
                pieces
                specials
                excludeFromTypeCatalogue
                excludeFromMapApp
                internalNotes
        }
      }
      `
      )
        .then((obj) => {
          console.log(obj);
          if (
            obj.message &&
            obj.message.errors &&
            obj.message.errors.length > 0
          ) {
            this.errorMessage = obj.message.errors[0];
          } else {
            const type = obj.data.data.getCoinType;

            // Sorts the overlords appropriately
            if (!type.overlords) type.overlords = [];
            type.overlords.sort((a, b) => (a.rank > b.rank ? 1 : -1));

            type.overlords.forEach((overlord) => {
              overlord.key = this.key++;
              overlord.titles.forEach((title) => (title.key = this.key++));
              overlord.honorifics.forEach(
                (honorific) => (honorific.key = this.key++)
              );
            });

            if (!type.issuers) type.issuers = [];
            type.issuers.forEach((issuer) => {
              issuer.key = this.key++;
              issuer.titles.forEach((title) => (title.key = this.key++));
              issuer.honorifics.forEach(
                (honorific) => (honorific.key = this.key++)
              );
            });

            if (!type.otherPersons) type.otherPersons = [];
            type.otherPersons.forEach(
              (otherPerson) => (otherPerson.key = this.key++)
            );

            if (!type.pieces) type.pieces = [];
            type.pieces.forEach((piece, index) => {
              type.pieces[index] = { key: this.key++, value: piece };
            });

            if (!type.coinMarks) type.coinMarks = [];
            type.coinMarks.forEach((coinMark, index) => {
              if (coinMark == null)
                type.coinMarks[index] = { id: null, name: "" };
              type.coinMarks[index].key = this.key++;
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
            this.initFormattedFields();
          }
        })
        .catch((error) => {
          console.error(error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const errors = error.response.data.errors;
            this.errorMessage = errors.map((err) => err.message).join("\n");
          } else this.errorMessage = error;
        })
        .finally((this.loading = false));
    } else {
      this.loading = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.submitted || confirm(this.$t("warning.leave_without_saving"))) {
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
        coinMarks: [],
        pieces: [],
        specials: "",
        excludeFromTypeCatalogue: false,
        excludeFromMapApp: false,
        internalNotes: "",
      },
      errorMessages: [],
      submitted: false,
      errorMessage: "",
      validationErrors: [],
      loading: true,
      productionOptions: ["pressed", "cast"],
      key: 0,
    };
  },
  methods: {
    cancel: function () {
      this.$router.push({ name: "TypeOverview" });
    },
    reverseChanged: function (coinSideObject) {
      this.coin.reverse = coinSideObject;
    },
    issuerChanged: function (issuer, index) {
      delete issuer.error;
      this.coin.issuers.splice(index, 1, issuer);
    },
    addCoinMark: function () {
      this.coin.coinMarks.push({
        key: "coin-mark-" + this.key++,
        value: 0,
        name: "",
      });
    },
    removeCoinMark: function (index) {
      this.coin.coinMarks.splice(index, 1);
    },
    addPiece: function () {
      this.coin.pieces.push({
        key: "piece-" + this.key++,
        value: "",
      });
    },
    pieceChanged: function (piece) {
      delete piece.error;
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
    initFormattedFields: function () {
      this.$refs.internalNotesField.setContent(this.coin.internalNotes);
      this.$refs.literatureField.setContent(this.coin.literature);
      this.$refs.specialsField.setContent(this.coin.specials);

      this.$refs.aversField.setFieldContent(this.coin.avers);
      this.$refs.reverseField.setFieldContent(this.coin.reverse);
    },
    addOverlord: function () {
      this.coin.overlords.push({
        key: "overlord-" + this.key++,
        rank: this.coin.overlords.length + 1,
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
        id: null,
        key: this.key++,
        name: "",
        role: "",
      });
    },
    overlordChanged: function (overlord, index) {
      const old = this.coin.overlords[index];
      Object.assign(old, overlord);
      delete old.error;
      this.coin.overlords.splice(index, 1, old);
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
      const idx = this.coin.otherPersons.indexOf(item);
      if (idx != -1) {
        this.coin.otherPersons.splice(idx, 1);
      }
    },
    removeMintAsOnCoin: function () {
      this.coin.mintAsOnCoin = "";
    },
    mintSelected: function (mint) {
      if (!this.coin.mintAsOnCoin) {
        this.coin.mintAsOnCoin = mint.name;
      }
    },
    otherPersonChanged: function (otherPerson, index) {
      const op = this.coin.otherPersons[index];
      Object.assign(op, otherPerson);
      delete op.error;
      this.coin.otherPersons.splice(index, 1, op);
    },
    submitForm: function () {
      function validateTitledPerson(titledPerson) {
        return !!titledPerson.person.id;
      }

      function validatePeron(person) {
        return !!person.id;
      }

      let invalid = false;

      this.coin.issuers.forEach((issuer, index) => {
        if (!validateTitledPerson(issuer)) {
          issuer.error =
            "Person ist nicht valide. Geben Sie eine Person an oder löschen Sie das Element.";
          this.coin.issuers.splice(index, 1, issuer);
          invalid = true;
        } else {
          delete issuer.error;
        }
      });

      this.coin.overlords.forEach((overlord, index) => {
        if (!validateTitledPerson(overlord)) {
          overlord.error =
            "Person ist nicht valide. Geben Sie eine Person an oder löschen Sie das Element.";
          invalid = true;
          this.coin.overlords.splice(index, 1, overlord);
        } else {
          delete overlord.error;
        }
      });

      this.coin.otherPersons.forEach((otherPerson, index) => {
        if (!validatePeron(otherPerson)) {
          otherPerson.error =
            "Person ist nicht valide. Geben Sie eine Person an oder löschen Sie das Element.";
          invalid = true;
          this.coin.otherPersons.splice(index, 1, otherPerson);
        } else {
          delete otherPerson.error;
        }
      });

      this.coin.pieces.forEach((piece, index) => {
        if (piece.value == "") {
          piece.error =
            "Person ist nicht valide. Geben Sie eine Person an oder löschen Sie das Element.";
          invalid = true;
          this.coin.pieces.splice(index, 1, piece);
        } else {
          delete piece.error;
        }
      });

      if (invalid) {
        setTimeout(() => {
          const target = document.querySelector(".invalid-warning");
          if (target) {
            target.scrollIntoView({
              block: "start",
              behavior: "smooth",
            });
          }
        }, 10);

        return;
      } else {
        const submitData = this.$data.coin;

        submitData.internalNotes = this.$refs.internalNotesField.getContent();
        submitData.literature = this.$refs.literatureField.getContent();
        submitData.specials = this.$refs.specialsField.getContent();

        submitData.avers = Object.assign(
          submitData.avers,
          this.$refs.aversField.getFieldContent()
        );
        submitData.reverse = Object.assign(
          submitData.reverse,
          this.$refs.reverseField.getFieldContent()
        );

        if (submitData.id == null) {
          this.addCoinType(submitData)
            .then((result) => {
              if (result.data.errors && result.data.errors.length > 0) {
                console.error(result);
                this.errorMessages = result.data.errors;
              } else {
                this.submitted = true;
                this.$router.push({ name: "TypeOverview" });
              }
            })
            .catch((error) => {
              this.handleAxiosError(error);
            });
        } else {
          this.updateCoinType(submitData)
            .then((result) => {
              if (result.data.errors && result.data.errors.length > 0) {
                console.error(result);
                this.errorMessages = result.data.errors;
              } else {
                this.submitted = true;
                this.$router.push({ name: "TypeOverview" });
              }
            })
            .catch((error) => {
              this.handleAxiosError(error);
            });
        }
      }
    },
    addCoinType(data) {
      // TODO ADA
      const query = `
        mutation ($projectId:String,
            $treadwellId:String,
            $mint:ID,
            $mintAsOnCoin:String,
            $material:ID,
            $nominal:ID,
            $yearOfMinting:String,
            $donativ:Boolean,
            $procedure:String,
            $issuers:[TitledPersonInput],
            $otherPersons:[ID],
            $overlords:[OverlordInput],
            $caliph:ID,
            $avers:CoinSideInformationInput,
            $reverse:CoinSideInformationInput,
            $cursiveScript:Boolean,
            $coinMarks:[ID],
            $literature:String,
            $pieces:[String],
            $specials:String,
            $excludeFromTypeCatalogue: Boolean
            $excludeFromMapApp: Boolean,
            $internalNotes: String
            ){
        addCoinType(data: {
            projectId: $projectId,
            treadwellId: $treadwellId,
            mint: $mint,
            mintAsOnCoin: $mintAsOnCoin,
            material: $material,
            nominal: $nominal,
            yearOfMinting: $yearOfMinting,
            donativ: $donativ,
            procedure: $procedure,
            issuers: $issuers,
            otherPersons: $otherPersons,
            overlords: $overlords,
            caliph: $caliph,
            avers: $avers,
            reverse: $reverse,
            cursiveScript: $cursiveScript,
            coinMarks: $coinMarks,
            literature: $literature,
            pieces: $pieces,
            specials: $specials,
            excludeFromTypeCatalogue:$excludeFromTypeCatalogue,
            excludeFromMapApp:$excludeFromMapApp
            internalNotes:$internalNotes
         })
         }
   `;

      const variables = {
        projectId: data.projectId,
        treadwellId: data.treadwellId,
        mint: data.mint && data.mint.id ? data.mint.id : null,
        mintAsOnCoin: data.mintAsOnCoin,
        material: data.material && data.material.id ? data.material.id : null,
        nominal: data.nominal && data.nominal.id ? data.nominal.id : null,
        yearOfMinting: data.yearOfMinting,
        donativ: data.donativ,
        procedure: data.procedure,
        issuers: data.issuers.map((issuer) => {
          return {
            person: issuer.person.id,
            titles: issuer.titles.map((title) => +title.id),
            honorifics: issuer.honorifics.map((honorific) => +honorific.id),
          };
        }),
        otherPersons: data.otherPersons.map((person) => person.id),
        overlords: data.overlords.map((overlord) => {
          return {
            person: overlord.person.id,
            rank: overlord.rank,
            titles: overlord.titles.map((title) => +title.id),
            honorifics: overlord.honorifics.map((honorific) => +honorific.id),
          };
        }),
        caliph: data.caliph && data.caliph.id ? data.caliph.id : null,
        avers: data.avers,
        reverse: data.reverse,
        cursiveScript: data.cursiveScript,
        coinMarks: data.coinMarks.map((coinMark) => coinMark.id),
        literature: data.literature,
        pieces: data.pieces.map((piece) => {
          console.log(piece.value);
          return piece.value;
        }),
        specials: data.specials || "",
        excludeFromTypeCatalogue: data.excludeFromTypeCatalogue,
        excludeFromMapApp: data.excludeFromMapApp,
        internalNotes: data.internalNotes,
      };

      return Query.raw(query, variables);
    },
    updateCoinType(data) {
      // TODO ADA
      const query = `
        mutation ($id:ID,
         $projectId:String,
         $treadwellId:String,
         $mint:ID,
         $mintAsOnCoin:String,
         $material:ID,
         $nominal:ID,
         $yearOfMinting:String,
         $donativ:Boolean,
         $procedure:String,
         $issuers:[TitledPersonInput],
         $otherPersons:[ID],
         $overlords:[OverlordInput],
         $caliph:ID,
         $avers:CoinSideInformationInput,
         $reverse:CoinSideInformationInput,
         $cursiveScript:Boolean,
         $coinMarks:[ID],
         $literature:String,
         $pieces:[String],
          $specials:String,
          $excludeFromTypeCatalogue:Boolean,
          $excludeFromMapApp:Boolean
          $internalNotes: String
        ){
        updateCoinType(id: $id, data: {
            projectId: $projectId,
            treadwellId: $treadwellId,
            mint: $mint,
            mintAsOnCoin: $mintAsOnCoin,
            material: $material,
            nominal: $nominal,
            yearOfMinting: $yearOfMinting,
            donativ: $donativ,
            procedure: $procedure,
            issuers: $issuers,
            otherPersons: $otherPersons,
            overlords: $overlords,
            caliph: $caliph,
            avers: $avers,
            reverse: $reverse,
            cursiveScript: $cursiveScript,
            coinMarks: $coinMarks,
            literature: $literature,
            pieces: $pieces,
            specials: $specials,
            excludeFromTypeCatalogue: $excludeFromTypeCatalogue,
            excludeFromMapApp: $excludeFromMapApp
            internalNotes: $internalNotes
         })
         }
   `;

      const variables = {
        id: data.id,
        projectId: data.projectId,
        treadwellId: data.treadwellId,
        mint: data.mint && data.mint.id ? data.mint.id : null,
        mintAsOnCoin: data.mintAsOnCoin,
        material: data.material && data.material.id ? data.material.id : null,
        nominal: data.nominal && data.nominal.id ? data.nominal.id : null,
        yearOfMinting: data.yearOfMinting,
        donativ: data.donativ,
        procedure: data.procedure,
        issuers: data.issuers.map((issuer) => {
          return {
            person: issuer.person.id,
            titles: issuer.titles.map((title) => +title.id),
            honorifics: issuer.honorifics.map((honorific) => +honorific.id),
          };
        }),
        otherPersons: data.otherPersons.map((person) => person.id),
        overlords: data.overlords.map((overlord) => {
          return {
            person: overlord.person.id,
            rank: overlord.rank,
            titles: overlord.titles.map((title) => +title.id),
            honorifics: overlord.honorifics.map((honorific) => +honorific.id),
          };
        }),
        caliph: data.caliph && data.caliph.id ? data.caliph.id : null,
        avers: data.avers,
        reverse: data.reverse,
        cursiveScript: data.cursiveScript,
        coinMarks: data.coinMarks.map((coinMark) => coinMark.id),
        literature: data.literature,
        pieces: data.pieces.map((piece) => {
          console.log(piece.value);
          return piece.value;
        }),
        specials: data.specials || "",
        excludeFromTypeCatalogue:
          data.excludeFromTypeCatalogue == null
            ? false
            : data.excludeFromTypeCatalogue,
        excludeFromMapApp:
          data.excludeFromMapApp == null ? false : data.excludeFromMapApp,
        internalNotes: data.internalNotes,
      };

      return Query.raw(query, variables);
    },
    handleAxiosError(req) {
      if (req.errors) {
        this.errorMessages.push(...req.errors);
      } else if (req.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */

        if (req.response.data.errors)
          this.errorMessages.push(...req.response.data.errors);

        console.log(req.response.data);
        console.log(req.response.status);
        console.log(req.response.headers);
      } else if (req.request) {
        /*
         * The request was made but no response was received, `req.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        this.errorMessages.push("Server war nicht erreichbar.");

        console.log(req.request);
      } else {
        console.dir(req.message);

        this.errorMessages.push("Ausnahmefehler!");

        // Something happened in setting up the request and triggered an Error
        console.log("Error", req.message);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_import.scss";

.coin-side-field > *,
.loading-area > * {
  margin-bottom: $padding * 2;
}

.submit-error {
  padding: 10px;
  font-size: 0.75rem;
  background-color: tomato;
  border: 1px solid rgb(160, 14, 14);

  &:first-of-type {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  &:last-of-type {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}

.global.error {
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

.overlord-rank {
  padding: 5px;
  display: flex;
  align-items: center;
}

.invalid-warning {
  position: absolute;
  z-index: 10;
  font-size: 0.85rem;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px 10px;
  background-color: $red;
  box-sizing: border-box;
  transform: translateY(-100%);
}
</style>
