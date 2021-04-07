<template>
  <div class="dynasty-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :title="$tc('property.dynasty')"
      :error="error"
    >
      <input v-model="dynasty.id" type="hidden" />
      <input
        type="text"
        v-model="dynasty.name"
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
  name: "DynastyForm",
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      new Query("dynasty")
        .get(id, ["id", "name"])
        .then((result) => {
          this.dynasty = result.data.data.getDynasty;
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
      new Query("dynasty")
        .update(this.dynasty)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "dynasty" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_update_element");
          console.error(err);
        });
    },
    cancel: function () {
      this.$router.push({ path: "/dynasty" });
    },
  },
  data: function () {
    return {
      error: "",
      loading: true,
      dynasty: { id: -1, name: "" },
    };
  },
};
</script>
