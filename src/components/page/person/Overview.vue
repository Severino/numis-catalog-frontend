<template>
  <div class="person-page">
    <h1>{{ $tc("properties.person", 2) }}</h1>
    <div class="button icon-button" @click="create">
      <PlusCircleOutline />
      <span>{{ $t("form.create") }}</span>
    </div>

    <List
      @select="itemSelected"
      @remove="remove"
      :items="personList"
    />
  
  </div>
</template>

<script>
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline";
import List from "../../layout/List.vue";

export default {
  name: "PersonOverviewPage",
  components: {
    PlusCircleOutline,
    List,
  },
  computed: {
    personList: function () {
      return this.$store.getters["person/list"];
    },
  },
  methods: {
    itemSelected(id) {
      this.$router.push({
        name: "UpdatePerson",
        params: { id },
      });
    },
    create() {
      this.$router.push({ name: "CreatePerson" });
    },
    remove(id) {
      this.$store.commit("person/remove", id);
    },
  },
};
</script>
