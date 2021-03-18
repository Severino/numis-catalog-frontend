<template>
  <div class="search">
    <input
      type="search"
      name=""
      id=""
      :placeholder="$t('message.filter_list')"
      @input="filterChanged"
      :value="value"
    />
    <Magnify />
  </div>
</template>

<script>

import Magnify from "vue-material-design-icons/Magnify";
export default {
    components:{
        Magnify
    },
    props: {
        value: String
    },
    methods: {
        filterChanged(evt){
            this.$emit("input", evt.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";
.search {
  display: flex;
  position: relative;
  > input {
    flex: 1;
    border-radius: 25px;
    padding-left: 45px;
  }

  .material-design-icon {
    position: absolute;
    right: $padding;
    top: 7px;
    color: gray;
  }
}
</style>