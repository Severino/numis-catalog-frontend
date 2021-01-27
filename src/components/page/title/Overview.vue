<template>
  <div class="title-page">
    <h1>{{ $tc("properties.title") }}</h1>

    <div class="button" @click="create">
      <PlusCircleOutline />
      <span>{{ $t("form.create") }}</span>
    </div>
    <List @select="editTitle" @remove="removeTitle" :items="titleList" />
  </div>
</template>

<script>
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline";
import List from "../../layout/List.vue";

export default {
  name: "TitleOverviewPage",
  components: {
    PlusCircleOutline,
    List,
  },
  computed: {
    titleList: function () {
      return this.$store.getters["title/list"];
    },
  },
  methods: {
    create() {
      this.$router.push({ name: "CreateTitle" });
    },
    removeTitle(id) {
      this.$store.commit("title/remove", id);
    },
    editTitle(id) {
      this.$router.push({
        name: "UpdateTitle",
        params: { id },
      });
    },
  },
};
</script>
