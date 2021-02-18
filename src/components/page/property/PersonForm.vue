<template>
  <div class="person-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :title="$tc('property.person')"
      :error="error"
    >
      <input v-model="person.id" type="hidden" />

      <input
        type="text"
        v-model="person.name"
        :placeholder="$tc('attribute.name')"
        autofocus
        required
      />
      <select v-model="person.role" required>
        <option disabled value="">-</option>
        <option
          v-for="option in roleOptions"
          v-bind:value="option.value"
          v-bind:key="option.key"
        >
          {{ option.text }}
        </option>
      </select>
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
        .get(id, ["id", "name", "role"])
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
          this.error = this.$t("error.could_not_update_element");
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
      person: { id: -1, name: "", role: "overlord" },
    };
  },
  computed: {
    roleOptions: function () {
      return [
        {
          key: "role_option_00",
          text: this.$tc("role.buyid"),
          value: "overlord",
        },
        {
          key: "role_option_01",
          text: this.$tc("role.caliph"),
          value: "caliph",
        },
        {
          key: "role_option_02",
          text: this.$tc("role.cutter"),
          value: "cutter",
        },
        { key: "role_option_03", text: this.$tc("role.heir"), value: "heir" },
        {
          key: "role_option_04",
          text: this.$tc("role.warden"),
          value: "warden",
        },
      ];
    },
  },
};
</script>
