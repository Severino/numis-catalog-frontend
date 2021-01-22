<template>
  <div id="app">
    <CreateCoinPage />
  </div>
</template>

<script>
import CreateCoinPage from "./components/page/CreateCoinPage.vue";
export default {
  name: "App",
  components: {
    CreateCoinPage,
  },
};
</script>

<style lang="scss">
@import "./scss/_import.scss";

body {
  font-family: "Domine";
  font-size: 20px;
  padding: 40px;
}

input,
button {
  @include input;
}

button {
  color: gray;
  border-color: gray;

  padding: 10px;
  border: 1px solid whitesmoke;
  transition: 0.3s border;

  box-sizing: border-box;

  @include interactive();
}

label {
  display: block;
  margin-top: 30px;
  margin-bottom: 10px;

  @include interactive();
}
</style>
