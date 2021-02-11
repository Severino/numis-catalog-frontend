<template>
  <div class="titled-person-select">
    <div class="input-group">
      <DataSelectField
        table="Person"
        attribute="name"
        id="name"
        :placeholder="$tc('attribute.name')"
      ></DataSelectField>
      <List :title="$tc('property.title')" @add="addTitle">
        <div
          class="list-item"
          v-for="title in titles"
          :key="`${person}-${title}`"
        >
          <DataSelectField
            table="Title"
            attribute="name"
            id="title"
          ></DataSelectField>
        </div>
      </List>

      <List :title="$tc('property.honorific')" @add="addHonorific">
        <div
          class="list-item"
          v-for="honorific in honorifics"
          :key="`${person}-${honorific}`"
        >
          <DataSelectField
            table="Ehrennamen"
            attribute="name"
            id="name-of-honor"
          ></DataSelectField>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
import DataSelectField from "./DataSelectField.vue";
import List from "./List.vue";

export default {
  name: "TitledPersonSelect",
  components: {
    DataSelectField,
    List,
  },
  props: {
    person: String,
    titles: {
      type: Array,
      default: function () {
        return [];
      },
    },
    honorifics: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    addTitle: function () {
      this.titles.push({ id: -1, name: "" });
    },
    addHonorific: function () {
      this.honorifics.push({ id: -1, name: "" });
    },
  },
};
</script>


<style  lang="scss">
@import "@/scss/_import.scss";


.titled-person-select .title-row {
  margin-left: 10px;
}

.titled-person-select .title {
  font-size: 13.33px;
}
</style>

<style lang="scss" scoped>
@import "@/scss/_import.scss";

.icon {
  background-color: $gray;
  padding: $padding;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  margin-right: $padding;
}

.titled-person-select {
  padding: 5px;
  // display: flex;
  // border: 1px solid whitesmoke;
  // border-radius: 10px;
  // overflow: hidden;
  // padding: 5px;
  background-color: whitesmoke;
}

.input-group {
  // padding: 5px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  flex: 1;
  grid-gap: $padding;
}
#name {
  grid-row: 1;
  grid-column: span 2;
}

#title,
#name-of-honor {
  grid-row: 2;
}
</style>