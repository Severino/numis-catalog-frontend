<template>
  <div class="simple-formatted-field">
    <textarea value="value" @input="input" />
    <!-- <Row class="toolbar" style="margin-bottom: 10px">
      <button @click="align('left')">Left</button>
      <button @click="align('center')">Center</button>
      <button @click="align('right')">Right</button>
      <span style="margin-right: 50px"></span>
      <button @click="toggleBold">Bold</button>
      <button @click="toggleCursive">Cursive</button>
    </Row>

    <div
      ref="field"
      class="formatted-text-area"
      @input="input"
      v-html="value"
      contenteditable
    > -->
    <!-- </div> -->
  </div>
</template>

<script>
import Row from "../layout/Row.vue";
export default {
  components: { Row },
  name: "SimpleFormattedField",
  props: {
    content: String,
    value: {
      type: String,
      required: true,
    },
  },
  watch: {
    // value: function () {
    //   this.$refs.field.innerHTML = this.value || "";
    // },
  },
  methods: {
    getSelected: function () {
      var node = document.getSelection().anchorNode;
      return node.nodeType == 3 ? node.parentNode : node;
    },

    align: function (value) {
      const node = this.getSelected();
      console.log(node);
      Object.assign(node.style, {
        textAlign: value,
        // color: "red",
      });
    },
    toggleBold: function () {
      document.execCommand("bold", false, null);
    },
    toggleCursive: function () {
      document.execCommand("italic", false, null);
    },
    input: function (event) {
      const target = event.target;
      console.log(event.target.value)
      this.$emit("input", target.value);

      // console.log(event.target.innerHTML);
      // this.$emit("input", target.innerHTML);
      // const lastNode = null;
      // target.childNodes.forEach((node, index) => {
      //   // console.log("CREATE LINE");
      //   // TODO: Set care to last position.
      //   // }
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";

.formatted-text-area {
  @include input();
  font-size: 1rem;
  min-height: 240px;
  // background-color: red;

  span {
    display: block;
  }
}
</style>