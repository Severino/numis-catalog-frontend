<template>
  <div class="person-page">
    <h1>{{ $tc("properties.person") }}</h1>
    <form v-if="!loading" @submit.prevent="handleSubmit">
      <input type="hidden" v-model="person.id" />
      <input type="text" v-model="person.name" :placeholder="$tc('name')" />
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
  name: "PersonEditPage",
  created() {
      console.log("CREATED")
    let id = this.$route.params.id;
    if (id != null) {
      this.$store
        .dispatch("person/get", id)
        .then((result) => {
          if (result) {
            this.$data.person = result;
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
      person: {
        id: -1,
        name: "",
      },
    };
  },
  methods: {
    cancel: function () {
      this.$router.push({ name: "Person" });
    },
    handleSubmit: function () {
      if (!this.loading) {
        const person = Object.assign({}, this.$data.person);
        this.$store.dispatch("person/push", person).then(() => {
          this.$router.push({ name: "Person" });
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