<template>
  <div class="titled-person-select">
    <div class="icon">
      <Face />
    </div>
    <div class="input-group">
      <DataSelectField
        table="Person"
        attribute="name"
        id="name"
        placeholder="Name"
      ></DataSelectField>
      <DataSelectField
        table="Title"
        attribute="name"
        id="title"
        placeholder="Titel"
      ></DataSelectField>
      <DataSelectField
        table="Ehrennamen"
        attribute="name"
        id="name-of-honor"
        placeholder="Ehrenname"
      ></DataSelectField>
    </div>
  </div>
</template>

<script>
import Face from "vue-material-design-icons/Face";
import DataSelectField from "./DataSelectField.vue";

export default {
  name: "TitledPersonSelect",
  components: {
    Face,
    DataSelectField,
  },
};
</script>


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

.titled-person-select{
  display: flex;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  overflow: hidden;
  // padding: 5px;
}

.input-group {
  padding: 5px;
  display: grid;
  flex: 1;
  grid-gap: $padding;
}
#name {
  grid-column: span 2;
}

#title,
#name-of-honor {
  grid-row: 2;
}
</style>