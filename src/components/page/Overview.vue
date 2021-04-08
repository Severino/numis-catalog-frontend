<template>
  <div :class="`overview ${this.property}-page`">
    <BackHeader />
    <h1>{{ $tc(`property.${property}`) }}</h1>

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

    <SearchField v-model="textFilter" />

    <List
      @remove="remove"
      :error="error"
      :loading="loading"
      :items="list"
      :filteredItems="filteredItems"
    >
      <ListItem
        v-for="item of filteredItems"
        v-bind:key="item.key"
        :id="item.id"
        @click="edit(item.id)"
      >
        <ListItemIdField :value="item.id" />
        <ListItemCell>{{ item.name }}</ListItemCell>
        <DynamicDeleteButton @click="remove(item.id)" />
      </ListItem>
    </List>
  </div>
</template>

<script>
import SearchUtils from "../../utils/SearchUtils.js";
import AxiosHelper from "../../utils/AxiosHelper.js";

import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline";

import List from "../layout/List.vue";
import Query from "../../database/query.js";
import BackHeader from "../layout/BackHeader.vue";
import SearchField from "../forms/SearchField.vue";
import ListItemIdField from "../layout/list/ListItemIdField.vue";

import ListItemCell from "../layout/list/ListItemCell.vue";
import ListItem from "../layout/ListItem.vue";
import DynamicDeleteButton from "../layout/DynamicDeleteButton.vue";

export default {
  name: "OverviewPage",
  components: {
    PlusCircleOutline,
    List,
    BackHeader,
    SearchField,
    ListItemIdField,
    ListItem,
    ListItemCell,
    DynamicDeleteButton,
  },
  created: function () {
    new Query(this.queryName)
      .list(["id", "name"])
      .then((obj) => {
        this.$data.items = obj.data.data[this.queryName];
      })
      .catch(() => {
        this.error = this.$t("error.loading_list");
      })
      .finally(() => {
        this.$data.loading = false;
      });
  },
  props: {
    query: String,
    overrideProperty: String,
    createPage: String,
  },
  computed: {
    queryName: function () {
      return this.query ? this.query : this.property;
    },
    property: function () {
      return this.overrideProperty
        ? this.overrideProperty
        : this.$route.params.property.toLowerCase();
    },
    list: function () {
      return this.$data.items;
    },
    filteredItems: function () {
      let list = this.$data.items;

      list = SearchUtils.filter(this.textFilter, list);

      return list;
    },
  },
  data: function () {
    return {
      loading: true,
      items: [],
      error: "",
      textFilter: "",
    };
  },

  methods: {
    create() {
      if (this.createPage) {
        this.$router.push({ name: this.createPage });
      } else {
        this.$router.push({
          path: `${this.property}/create`,
        });
      }
    },
    remove(id) {
      new Query(this.queryName)
        .delete(id)
        .then((answer) => {
          if (AxiosHelper.ok(answer)) {
            const idx = this.$data.items.findIndex((item) => item.id == id);
            if (idx != -1) this.$data.items.splice(idx, 1);
          } else {
            const errors = AxiosHelper.getErrors(answer);
            this.error = errors.join("\n");
            console.error(errors);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    edit(id) {
      this.$router.push({
        path: `/${this.property.toLowerCase()}/${id}`,
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

.overview > * {
  margin-bottom: $padding;
}
</style>
