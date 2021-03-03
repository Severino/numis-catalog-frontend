<template>
  <div class="mint-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :title="$tc('property.mint')"
      :error="error"
    >
      <input v-model="mint.id" type="hidden" />
      <input
        type="text"
        v-model="mint.name"
        :placeholder="$tc('attribute.name')"
        autofocus
        required
      />
      <div id="uncertain-row">
        <div class="label">
          {{ $t("property.uncertain_location") + "(?)" }}
        </div>

        <Checkbox id="location_uncertain" v-model="mint.uncertain" />
      </div>
    </FormWrapper>
  </div>
</template>

<script>
import Query from "../../../database/query.js";
import FormWrapper from "../FormWrapper.vue";
import Checkbox from "../../forms/Checkbox";

export default {
  components: {
    Checkbox,
    FormWrapper,
  },
  name: "MintForm",
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      new Query("mint")
        .get(id, ["id", "name", "location", "uncertain"])
        .then((result) => {
          this.mint = result.data.data.getMint;
        })
        .catch((err) => {
          this.$data.error = this.$t("error.loading_element");
          console.log(err);
        })
        .finally(() => {
          this.$data.loading = false;
        });
    } else {
      this.$data.loading = false;
    }
  },
  methods: {
    submit: function () {
      if (this.mint.id == -1) {
        this.add();
      } else {
        this.update();
      }
    },
    update: function () {
      const query = `
       mutation {
                updateMint(
                  data:{
                    id: "${this.mint.id}"
                    uncertain: ${this.mint.uncertain}
                    name: "${this.mint.name}"
                    location: {
                      lat: ${this.mint.location.lat}
                      lon: ${this.mint.location.lon}
                    }
                  }
                )
              }
      `;
      
      new Query("mint")
        .raw(query)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "mint" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_update_element");
          console.error(err);
        });
    },
    add: function () {
      const location =
        !!this.mint.location.lat && !!this.mint.location.lon
          ? `
                    location: {
                      lat: ${this.mint.location.lat}
                      lon: ${this.mint.location.lon}
                    }`
          : "";


      const query = `
       mutation {
                addMint(
                  data:{
                    uncertain: ${this.mint.uncertain}
                    name: "${this.mint.name}"
                    ${location}
                  }
                )
              }
      `;

      new Query("mint")
        .raw(query)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "mint" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_update_element");
          console.error(err);
        });
    },
    cancel: function () {
      this.$router.push({ path: "/mint" });
    },
    updateLocation: function (location) {
      this.$data.mint.location = location;
    },
  },
  data: function () {
    return {
      error: "",
      loading: true,
      mint: { id: -1, name: "", uncertain: false, location: [0, 0] },
    };
  },
};
</script>

<style lang="scss" scoped>
  #uncertain-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
</style>
