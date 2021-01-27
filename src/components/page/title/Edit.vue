<template>
  <div class="title-page">
    <h1>{{ $tc("properties.title") }}</h1>
    <form v-if="!loading" @submit.prevent="handleSubmit">
      <input type="hidden" v-model="title.id" />
      <input type="text" v-model="title.name" :placeholder="$tc('name')" autofocus />
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
  name: "TitleEditPage",
  created() {
    let id = this.$route.params.id;
    if (id != null) {
      this.$store
        .dispatch("title/get", id)
        .then((result) => {
          if (result) {
            this.$data.title = result;
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
      title: {
        id: -1,
        name: "",
      },
    };
  },
  methods: {
    cancel: function () {
      this.$router.push({ name: "Title" });
    },
    handleSubmit: function () {
      if (!this.loading) {
        const title = Object.assign({}, this.$data.title);
        this.$store.dispatch("title/push", title).then(() => {
          this.$router.push({ name: "Title" });
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