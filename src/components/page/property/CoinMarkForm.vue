<template>
  <div class="coin-mark-form">
    <FormWrapper
      @submit="submit"
      @cancel="cancel"
      :loading="loading"
      :title="$tc('property.coin_mark')"
      :error="error"
    >
      <input v-model="value.id" type="hidden" />
      <input
        type="text"
        v-model="value.name"
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
  name: "CoinMarkForm",
  created: function () {
    let id = this.$route.params.id;
    if (id != null) {
      Query.raw(
        `{
        getCoinMark(id: ${id}){
          id,
          name
        }
      }`
      )
        .then((result) => {
          const data = result.data.data.getCoinMark;
          this.value = data;
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
      let query;
      if (this.value.id && this.value.id >= 0) {
        query = `mutation{
        updateCoinMark(data:{
          id: ${this.value.id}
          name: "${this.value.name}"
        })
        }`;
      } else {
        query = `mutation{
        addCoinMark(data:{
          name: "${this.value.name}"
        })
        }`;
      }


      Query.raw(query)
        .then(() => {
          this.$router.push({
            name: "CoinMarkOverview",
          });
        })
        .catch((err) => {
          this.error = this.$t("error.could_not_update_element");
          console.error(err);
        });
    },
    cancel: function () {
      this.$router.push({ name: "CoinMarkOverview" });
    },
  },
  data: function () {
    return {
      error: "",
      loading: true,
      value: { id: -1, name: "" },
    };
  },
};
</script>
