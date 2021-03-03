<template>
  <div class="titled-person-select">
    <div class="input-group">
      <DataSelectField
        table="Person"
        attribute="name"
        id="name"
        :placeholder="$tc('attribute.name')"
        :value="person"
        @input="personChanged"
        :queryCommand="queryCommand"
      ></DataSelectField>
      <List
        :title="$tc('property.title')"
        @add="addTitle"
        :length="titlesLength"
      >
        <ListItem
          class="list-item"
          v-for="(title, title_index) in this.titles"
          :key="`title-${title.key}`"
          @remove="removeTitle(title_index)"
          :object="title"
        >
          <DataSelectField
            table="Title"
            attribute="name"
            id="title"
            :value="title"
            @input="titleChanged($event, title_index)"
          />
        </ListItem>
      </List>

      <List
        :title="$tc('property.honorific')"
        @add="addHonorific"
        :length="honorificsLength"
      >
        <ListItem
          class="list-item"
          v-for="(honorific, honorific_index) in honorifics"
          :key="`honorific-${honorific.key}`"
          @remove="removeHonorific(honorific_index)"
          :object="honorific"
        >
          <DataSelectField
            table="honorific"
            attribute="name"
            id="name-of-honor"
            :value="honorific"
            @input="honorificChanged($event, honorific_index)"
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
    queryCommand: {
      type: String,
      default: null,
    },
    value: {
      type: Object,
      required: true,
      validator: function (prop) {
        return (
          // prop.id != undefined &&
          prop.person != undefined &&
          prop.titles != undefined &&
          prop.honorifics != undefined
        );
      },
    },
  },
  created: function () {
    this.titles.forEach((element) => {
      element.key = this.buildKey("title");
    });
  },
  data: function () {
    return {
      listKey: 0,
    };
  },
  computed: {
    person: function () {
      return this.value && this.value.person
        ? this.value.person
        : { id: null, name: "" };
    },
    titles: function () {
      return this.value && this.value.titles ? this.value.titles : [];
    },
    honorifics: function () {
      return this.value && this.value.honorifics ? this.value.honorifics : [];
    },
    titlesLength: function () {
      return this.titles.length;
    },
    honorificsLength: function () {
      return this.honorifics.length;
    },
  },
  methods: {
    buildKey: function (name) {
      const key = `${this.$vnode.key}_${name}_${this.listKey++}`;
      return key;
    },
    personChanged: function (person) {
      this.changed({ person });
    },
    addTitle: function () {
      const titles = this.titles;
      titles.push({ key: this.buildKey("title"), id: null, name: "" });
      this.changed({ titles });
    },
    removeTitle: function (title_index) {
      const titles = this.titles;
      titles.splice(title_index, 1);
      this.changed({ titles });
    },
    addHonorific: function () {
      const honorifics = this.honorifics;
      honorifics.push({ key: this.buildKey("honorific"), id: null, name: "" });
      this.changed({ honorifics });
    },
    removeHonorific(honorific_index) {
      const honorifics = this.honorifics;
      honorifics.splice(honorific_index, 1);
      this.changed({ honorifics });
    },
    honorificChanged: function (honorific, index) {
      const honorifics = this.honorifics;
      honorifics.splice(index, 1, honorific);
      this.changed({ honorifics });
    },
    titleChanged: function (title, index) {
      const titles = this.titles;
      titles.splice(index, 1, title);
      this.changed({ titles });
    },
    changed: function ({
      key = this.value.key,
      person = this.person,
      titles = this.titles,
      honorifics = this.honorifics,
    } = {}) {
      this.$emit("input", {
        key,
        person,
        titles,
        honorifics,
      });
    },
  },
};
</script>


<style  lang="scss">
@import "@/scss/_import.scss";

// .titled-person-select .title-row {
//   // margin-left: 10px;
// }

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
  // display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  flex: 1;
  grid-gap: $padding;

  > * {
    margin-bottom: $padding;
  }
}
#name {
  grid-row: 1;
  grid-column: span 2;
}

#title,
#name-of-honor {
  flex: 1;
}
</style>