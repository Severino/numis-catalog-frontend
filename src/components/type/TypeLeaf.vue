<template>
  <div class="tree-item leaf">
    <section>
      <div class="property-group">
        <div class="label">Treadwell-ID</div>
        <div class="value">{{ this.data.treadwellId || "Kein Eintrag" }}</div>
      </div>
      <div class="property-group">
        <div class="label">Prägeort</div>
        <div class="value">{{ this.data.mintAsOnCoin || "Kein Eintrag" }}</div>
      </div>
      <div class="property-group">
        <div class="label">Jahr</div>
        <div class="value">{{ this.data.yearOfMinting || "Kein Eintrag" }}</div>
      </div>
      <div class="property-group">
        <div class="label">Herstellungsart</div>
        <div class="value">{{ $t(this.data.procedure) || "Kein Eintrag" }}</div>
      </div>
      <div class="property-group">
        <div class="label">Material</div>
        <div class="value">
          {{ this.data.material ? this.data.material.name : "Kein Eintrag" }}
        </div>
      </div>
      <div class="property-group">
        <div class="label">Nominal</div>
        <div class="value">
          {{ this.data.nominal ? this.data.nominal.name : "Kein Eintrag" }}
        </div>
      </div>
    </section>

    <section class="column persons-column">
      <div class="property-group">
        <div class="label">Kalif</div>
        <div class="value">
          {{
            this.data.caliph && this.data.caliph.name
              ? this.data.caliph.name
              : "Kein Eintrag"
          }}
        </div>
      </div>

      <div class="property-group" v-if="this.heir">
        <div class="label">Designierter Thronfolger</div>
        <div class="value">
          {{ this.heir ? this.heir.name : "Kein Eintrag" }}
        </div>
      </div>

      <div class="property-group">
        <div class="label">Münzherr</div>

        <div v-if="issuers.length == 1">{{ issuers[0].person.name }}</div>

        <ol v-if="issuers.length > 1">
          <li v-for="(issuer, index) in issuers" :key="'issuer-' + index">
            {{ issuer.person ? issuer.person.name : "Keine Person angegeben" }}
          </li>
        </ol>
      </div>

      <div class="property-group">
        <div class="label">Oberherren</div>
        <ol>
          <li v-for="(overlord, index) in overlords" :key="'overlord-' + index">
            {{
              overlord.person ? overlord.person.name : "Keine Person angegeben"
            }}
            ({{ overlord.rank }})
          </li>
        </ol>
      </div>

      <div class="property-group" v-if="this.cutter">
        <div class="label">Münzschneider</div>
        <div class="value">
          {{ this.cutter ? this.cutter.name : "Kein Eintrag" }}
        </div>
      </div>

      <div class="property-group" v-if="this.warden">
        <div class="label">Münzwardei</div>
        <div class="value">
          {{ this.warden ? this.warden.name : "Kein Eintrag" }}
        </div>
      </div>


    </section >

    <section class="column coin-side-column">
    <Tabs :tabs="[$t('property.frontside'), $t('property.backside')]">
      <template #tab-0>
        <TypeLeafCoinContent :value="data.avers" />
      </template>

      <template #tab-1>
        <TypeLeafCoinContent :value="data.reverse" />
      </template>
    </Tabs>
    </section>
  </div>
</template>

<script>
import Tabs from "../layout/tabs/Tabs.vue";
import TypeLeafCoinContent from "./TypeLeafCoinContent.vue";

export default {
  name: "TypeLeaf",
  props: {
    data: Object,
  },
  components: {
    TypeLeafCoinContent,
    Tabs,
  },
  computed: {
    heir: function() {
      let res = null;
      if (this.data && this.data.otherPersons) {
        res = this.data.otherPersons.find((person) => person.role == "heir");
      }

      return res;
    },
    overlords: function() {
      let overlords = [];

      if (this.data && this.data.overlords) {
        overlords = this.data.overlords;
      }

      return overlords;
    },
    issuers: function() {
      let issuers = [];

      if (this.data && this.data.issuers) {
        issuers = this.data.issuers;
      }
      return issuers;
    },
    cutter: function() {
      return this.data && this.data.otherPersons
        ? this.data.otherPersons.find((person) => person.role == "cutter")
        : null;
    },
    warden: function() {
      return this.data && this.data.otherPersons
        ? this.data.otherPersons.find((person) => person.role == "warden")
        : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-item {
  position: relative;
  cursor: pointer;
  // border: 1px solid gray;
  user-select: none;
  // border-radius: 5px;
  // padding: 5px;
  margin-bottom: 5px;

  header {
    color: white;
    background-color: gray;
  }

}

.leaf {
  display: grid;
  padding: 20px;

  grid-gap: 30px;
  grid-template-columns: 1fr 2fr 2fr;
}
section {
  margin: 0;
}

</style>
