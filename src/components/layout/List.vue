<template>
  <div class="list">
    <div v-if="error" class="info error">
      <Information />
      <p>
        {{ error }}
      </p>
    </div>

    <div v-if="items.length == 0 && !loading && error == ''" class="info">
      <Information />
      <p>
        {{ $t("warning.list_is_empty") }}
      </p>
    </div>

    <LoadingSpinner class="loading-spinner" v-if="loading" />
    <ListItem
      @click="listItemClicked"
      @remove="listItemRemoved"
      :noRemove="noRemove"
      v-for="item of items"
      :key="item.id"
      :id="item.id"
      >{{ item[listText] }}</ListItem
    >
  </div>
</template>

<script>
import Information from "vue-material-design-icons/Information";
import ListItem from "./ListItem.vue";
import LoadingSpinner from "../misc/LoadingSpinner.vue";

export default {
  components: { ListItem, Information, LoadingSpinner },
  props: {
    listText: {
      type: String,
      default: "name",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      id: String,
      name: String,
    },
    error: {
      type: String,
      default: "",
    },
    noRemove: Boolean,
  },
  methods: {
    listItemClicked: function(id) {
      this.$emit("select", id);
    },
    listItemRemoved: function(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";

.list {
  margin: $padding 0;
}

.info {
  color: gray;
  background-color: whitesmoke;
  border-radius: $border-radius;
  display: flex;
  align-items: center;

  .material-design-icon {
    margin-right: $padding * 2;
  }
}

.error {
  color: rgb(138, 39, 39);
  background-color: rgb(255, 81, 81);
  border: 1px solid rgb(138, 39, 39);
}

.loading-spinner {
  align-self: center;
}
</style>
