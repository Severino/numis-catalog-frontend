<template>
  <div class="list">
    <div v-if="items.length == 0" class="info">
        <Information />
        <p>
            {{$t("warning.list_is_empty")}}
        </p>
    </div>

    <ListItem
      @click="listItemClicked"
      @remove="listItemRemoved"
      v-for="item of items"
      :key="item.id"
      :id="item.id"
      >{{ item.name }}</ListItem
    >
  </div>
</template>

<script>
import Information from "vue-material-design-icons/Information";
import ListItem from "./ListItem.vue";
export default {
  components: { ListItem, Information },
  props: {
    items: {
      id: String,
      name: String,
    },
  },
  methods: {
    listItemClicked: function (id) {
      this.$emit("select", id);
    },
    listItemRemoved: function (id) {
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

    .material-design-icon{
        margin-right: $padding*2;
    }
}
</style>