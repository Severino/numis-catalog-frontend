<template>
  <div class="material-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :title="$tc('property.material')"
      :error="error"
    >
      <input v-model="material.id" type="hidden" />
      <input
        type="text"
        v-model="material.name"
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
  name: "MaterialForm",
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      new Query("material")
        .get(id, ["id", "name"])
        .then((result) => {
          this.material = result.data.data.getMaterial;
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
      new Query("material")
        .update(this.material)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "material" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_update_element");
          console.error(err);
        });
    },
    cancel: function () {
      this.$router.push({ path: "/material" });
    },
  },
  data: function () {
    return {
      error: "",
      loading: true,
      material: { id: -1, name: "" },
    };
  },
};
</script>
