<template>
  <div class="data-select">
    <input
      class="name-field"
      @input="input"
      @focus="focus"
      @blur="hideList"
      :placeholder="placeholder"
      v-model="value"
    />
    <input class="id-field" type="text" tabindex="-1" :value="id" readonly />
    <ul :class="'search-box ' + (listVisible ? 'visible' : 'hidden')">
      <li v-if="error" class="error non-selectable">{{ error }}</li>
      <li v-if="!error && !loading && searchResults.length == 0" class="non-selectable">
        {{ $t("message.list_empty") }}
      </li>
      <li
        v-for="search of searchResults"
        :key="search.id"
        :data-id="search.id"
        @click.stop="setValue"
      >
        <!-- These comments are necessary, that no whitespace is added!
        -->{{ transformTextContent(search)
        }}<!--
      --></li>
    </ul>
  </div>
</template>

<script>
import Query from "../../../src/database/query";


export default {
  name: "DataSelectField",
  data: function () {
    return {
      id: null,
      value: "",
      listVisible: false,
      hideTimeout: null,
      searchResults: [],
      loading: false,
      error: "",
    };
  },
  props: {
    table: {
      type: String,
      required: true,
    },
    attribute: {
      type: String,
    },
    // Text allows us to format the text as we want to.
    // This is an alternative to attribute.
    // Use JavaScript template literals placeholders ('${your_variable}')
    text: {
      type: String,
    },
    query: String,
    queryCommand: String,
    msg: String,
    tooltip: String,
    placeholder: String,
  },
  methods: {
    setValue: function (event) {
      const target = event.target;
      this.value = target.textContent;
      this.id = target.getAttribute("data-id", this.id);
      this.listVisible = false;
    },
    input: function () {
      this.searchEntry();
      this.id = null;
    },
    focus: function () {
      this.showList();
      this.searchEntry();
    },
    showList: function () {
      if (this.hideTimeout) clearTimeout(this.hideTimeout);
      this.listVisible = true;
    },
    hideList: function () {
      this.hideTimeout = setTimeout(() => {
        this.listVisible = false;
        if (!this.id) {
          this.value = "";
        }
      }, 200);
    },
    initId: function () {
      this.getData().forEach((el) => {
        if (el.id > this.$data.id) this.$data.id = el.id + 1;
      });
    },
    getData: function () {
      let loaded;
      try {
        loaded = JSON.parse(window.localStorage.getItem(this.$props.table));
      } catch (e) {
        console.error("Couldn't load data-select", e);
      }

      return loaded || [];
    },
    searchEntry: function () {
      let queryCommand;
      let query;
      if (this.query) {
        query = this.query;
        queryCommand = this.queryCommand;
      } else {
        queryCommand = `search${
          this.table[0].toUpperCase() + this.table.slice(1)
        }`;
        query = `query{
        ${queryCommand}
        (text: "${this.value}"){id, name}
      }`;
      }

      console.log(query);

      Query.raw(query)
        .then((result) => {
          console.log(result.data.data[queryCommand]);
          this.searchResults = result.data.data[queryCommand];
          this.error = "";
        })
        .catch((error) => {
          console.error(error);
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    transformTextContent: function (search) {
      if (this.attribute) return search[this.attribute] || "";
      else if (this.text) {
        return this.text.replace(/\${(.+?)}/g, function (match, name) {
          return search[name] || "";
        });
      }
      return "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../scss/_import.scss";

.visible {
  display: block;
}

.hidden {
  display: none;
}

.data-select {
  display: flex;
  background-color: red;
  position: relative;
}

.error {
  background-color: $red;
}

.name-field {
  flex: 1;

  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  //   border: 1px solid gray;
}

.id-field {
  max-width: 37px;
  background-color: rgb(226, 226, 226);
  border-radius: 0;
  border: none;
  text-align: center;
}

button {
  width: 64px;
}

.search-box {
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  padding-left: 0;
  list-style-type: none;
  background-color: white;
  border: 1px solid whitesmoke;
  width: 100%;
  // padding: 10px;
  box-sizing: border-box;
  z-index: 1000;
  max-height: 50vh;
  overflow-y: auto;

  box-shadow: 1px 2px 3px rgba($color: #000000, $alpha: 0.2);

  li {
    border-bottom: 1px solid whitesmoke;
    padding: 10px;

    &.non-selectable {
      background-color: whitesmoke;
    }

    &:not(.non-selectable):hover {
      color: whitesmoke;
      background-color: $primary-color;
      cursor: pointer;
    }
  }
}
</style>
