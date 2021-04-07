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

      <input
        type="text"
        v-model="person.shortName"
        :placeholder="$tc('attribute.shortName')"
      />

      <DataSelectField
        v-model="person.role"
        table="person_role"
        attribute="name"
        queryCommand="searchRole"
      />
      <DataSelectField
        v-model="person.dynasty"
        table="dynasty"
        attribute="name"
      />
    </FormWrapper>
  </div>
</template>

<script>
import Query from "../../../database/query.js";
import FormWrapper from "../FormWrapper.vue";
import DataSelectField from "@/components/forms/DataSelectField.vue";
import AxiosHelper from "@/utils/AxiosHelper.js";

export default {
  components: { FormWrapper, DataSelectField },
  name: "PersonForm",
  created: function () {
    let id = +this.$route.params.id;

    if (!isNaN(id)) {
      Query.raw(
        `
      query ($id : Int!){
        getPerson(id: $id){
          id
          name
          shortName
          role {
            id
            name
          }
          dynasty {
            id
            name
          }
        }
      }
      
      `,
        { id }
      )
        .then((result) => {
          this.person = result.data.data.getPerson;
          if (this.person.role == null) this.person.role = " ";
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
      let query, variables;

      if (this.person.id && this.person.id > 0) {
        query = `mutation($id:ID, $name: String,$shortName: String, $role:ID, $dynasty:ID)
      {
            updatePerson (
              data: {
                id: $id,
                name: $name,
                shortName: $shortName,
                role: $role,
                dynasty: $dynasty
              }
            )
        }`;
        variables = {
          id: this.person.id && this.person.id > 0 ? this.person.id : null,
          name: this.person.name,
          shortName: this.person.shortName,
          role: this.person.role.id,
          dynasty: this.person.dynasty.id,
        };
      } else {
        query = `mutation($name: String,$shortName: String, $role:ID, $dynasty:ID)
      {
            addPerson (
              data: {
                name: $name,
                shortName: $shortName,
                role: $role,
                dynasty: $dynasty
              }
            )
        }`;
        variables = {
          name: this.person.name,
          shortName: this.person.shortName,
          role: this.person.role.id,
          dynasty: this.person.dynasty.id,
        };
      }

      Query.raw(query, variables)
        .then((result) => {
          if (AxiosHelper.ok(result)) {
            this.$router.push({
              name: "Property",
              params: { property: "person" },
            });
          } else {
            this.error = AxiosHelper.getErrors(result).join("\n");
          }
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
      person: {
        id: -1,
        name: "",
        shortName: "",
        role: { id: null, name: "" },
        dynasty: { id: null, name: "" },
      },
    };
  },
};
</script>
