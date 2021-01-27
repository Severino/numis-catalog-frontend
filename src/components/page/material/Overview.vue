<template>
  <div class="material-page">
    <h1>{{ $tc("properties.material") }}</h1>

    <div class="button" @click="create">
      <PlusCircleOutline />
      <span>{{ $t("form.create") }}</span>
    </div>
    <List
      @select="editMaterial"
      @remove="removeMaterial"
      :items="materialList"
    />
  </div>
</template>

<script>
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline";
import List from "../../layout/List.vue";

export default {
  name: "MaterialOverviewPage",
  components: {
    PlusCircleOutline,
    List,
  },
  computed: {
    materialList: function () {
      return this.$store.getters["material/list"];
    },
  },
  methods: {
    create() {
      this.$router.push({ name: "CreateMaterial" });
    },
    removeMaterial(id) {
      this.$store.commit("material/remove", id);
    },
    editMaterial(id) {
      this.$router.push({
        name: "UpdateMaterial",
        params: { id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";
.list {
  display: flex;
  flex-direction: column;
  margin: $padding 0;
  // padding: $padding;
  overflow: hidden;
  background-color: rgb(78, 78, 78);

  background-color: whitesmoke;
  border-radius: 3px;

  box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.1);
}

.list-item {
  align-items: center;
  display: flex;

  transition: background-color 0.15s;

  > :first-child {
    flex: 1;
  }
}

.edit {
  display: flex;
  height: 100%;
  flex: 1;

  background-color: whitesmoke;
  @include interactive();
  margin-right: $padding;
  padding: $padding $padding;

  &:hover {
    background-color: gray;
  }
}

.button {
  @include interactive();
  display: flex;
  align-items: center;
  padding: $padding;

  border-radius: $border-radius;

  > * {
    margin-right: $padding;
  }
}
</style>