<template>
  <div class="coin-content">
    <div v-if="isEmpty(value.fieldText)" class="property-group">
      <div class="label">Feld Text</div>
      <div class="value" v-html="value.fieldText" />
    </div>
    <div v-if="isEmpty(value.innerInscript)" class="property-group">
      <div class="label">Innere Umschrift</div>
      <div class="value" v-html="value.innerInscript" />
    </div>

    <div v-if="isEmpty(value.intermediateInscript)" class="property-group">
      <div class="label">Mittlere Umschrift</div>
      <div class="value" v-html="value.intermediateInscript" />
    </div>
    <div v-if="isEmpty(value.outerInscript)" class="property-group">
      <div class="label">Äußere Umschrift</div>
      <div class="value" v-html="value.outerInscript" />
    </div>
    <div v-if="isEmpty(value.misc)" class="property-group">
      <div class="label">Ranbeschriftung</div>
      <div class="value" v-html="value.misc" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TypeLeafCoinContent",
  props: {
    value: {
      required: true,
      type: Object,
    },
  },
  methods: {
    isEmpty(val) {
      if (!val) return false;
      let parser = new DOMParser();
      let dom = parser.parseFromString(val, "text/html");

        if(dom.documentElement && dom.documentElement.textContent){
            return !!dom.documentElement.textContent.trim();
        }else return false
    },
  },
};
</script>

<style lang="scss" scoped></style>
