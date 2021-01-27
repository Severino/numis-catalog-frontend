
<template>
  <div class="material-page">
    <h1>{{ $tc("properties.material") }}</h1>
    <form v-if="!loading" @submit.prevent="handleSubmit">
      <input type="hidden" v-model="material.id" />
      <input type="text" v-model="material.name" :placeholder="$tc('attributes.name')" autofocus/>
      <Row class="button-bar">
        <button type="button" @click="cancel">{{ $t("form.cancel") }}</button>
        <button type="submit">{{ $t("form.submit") }}</button>
      </Row>
    </form>
  </div>
</template>
<script>
import Row from '../../layout/Row.vue';
export default {
  components: { Row },
  name: "MaterialEditPage",
  created() {
    let id = this.$route.params.id;
    if (id != null) {
      this.$store
        .dispatch("material/get", id)
        .then((result) => {
          if (result) {
            this.$data.material = result;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }else{
        this.loading = false
    }
  },
  data: function () {
    return {
      loading: true,
      material: {
        id: -1,
        name: "",
      },
    };
  },
  methods: {
    cancel: function () {
      this.$router.push({ name: "Material" });
    },
    handleSubmit: function () {
      if (!this.loading) {
        const material = Object.assign({}, this.$data.material);
        this.$store.dispatch("material/push", material).then(() => {
          this.$router.push({ name: "Material" });
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