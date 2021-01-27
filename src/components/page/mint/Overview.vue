<template>
  <div class="mint-page">
    <h1>{{ $tc("properties.mint") }}</h1>

    <div class="button" @click="create">
      <PlusCircleOutline />
      <span>{{ $t("form.create") }}</span>
    </div>
    <List @select="editMint" @remove="removeMint" :items="mintList" />
  </div>
</template>

<script>
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline";
import List from "../../layout/List.vue";

export default {
  name: "MintOverviewPage",
  components: {
    PlusCircleOutline,
    List,
  },
  computed: {
    mintList: function () {
      return this.$store.getters["mint/list"];
    },
  },
  methods: {
    create() {
      this.$router.push({ name: "CreateMint" });
    },
    removeMint(id) {
      this.$store.commit("mint/remove", id);
    },
    editMint(id) {
      this.$router.push({
        name: "UpdateMint",
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