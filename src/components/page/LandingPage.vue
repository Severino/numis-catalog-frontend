<template>
  <div>
    <h2>{{ $t("general.administration") }}</h2>
    <!-- <router-link
      class="button icon-button"
      :to="{ name: 'CreateTypePage' }"
      draggable="false"
    >
      <PlusBox />
      <span>{{ $t("general.create_type") }}</span>
    </router-link> -->

    <h3>{{ $t("general.manage_properties") }}</h3>
    <div class="button-list">
      <router-link
        class="button icon-button"
        :to="{ name: 'Material' }"
        draggable="false"
      >
        <PlusBox />
        <span>{{ $tc("properties.material") }}</span>
      </router-link>
      <router-link
        class="button icon-button"
        :to="{ name: 'Mint' }"
        draggable="false"
      >
        <PlusBox />
        <span>{{ $tc("properties.mint") }}</span>
      </router-link>

       <router-link
        class="button icon-button"
        :to="{ name: 'Person' }"
        draggable="false"
      >
        <PlusBox />
        <span>{{ $tc("properties.person") }}</span>
      </router-link>

       <router-link
        class="button icon-button"
        :to="{ name: 'Honorific' }"
        draggable="false"
      >
        <PlusBox />
        <span>{{ $tc("properties.honorific") }}</span>
      </router-link>

      <router-link
        class="button icon-button"
        :to="{ name: 'Title' }"
        draggable="false"
      >
        <PlusBox />
        <span>{{ $tc("properties.title") }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import PlusBox from "vue-material-design-icons/PlusBox";

export default {
  name: "LandingPage",
  components: {
    PlusBox,
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 50px;
  padding-bottom: 0.5em;
  border-bottom: 1px solid black;
}
</style>