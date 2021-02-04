<template>
  <div class="lat-lon-input">
    <input
      type="number"
      id="lat"
      :placeholder="$t('attribute.latitude')"
      min="-90"
      max="90"
      step="0.000001"
      :value="value.lat"
      @input="latitudeChanged"
    />
    <input
      type="number"
      id="lon"
      :placeholder="$t('attribute.longitude')"
      min="-180"
      max="180"
      step="0.000001"
      :value="value.lon"
      @input="longitudeChanged"
    />
    <div class="icon-button button" @click="clear">
      <Close />
    </div>
  </div>
</template>

<script>
import Close from "vue-material-design-icons/Close";
export default {
  name: "LatLonInput",
  components: {
    Close,
  },
  props: {
    value: {
      lat: Number,
      lon: Number,
    },
  },
  methods: {
    clear: function () {
      this.$props.value = null;
    },
    latitudeChanged: function (event) {
      let value = this.$props.value;
      if (value == null) value = { lat: 0, lon: 0 };
      value.lat = event.target.value;
      this.changed(value);
    },
    longitudeChanged: function (event) {
      let value = this.$props.value;
      if (value == null) value = { lat: 0, lon: 0 };
      value.lon = event.target.value;
      this.changed(value);
    },
    changed(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.lat-lon-input {
  display: flex;
  > * {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>