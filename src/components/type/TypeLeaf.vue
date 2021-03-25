<template>
  <div class=".tree-item leaf">
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
      <div class="value">{{ this.data.procedure || "Kein Eintrag" }}</div>
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
    
  </div>
</template>

<script>
export default {
  name: "TypeLeaf",
  props: {
    data: Object,
  },
};
</script>

<style lang="scss" scoped>
.tree-item {
  position: relative;
  cursor: pointer;
  background-color: whitesmoke;
  border: 1px solid gray;
  user-select: none;
  border-radius: 5px;
  // padding: 5px;
  margin-bottom: 5px;

  header {
    color: white;
    background-color: gray;
  }

  &.collapsible {
    background-color: red;
  }
}
</style>