<template>
  <div class="data-select">
    <input
      class="name-field"
      @input="input"
      @focus="focus"
      @blur="hideList"
      :placeholder="placeholder"
      v-model="value[attribute]"
      :required="required"
    />
    <input
      class="id-field"
      type="text"
      tabindex="-1"
      :value="value.id"
      readonly
    />
    <ul :class="'search-box ' + (listVisible ? 'visible' : 'hidden')">
      <li v-if="error" class="error non-selectable">{{ error }}</li>
      <li
        v-if="
          (!error && !loading && !searchResults) || searchResults.length == 0
        "
        class="non-selectable"
      >
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
import GraphQLUtils from "../../utils/GraphQLUtils";
import Query from "../../../src/database/query";

export default {
  name: "DataSelectField",
  data: function () {
    return {
      id: null,
      listVisible: false,
      hideTimeout: null,
      searchResults: [],
      loading: false,
      error: "",
    };
  },
  props: {
    value: {
      type: Object,
      validator: function (obj) {
        return obj.id == null || !isNaN(parseInt(obj.id));
      },
    },
    queryParams: {
      type: Array,
      default: function () {
        return ["id", "name"];
      },
    },
    additionalParameters: Object,
    table: {
      type: String,
      required: true,
    },
    attribute: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    // Text allows us to format the text as we want to.
    // This is an alternative to attribute.
    // Use JavaScript template literals placeholders ('${your_variable}')
    text: {
      type: String,
      default: null,
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
      const value = this.value;
      this.listVisible = false;
      value.id = target.getAttribute("data-id", this.id);
      value[this.attribute] = target.textContent;
      this.$emit("input", value);
      this.$emit("select", value);
    },
    input: function (event) {
      const value = this.value;
      value[this.attribute] = event.target.value;
      this.searchEntry(value[this.attribute]);
      value.id = null;
      this.$emit("input", value);
    },
    focus: function () {
      const obj = this.value;
      obj.id = null;
      obj[this.attribute] = "";
      this.$emit("input", obj);
      this.showList();
      this.searchEntry("");
    },
    showList: function () {
      if (this.hideTimeout) clearTimeout(this.hideTimeout);
      this.listVisible = true;
    },
    hideList: function () {
      this.hideTimeout = setTimeout(() => {
        this.listVisible = false;
        if (!this.value.id) {
          const obj = { id: null };
          obj[this.attribute] = "";
          this.$emit("input", obj);
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
    searchEntry: function (str = null) {
      let searchString = str !== null ? str : this.value[this.attribute] || "";

      const queryCommand = this.queryCommand
        ? this.queryCommand
        : `search${this.table[0].toUpperCase() + this.table.slice(1)}`;

      const query = `{
      ${queryCommand}(text: "${searchString}" ${
        this.additionalParameters
          ? Object.entries(this.additionalParameters).map(
              ([key, value]) => `,${key}:${JSON.stringify(value)}`
            )
          : ""
      } ){
        ${GraphQLUtils.buildQueryParams(this.queryParams)}
      }
      }`;

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
      if (this.text) {
        return this.text.replace(/\${(.+?)}/g, function (match, name) {
          const path = name.split(".");
          let target = search;
          for (let i = 0; i < path.length && target != null; i++) {
            target = target[path[i]];
          }

          return target ? target : "";
        });
      } else {
        return search[this.attribute] || "";
      }
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
  border: none;
  text-align: center;
  @include disabled_input;
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
