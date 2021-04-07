<template>
  <div>
    <h3 v-if="!type">Wählen Sie einen Typ aus der Liste aus ...</h3>

    <div v-if="type">
      <h1>{{ this.getTypeProperty("projectId") }}</h1>

      <div class="grid">
        <div class="labeled-group">
          <h3>{{ $tc("property.treadwell_id") }}</h3>
          <span>{{ this.getTypeProperty("treadwellId") }}</span>
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

        <div class="persons labeled-group">
          <h3>{{ $tc("role.caliph") }}</h3>
          <span>{{ this.getTypePropertyKey("caliph") }}</span>
        </div>

        <div class="persons labeled-group">
          <h3>{{ $tc("property.issuer") }}</h3>
          <span
            v-for="issuer of this.type.issuers"
            :key="`issuer-${issuer.id}`"
            >{{ issuer.person.name }}</span
          >
        </div>

        <div class="persons labeled-group">
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

        <div class="persons labeled-group">
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

          <h4 v-if="type.avers.innerInscript.textContent">
            {{
              type.avers.outerInscript
                ? $t("property.inner_circular_text")
                : $t("property.circular_text")
            }}
          </h4>
          <p
            v-if="type.avers.innerInscript.textContent"
            v-html="type.avers.innerInscript"
          ></p>

          <h4 v-if="type.avers.intermediateInscript.textContent">
            {{ $t("property.intermediate_circular_text") }}
          </h4>
          <p
            v-if="type.avers.intermediateInscript.textContent"
            v-html="type.avers.intermediateInscript"
          ></p>

          <h4 v-if="type.avers.innerInscript.textContent">
            {{ $t("property.outer_circular_text") }}
          </h4>
          <p
            v-if="type.avers.innerInscript.textContent"
            v-html="type.avers.innerInscript"
          />

          <h4 v-if="type.avers.misc.textContent">
            {{ $t("property.border_and_misc") }}
          </h4>
          <p v-if="type.avers.misc.textContent" v-html="type.avers.misc" />
        </div>

        <!-- START BACKSIDE -->
 <div class="backside">
          <h3>{{ $t("property.sides.back") }}</h3>
          <div v-html="type.reverse.fieldText" />

          <h4 v-if="type.reverse.innerInscript.textContent">
            {{
              type.reverse.outerInscript
                ? $t("property.inner_circular_text")
                : $t("property.circular_text")
            }}
          </h4>
          <p
            v-if="type.reverse.innerInscript.textContent"
            v-html="type.reverse.innerInscript"
          ></p>

          <h4 v-if="type.reverse.intermediateInscript.textContent">
            {{ $t("property.intermediate_circular_text") }}
          </h4>
          <p
            v-if="type.reverse.intermediateInscript.textContent"
            v-html="type.reverse.intermediateInscript"
          ></p>

          <h4 v-if="type.reverse.innerInscript.textContent">
            {{ $t("property.outer_circular_text") }}
          </h4>
          <p
            v-if="type.reverse.innerInscript.textContent"
            v-html="type.reverse.innerInscript"
          />

          <h4 v-if="type.reverse.misc.textContent">
            {{ $t("property.border_and_misc") }}
          </h4>
          <p v-if="type.reverse.misc.textContent" v-html="type.reverse.misc" />
        </div>
<!-- END BACKSIDE -->

        <div class="labeled-group">
          <h3>{{ $t("property.cursive_script") }}</h3>
          {{ type.cursiveScript ? $t("general.yes") : $t("general.no") }}
        </div>

        <!-- <div class="labeled-group">
        <h3>{{ $tc("property.coin_mark", 2) }}</h3>
        <p v-if="type.coinMarks || type.coinMarks.length == 0">
          {{ $t("message.no_pieces_in_list") }}
        </p>
        <ul>
          <li
            v-for="(coinMark, index) of type.coinMarks"
            :key="`coinMark-${index}`"
          >
            <a :href="coinMark">{{ coinMark }}</a>
          </li>
        </ul>
      </div> -->

        <div class="labeled-group" v-if="type.pieces.length > 0">
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
      </div>
      <!-- <div class="labeled-group" v-if="type.specials.textContent">
        <h3>{{ $t("property.specials") }}</h3>
        <div v-html="type.specials" />
      </div> -->

      <!-- <div class="type" v-if="type">-->
    </div>

    <!-- <div class="labeled-group">
       

     

    
  



     

     
    </div>  -->
  </div>
</template>

<script>
export default {
  name: "TypeView",
  props: {
    type: {
      type: Object,
    },
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

<style lang="scss" scoped>
h3 {
  font-weight: bold;
}

.grid {
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.persons {
  grid-column: span 2;
}

.backside,
.frontside {
  grid-column: span 2;
  margin: 10px 0;
  padding: 20px 30px;
  background-color: whitesmoke;
  
  h3:first-child {
    margin-top: 0;
  }
}
</style>