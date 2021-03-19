<template>
  <div class="type">
    <div class="labeled-group">
      <h3>{{ $t("property.project_id") }}</h3>
      <span>{{ this.getTypeProperty("projectId") }}</span>
    </div>

    <div class="labeled-group">
      <h3>{{ $tc("property.treadwell_id") }}</h3>
      <span>{{ this.getTypeProperty("treadwellId") }}</span>
    </div>

    <div class="labeled-group">
      <h3>{{ $tc("property.mint") }}</h3>
      <span>{{ this.getTypePropertyKey("mint") }}</span>
    </div>

    <div class="labeled-group">
      <h3>{{ $t("property.mint_as_on_coin") }}</h3>
      <span>{{ this.getTypeProperty("mintAsOnCoin") }}</span>
    </div>

    <div class="labeled-group">
      <h3>{{ $tc("property.material") }}</h3>
      <span>{{ this.getTypePropertyKey("material") }}</span>
    </div>

    <div class="labeled-group">
      <h3>{{ $tc("property.nominal") }}</h3>
      <span>{{ this.getTypePropertyKey("nominal") }}</span>
    </div>

    <div class="labeled-group">
      <h3>{{ $t("property.mint_year") }}</h3>
      <span>{{ this.getTypeProperty("yearOfMinting") }}</span>
    </div>

    <div class="labeled-group">
      <span
        >{{
          this.type.donativ
            ? $t("property.gifted_coin")
            : $t("property.issue_coin")
        }}
      </span>
    </div>

    <hr />

    <div class="labeled-group">
      <h3>{{ $tc("property.issuer") }}</h3>
      <span v-for="issuer of this.type.issuers" :key="`issuer-${issuer.id}`">{{
        issuer.person.name
      }}</span>
    </div>

    <div class="labeled-group">
      <h3>{{ $tc("property.overlord", 2) }}</h3>
      <ol>
        <li
          v-for="overlord of this.type.overlords"
          :key="`overlord-${overlord.id}`"
        >
          {{ overlord.person.name }}
        </li>
      </ol>
    </div>
    <div class="labeled-group">
      <h3>{{ $tc("role.caliph") }}</h3>
      <span>{{ this.getTypePropertyKey("caliph") }}</span>
    </div>

    <div class="labeled-group">
      <h3>{{ $tc("property.other_persons") }}</h3>
      <ul>
        <li
          v-for="otherPerson of this.type.otherPersons"
          :key="`otherPerson-${otherPerson.id}`"
        >
          {{ otherPerson.name }} ({{ $tc(`role.${otherPerson.role}`) }})
        </li>
      </ul>
    </div>

    <div class="frontside">
      <h3>{{ $t("property.sides.front") }}</h3>
      <div v-html="type.avers.fieldText" />

      <h4>
        {{
          type.avers.outerInscript
            ? $t("property.inner_circular_text")
            : $t("property.circular_text")
        }}
      </h4>
      <p>{{ type.avers.innerInscript }}</p>

      <h4 v-if="type.avers.intermediateInscript">
        {{ $t("property.intermediate_circular_text") }}
      </h4>
      <p v-if="type.avers.intermediateInscript">
        {{ type.avers.intermediateInscript }}
      </p>

      <h4 v-if="type.avers.innerInscript">
        {{ $t("property.outer_circular_text") }}
      </h4>
      <p v-if="type.avers.innerInscript">{{ type.avers.outerInscript }}</p>

      <h4 v-if="type.avers.misc">{{ $t("property.border_and_misc") }}</h4>
      <p v-if="type.avers.misc">{{ getTypePropertykey(type.avers, "misc") }}</p>
    </div>

    <div class="backside">
      <h3>{{ $t("property.sides.back") }}</h3>
      <div v-html="type.avers.fieldText" />

      <h4>
        {{
          type.reverse.outerInscript
            ? $t("property.inner_circular_text")
            : $t("property.circular_text")
        }}
      </h4>
      <p>{{ type.reverse.innerInscript }}</p>

      <h4 v-if="type.reverse.intermediateInscript">
        {{ $t("property.intermediate_circular_text") }}
      </h4>
      <p v-if="type.reverse.intermediateInscript">
        {{ type.reverse.intermediateInscript }}
      </p>

      <h4 v-if="type.reverse.innerInscript">
        {{ $t("property.outer_circular_text") }}
      </h4>
      <p v-if="type.reverse.innerInscript">{{ type.reverse.outerInscript }}</p>

      <h4 v-if="type.reverse.misc">{{ $t("property.border_and_misc") }}</h4>
      <p v-if="type.reverse.misc">
        {{ getTypePropertykey(type.reverse, "misc") }}
      </p>
    </div>

    <div class="labeled-group">
      <h3>{{ $t("property.cursive_script") }}</h3>
      {{ type.cursiveScript ? $t("general.yes") : $t("general.no") }}
    </div>

    <div class="labeled-group">
      <h3>{{ $tc("property.coin_mark", 2) }}</h3>
      <p v-if="type.coinMarks || type.coinMarks.length == 0">
        {{ $t("message.no_pieces_in_list") }}
      </p>
      <ul>
        <li v-for="(coinMark, index) of type.coinMarks" :key="`coinMark-${index}`">
          <a :href="coinMark">{{ coinMark }}</a>
        </li>
      </ul>
    </div>

    <div class="labeled-group">
      <h3>{{ $t("property.pieces") }}</h3>
      <p v-if="type.pieces || type.pieces.length == 0">
        {{ $t("message.no_pieces_in_list") }}
      </p>
      <ul>
        <li v-for="(piece, index) of type.pieces" :key="`piece-${index}`">
          <a :href="piece">{{ piece }}</a>
        </li>
      </ul>
    </div>
    <div class="labeled-group">
      <h3>{{ $t("property.specials") }}</h3>
      <div v-html="type.specials" />
    </div>
  </div>
</template>

<script>
import Query from "/src/database/query.js";
export default {
  name: "TypePage",
  data: function () {
    return {
      type: {
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
      },
    };
  },
  created: function () {
    Query.raw(
      `{
            getCoinType(id:${this.$route.params.id}){
                id
                projectId
                treadwellId
                mint {
                  name
                }
                mintAsOnCoin
                material {
                    name
                }
                nominal {
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
                coinMarks
                literature
                pieces 
                specials
        }
      }`
    )
      .then((result) => {
        Object.assign(this.type, result.data.data.getCoinType);
      })
      .catch(console.error);
  },
  methods: {
    getUndefinedString() {
      return "Nicht Erfasst";
    },
    getTypeProperty(name) {
      if (!this.type || !this.type[name]) {
        return this.getUndefinedString();
      } else {
        return this.type[name];
      }
    },
    getTypePropertyKey(name, key = "name") {
      let result = this.getTypeProperty(name);
      if (!result[key]) {
        return this.getUndefinedString();
      } else return result[key];
    },
  },
};
</script>
