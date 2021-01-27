
<template>
  <div class="mint-page">
    <h1>{{ $tc("properties.mint") }}</h1>
    <form v-if="!loading" @submit.prevent="handleSubmit">
      <input type="hidden" v-model="mint.id" />
      <input type="text" v-model="mint.name" :placeholder="$tc('name')" autofocus />
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
  name: "MintEditPage",
  components: {
    Row,
  },
  created() {
    let id = this.$route.params.id;
    if (id != null) {
      this.$store
        .dispatch("mint/get", id)
        .then((result) => {
          if (result) {
            this.$data.mint = result;
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
      mint: {
        id: -1,
        name: "",
      },
    };
  },
  methods: {
    cancel: function () {
      this.$router.push({ name: "Mint" });
    },
    handleSubmit: function () {
      if (!this.loading) {
        const mint = Object.assign({}, this.$data.mint);
        this.$store.dispatch("mint/push", mint).then(() => {
          this.$router.push({ name: "Mint" });
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