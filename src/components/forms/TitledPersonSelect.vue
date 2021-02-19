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
        <ListItem
          class="list-item"
          v-for="title in titles"
          :key="`title-${title.key}`"
          @remove="removeTitle"
          :object="title"
        >
          <DataSelectField table="Title" attribute="name" id="title" />
        </ListItem>
      </List>

      <List :title="$tc('property.honorific')" @add="addHonorific">
        <ListItem
          class="list-item"
          v-for="honorific in honorifics"
          :key="`honorific-${honorific.key}`"
          @remove="removeHonorific"
          :object="honorific"
        >
          <DataSelectField
            table="honorific"
            attribute="name"
            id="name-of-honor"
          />
        </ListItem>
      </List>
    </div>
  </div>
</template>

<script>
import DataSelectField from "./DataSelectField.vue";
import List from "./List.vue";
import ListItem from "./ListItem.vue";

export default {
  name: "TitledPersonSelect",
  components: {
    DataSelectField,
    List,
    ListItem,
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
  mounted: function () {
    this.$props.honorifics.forEach((honorific) => {
      honorific.key = this.honorificsKey++;
    });

    this.$props.titles.forEach((honorific) => {
      honorific.key = this.titleKey++;
    });
  },
  data: function () {
    return {
      honorificsKey: 0,
      titleKey: 0,
    };
  },
  methods: {
    addTitle: function () {
      this.titles.push({ key: this.titleKey++, id: -1, name: "" });
    },
    removeTitle: function (title) {
      let idx = this.titles.findIndex((otherTitle) => title == otherTitle);
      if (idx != -1) this.titles.splice(idx, 1);
    },
    addHonorific: function () {
      this.honorifics.push({ key: this.honorificsKey++, id: -1, name: "" });
    },
    removeHonorific(honorific) {
      let idx = this.honorifics.findIndex(honorific);
      if (idx != -1) this.honorifics.splice(idx, 1);
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