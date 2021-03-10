<template>
  <div class="types-list">
    <h1>{{ $t("property.type", 2) }}</h1>
    <List
      :items="this.types"
      :properties="['projectId', 'treadwellId']"
      :noRemove="true"
      @select="itemSelected"
    />
  </div>
</template>

<script>
import Query from "/src/database/query.js";
import ListItem from "../forms/ListItem.vue";
import List from "../layout/List.vue";
export default {
  components: { List, ListItem },
  name: "TypeList",
  data: function () {
    return {
      types: [],
      error: null,
    };
  },
  created: function () {
    Query.raw(
      `{
          getReducedCoinTypeList {
              id, projectId, treadwellId
          }
      }`
    )
      .then((result) => {
        this.types = result.data.data.getReducedCoinTypeList;
      })
      .catch((err) => {
        this.error = err;
      });
  },
  methods: {
    itemSelected: function (id) {
      this.$router.push({ name: "TypePage", params: { id } });
    },
  },
};
</script>