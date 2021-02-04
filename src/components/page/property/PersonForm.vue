<template>
  <div class="person-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :title="$tc('property.person')"
      :error="error"
    >
      <input v-model="person.id" readonly />
      <input
        type="text"
        v-model="person.name"
        :placeholder="$tc('attribute.name')"
        autofocus
      />
    </FormWrapper>
  </div>
</template>

<script>
import Query from "../../../database/query.js";
import FormWrapper from "../FormWrapper.vue";

export default {
  components: { FormWrapper },
  name: "PersonForm",
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      new Query("person")
        .get(id, ["id", "name"])
        .then((result) => {
          this.person = result.data.data.getPerson;
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
      new Query("person")
        .update(this.person)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "person" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_replace_element");
          console.error(err);
        });
    },
    cancel: function () {
      this.$router.push({ path: "/person" });
    },
  },
  data: function () {
    return {
      error: "",
      loading: true,
      person: { id: -1, name: "" },
    };
  },
};
</script>
