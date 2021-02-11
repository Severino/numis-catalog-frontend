<template>
  <div class="data-select">
    <input
      class="name-field"
      @input="updateId"
      :placeholder="placeholder"
      v-model="value"
    />
    <input class="id-field" type="text" tabindex="-1" :value="id" readonly />
  </div>
</template>

<script>
export default {
  name: "DataSelectField",
  data: function () {
    return {
      id: null,
      value: "",
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
      const data = this.getData();
      let id = 0;
      data.forEach((datapoint) => {
        if (datapoint.id >= id) {
          id = datapoint.id + 1;
        }
      });

      const created = {
        id,
      };

      created[this.$props.attribute] = this.$data.value;

      data.push(created);

      localStorage.setItem(this.$props.table, JSON.stringify(data));
      this.updateId();
    },
    updateId: function () {
      const data = this.getData();

      console.log(data);
      const match = data.filter((el) => {
        return el[this.$props.attribute] == this.$data.value;
      });
      console.log(match.length);

      this.$data.id = (match.length == 1)?  match[0].id : null;
      
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.data-select {
  display: flex;
  background-color: red;
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
</style> 