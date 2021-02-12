<template>
  <div class="role-person-select">
    <select>
    <!-- <DataSelectField id="name" placeholder="Name" table="Person" attribute="name"></DataSelectField> -->
  </div>
</template>

<script>
import DataSelectField from './DataSelectField.vue';

export default {
  name: "TitledPersonSelect",
  components: {
    DataSelectField
  },
};
</script>


<style lang="scss" scoped>
@import "@/scss/_import.scss";

.role-person-select {
  display: grid;
  grid-gap: $padding;
  grid-template-columns: 1fr 1fr;
}
</style>