<template>
  <div class="role-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :role="$tc('property.role')"
      :error="error"
    >
      <input v-model="role.id" type="hidden" />
      <input
        type="text"
        v-model="role.name"
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
  name: "RoleForm",
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      new Query("role")
        .get(id, ["id", "name"])
        .then((result) => {
          this.role = result.data.data.getRole;
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
      new Query("role")
        .update(this.role)
        .then(() => {
          this.$router.push({
            name: "Property",
            params: { property: "role" },
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_update_element");
          console.error(err);
        });
    },
    cancel: function () {
      this.$router.push({ path: "/role" });
    },
  },
  data: function () {
    return {
      error: "",
      loading: true,
      role: { id: -1, name: "" },
    };
  },
};
</script>
