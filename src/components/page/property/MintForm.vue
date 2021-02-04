<template>
  <div class="mint-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :title="$tc('property.mint')"
      :error="error"
    >
      <input v-model="mint.id" readonly />
      <input
        type="text"
        v-model="mint.name"
        :placeholder="$tc('attribute.name')"
        autofocus
        required
      />
      <LatLonInput :value="mint.location" @input="updateLocation" />
    </FormWrapper>
  </div>
</template>

<script>
import Query from "../../../database/query.js";
import FormWrapper from "../FormWrapper.vue";
import LatLonInput from "../../forms/LatLonInput.vue";

export default {
  components: {
    FormWrapper,
    LatLonInput,
  },
  name: "MintForm",
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      new Query("mint")
        .get(id, ["id", "name", "location"])
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
                    name: "${this.mint.name}"
                    location: {
                      lat: ${this.mint.location.lat}
                      lon: ${this.mint.location.lon}
                    }
                  }
                )
              }
      `;
      console.log(query);
      new Query("mint")
        .raw(query)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "mint" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_replace_element");
          console.error(err);
        });
    },
    add: function () {
      const query = `
       mutation {
                addMint(
                  data:{
                    name: "${this.mint.name}"
                    location: {
                      lat: ${this.mint.location.lat}
                      lon: ${this.mint.location.lon}
                    }
                  }
                )
              }
      `;
      console.log(query);
      new Query("mint")
        .raw(query)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "mint" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_replace_element");
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
      mint: { id: -1, name: "", location: [0, 0] },
    };
  },
};
</script>
