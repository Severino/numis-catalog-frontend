<template>
  <div class="title-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :title="$tc('property.title')"
      :error="error"
    >
      <input v-model="title.id" type="hidden" />
      <input
        type="text"
        v-model="title.name"
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
  name: "TitleForm",
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      new Query("title")
        .get(id, ["id", "name"])
        .then((result) => {
          this.title = result.data.data.getTitle;
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
      new Query("title")
        .update(this.title)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "title" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_update_element");
          console.error(err);
        });
    },
    cancel: function () {
      this.$router.push({ path: "/title" });
    },
  },
  data: function () {
    return {
      error: "",
      loading: true,
      title: { id: -1, name: "" },
    };
  },
};
</script>
