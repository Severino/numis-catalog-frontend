<template>
  <div class="material-page">
    <h1>{{ title }}</h1>
    <LoadingSpinner class="loading-spinner" v-if="loading" />
    <form v-if="!loading" @submit.prevent="submit">
      <slot></slot>
      <div v-if="error" class="information error">
        {{ error }}
      </div>
      <Row class="button-bar">
        <button type="button" @click="cancel">{{ $t("form.cancel") }}</button>
        <button id="submit-btn" type="submit" >{{ $t("form.submit") }}</button>
      </Row>
    </form>
  </div>
</template>

<script>
import Row from "../layout/Row.vue";
import LoadingSpinner from "../misc/LoadingSpinner.vue";
// import Query from "../../database/query";
// import * as propertyComponents from "../../components/forms/properties";
// const components = Object.assign(
//   {
//     Row,
//     LoadingSpinner,
//   },
//   propertyComponents
// );

export default {
  name: "FormWrapper",
  props: {
    title: String,
    loading: Boolean,
    error: String
  },
  components: {
    LoadingSpinner,
    Row,
  },
  methods: {
    submit: function () {
      this.$emit("submit");
    },
    cancel: function () {
      this.$emit("cancel");
    },
  },
};
//   created() {
//     let id = this.$route.params.id;
//     if (id != null) {
//       new Query("material")
//         .get(id, ["id", "name"])
//         .then((result) => {
//           if (result.data.data.material.length > 0) {
//             this.material = result.data.data.material[0];
//           } else {
//             this.logError(this.$t("error.loading_element"));
//           }
//         })
//         .catch((err) => {
//           this.logError(this.$t("error.loading_element"));
//           console.error(err);
//         })
//         .finally(() => {
//           this.loading = false;
//         });
//     } else {
//       this.loading = false;
//     }

//     // if (id != null) {
//     //   this.$store
//     //     .dispatch("material/get", id)
//     //     .then((result) => {
//     //       if (result) {
//     //         this.$data.material = result;
//     //       }
//     //       this.loading = false;
//     //     })
//     //     .catch(() => {
//     //       this.loading = false;
//     //     });
//     // }else{
//     //     this.loading = false
//     // }
//   },
//   computed: {
//     property: function () {
//       return this.$route.params.property;
//     },
//   },
//   data: function () {
//     return {
//       loading: true,
//       error: "",
//       data: {}
//     };
//   },
//   methods: {
//     logError: function (message) {
//       this.$data.error = message;
//     },
//     cancel: function () {
//       this.$router.push({ name: "Material" });
//     },
//     handleSubmit: function () {
//       if (!this.loading) {
//         document.getElementById("submit-btn").style.visibility = "hidden";

//         new Query("material")
//           .update(this.material)
//           .then(() => {
//             this.$router.push({ name: "Material" });
//           })
//           .catch((err) => {
//             this.logError(this.$t("error.could_not_update_element"));
//             console.error(err);
//           });
//         //

//         // const material = Object.assign({}, this.$data.material);
//         // this.$store.dispatch("material/push", material).then(() => {
//         //   this.$router.push({ name: "Material" });
//         // });
//       }
//     },
//   },
// };
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
