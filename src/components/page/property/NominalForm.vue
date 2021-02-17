<template>
  <div class="nominal-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :title="$tc('property.nominal')"
      :error="error"
    >
      <input v-model="nominal.id" type="hidden" />
      <input
        type="text"
        v-model="nominal.name"
        :placeholder="$tc('attribute.name')"
        autofocus
        required
      />
    </FormWrapper>
  </div>
</template>

<script>
import Query from "../../../database/query.js";
import FormWrapper from "../FormWrapper.vue";

export default {
  components: { FormWrapper },
  name: "NominalForm",
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      new Query("nominal")
        .get(id, ["id", "name"])
        .then((result) => {
          this.nominal = result.data.data.getNominal;
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
      new Query("nominal")
        .update(this.nominal)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "nominal" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_update_element");
          console.error(err);
        });
    },
    cancel: function () {
      this.$router.push({ path: "/nominal" });
    },
  },
  data: function () {
    return {
      error: "",
      loading: true,
      nominal: { id: -1, name: "" },
    };
  },
};
</script>
