<template>
  <div class="data-select">
    <input
      class="name-field"
      @input="searchEntry"
      @focus="showList"
      @blur="hideList"
      :placeholder="placeholder"
      v-model="value"
    />
    <input class="id-field" type="text" tabindex="-1" :value="id" readonly />
    <ul :class="'search-box ' + (listVisible ? 'visible' : 'hidden')">
      <li
        v-for="search of search_results"
        :key="search.id"
        :data-id="search.id"
        @click.stop="setValue"
      >
        {{ search.name }}
      </li>
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
      search_results: [],
    };
  },
  props: {
    table: {
      type: String,
      required: true,
    },
    attribute: {
      type: String,
      required: true,
    },
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
    showList: function () {
      this.listVisible = true;
    },
    hideList: function () {
      setTimeout(() => {
        this.listVisible = false;
      }, 300);
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
    createEntry: function () {
      // const data = this.getData();
      // let id = 0;
      // data.forEach((datapoint) => {
      //   if (datapoint.id >= id) {
      //     id = datapoint.id + 1;
      //   }
      // });
      // const created = {
      //   id,
      // };
      // created[this.$props.attribute] = this.$data.value;
      // data.push(created);
      // localStorage.setItem(this.$props.table, JSON.stringify(data));
      // this.searchEntry();
    },
    searchEntry: function () {
      const queryCommand = `search${
        this.table[0].toUpperCase() + this.table.slice(1)
      }`;
      const query = `query{
        ${queryCommand}
        (text: "${this.value}"){id, name}
      }`;
      console.log(query);
      Query.raw(query)
        .then((result) => {
          this.search_results = result.data.data[queryCommand];
        })
        .catch(console.error);

      // const data = this.getData();

      // console.log(data);
      // const match = data.filter((el) => {
      //   return el[this.$props.attribute] == this.$data.value;
      // });
      // console.log(match.length);

      // this.$data.id = (match.length == 1)?  match[0].id : null;
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

  box-shadow: 1px 2px 3px rgba($color: #000000, $alpha: 0.2);

  li {
    border-bottom: 1px solid whitesmoke;
    padding: 10px;

    &:hover {
      color: whitesmoke;
      background-color: $primary-color;
      cursor: pointer;
    }
  }
}
</style> 