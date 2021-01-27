<template>
  <div class="honorific-page">
    <h1>{{ $tc("properties.honorific") }}</h1>
    <form v-if="!loading" @submit.prevent="handleSubmit">
      <input type="hidden" v-model="honorific.id" />
      <input
        type="text"
        v-model="honorific.name"
        :placeholder="$tc('attributes.name')"
        autofocus
      />
      <Row class="button-bar">
        <button type="button" @click="cancel">{{ $t("form.cancel") }}</button>
        <button type="submit">{{ $t("form.submit") }}</button>
      </Row>
    </form>
  </div>
</template>

<script>
import Row from "../../layout/Row.vue";
export default {
  components: { Row },
  name: "HonorificEditPage",
  created() {
    let id = this.$route.params.id;
    if (id != null) {
      this.$store
        .dispatch("honorific/get", id)
        .then((result) => {
          if (result) {
            console.log(result);
            this.$data.honorific = result;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  },
  data: function () {
    return {
      loading: true,
      honorific: {
        id: -1,
        name: "",
      },
    };
  },
  methods: {
    cancel: function () {
      this.$router.push({ name: "Honorific" });
    },
    handleSubmit: function () {
      if (!this.loading) {
        const honorific = Object.assign({}, this.$data.honorific);
        this.$store.dispatch("honorific/push", honorific).then(() => {
          this.$router.push({ name: "Honorific" });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";

form {
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: $padding;
  }
}
</style>