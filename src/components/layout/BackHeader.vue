<template>
  <div class="back-header">
    <header class="content-wrapper">
      <nav>
        <router-link :to="{ name: 'Home' }"><ArrowLeft />{{$t("navigation.back")}}</router-link>
      </nav>
    </header>
  </div>
</template>


<script>
import ArrowLeft from "vue-material-design-icons/KeyboardBackspace";
export default {
  name: "ValueWrapper",
  components: {
    ArrowLeft,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/scss/_import.scss";

.back-header {
  // box-sizing: border-box;
  // position: sticky;
  // background-color: gray;
  width: 100%;
  left: 0;
  top: 0;
  // padding: 10px 50px;
}

h1 {
  margin: 0;
}

nav {
  margin-left: 0;
}

a {
  display: flex;
  align-items: center;
  color: black;
  text-transform:capitalize;


// $shadow:  1px 2px 3px rgba($color: #000000, $alpha: .3);
  text-decoration: none;
  // text-shadow:$shadow;

  .material-design-icon {
      margin-right: 10px;
      // svg {
      //     filter: drop-shadow($shadow);
      // }
  }
}

.material-design-icon {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}
</style> 