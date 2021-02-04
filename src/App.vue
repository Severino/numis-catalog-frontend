<template>
  <div id="app">
    <header class="top-header">
      <div class="content-wrapper">
        <div class="top-navigation">
          <h3 id="app-name">Buyija</h3>
          <span class="subtitle">{{ $t("general.type_catalogue") }}</span>
          <nav>
            <ButtonGroup
              id="language"
              :labels="['de', 'en']"
              :options="['de', 'en']"
              @change="languageChanged"
              :active="this.$i18n.locale"
            />
          </nav>
        </div>
      </div>
    </header>
    <BackHeader v-if="isAwayFromHome" />
    <main class="content-wrapper">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import ButtonGroup from "./components/forms/ButtonGroup.vue";
import BackHeader from "./components/layout/BackHeader.vue";
export default {
  components: { ButtonGroup, BackHeader },
  name: "App",
  methods: {
    languageChanged: function (event) {
      this.$i18n.locale = event.target.id;
    },
  },
  computed: {
    isAwayFromHome: function () {
      return this.$route.name !== "Home";
    },
  },
};
</script>

<style lang="scss">
@import "./scss/_import.scss";

#app-name {
  color: rgb(60, 184, 255);
  margin-right: $padding;
}

.subtitle {
  font-size: 1.2rem;
  text-transform: capitalize;
}

#app-name:after {
  content: "|";
  color: white;
  margin: 0 20px;
}

html,
body {
  margin: 0;
}

body {
  font-family: "Domine";
  font-size: 20px;
}

.button,
input,
button {
  @include input;
}

button[type="submit"] {
  color: white;
  background-color: $primary-color;

  &:hover {
    background-color: darken($color: $primary-color, $amount: 5);
  }
}

.button,
button {
  text-transform: capitalize;
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

.button-bar {
  display: flex;

  > * {
    flex: 1;
  }

  > *:not(:last-child) {
    margin-right: 10px;
  }
}

h1,
h2,
h3 {
  font-weight: normal;
  text-transform: capitalize;
}

.top-header {
  color: white;
  background-color: rgb(75, 75, 75);

  .button-group {
    input:checked + label {
      background-color: transparent;
      border-bottom: 2px solid white;

      border-top-right-radius: unset;
      border-top-left-radius: unset;
      border-bottom-right-radius: unset;
      border-bottom-left-radius: unset;
    }

    label {
      background-color: transparent;
      border-radius: 0;
      border: none;
      padding: $padding;
    }
  }
}

header {
  padding: 0 $padding;
  display: flex;
  align-items: center;

  nav {
    margin-left: auto;
  }
}

.top-navigation {
  display: flex;
  align-items: center;
}

main {
  position: relative;
  padding-top: 20px;
}

@media (min-width: 1080px) {
  .content-wrapper {
    
  margin: 0 auto;
    width: 50vw;
  }
}

.content-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}

a {
  text-decoration: none;
}

.icon-button {
  text-transform: capitalize;
  display: flex;
  align-items: center;

  :first-child {
    margin-right: $padding;
  }
}

.button-list {
  > * {
    margin-bottom: $padding;
  }
}

.error {
  font-size: 0.8rem;
  padding: 20px;
  background-color: rgb(255, 92, 92);
  border: 1px solid rgb(192, 68, 68);
}
</style>
