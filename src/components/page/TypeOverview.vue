<template>
  <div :class="`type-page`">
    <BackHeader />
    <h1>{{ $t("attribute.test") }}</h1>

    <div
      class="button"
      @click="create"
      tabindex="1"
      autofocus
      @keydown.enter="create"
    >
      <PlusCircleOutline />
      <span>{{ $t("form.create") }}</span>
    </div>

    <List
      @select="edit"
      @remove="remove"
      :error="error"
      :items="list"
      :loading="loading"
      :noRemove="true"
      property="projectId"
    />
  </div>
</template>

<script>
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline";
import List from "../layout/List.vue";
import Query from "../../database/query.js";
import BackHeader from "../layout/BackHeader.vue";

export default {
  name: "TypeOverviewPage",
  components: {
    PlusCircleOutline,
    List,
    BackHeader,
  },
  created: function () {
    new Query(`
     getReducedCoinTypeList`)
      .list(["id", "projectId", "treadwellId"])
      .then((obj) => {
        this.$data.items = obj.data.data["getReducedCoinTypeList"];
      })
      .catch(() => {
        this.error = this.$t("error.loading_list");
      })
      .finally(() => {
        this.$data.loading = false;
      });
  },
  computed: {
    list: function () {
      return this.$data.items;
    },
  },
  data: function () {
    return {
      loading: true,
      items: [],
      error: "",
    };
  },

  methods: {
    handleKeys(event) {
      console.log(event.key);
    },
    create() {
      this.$router.push({
        name: `TypeCreationPage`,
      });
    },
    remove(id) {
      if (this.$store.getters.local) {
        this.$store.commit(`${this.property}/remove`, id);
      } else {
        new Query(this.property)
          .delete(id)
          .then(() => {
            const idx = this.$data.items.findIndex((item) => item.id == id);
            if (idx != -1) this.$data.items.splice(idx, 1);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    edit(id) {
      this.$router.push({
        name: "EditTypePage",
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
