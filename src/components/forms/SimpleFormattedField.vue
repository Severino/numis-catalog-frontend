<template>
  <div class="simple-formatted-field">
    <Row class="toolbar" style="margin-bottom: 10px">
      <button @click="align('left')">Left</button>
      <button @click="align('center')">Center</button>
      <button @click="align('right')">Right</button>
      <span style="margin-right: 50px"></span>
      <button @click="toggleBold">Bold</button>
      <button @click="toggleCursive">Cursive</button>
    </Row>

    <div class="formatted-text-area" @input="adjust" contenteditable></div>
  </div>
</template>

<script>
import Row from "../layout/Row.vue";
export default {
  components: { Row },
  name: "SimpleFormattedField",
  props: {
    content: String,
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
      const node = this.getSelected();
      Object.assign(node.style, {
        fontWeight: node.style.fontWeight == "bold" ? "normal" : "bold",
      });
    },
    toggleCursive: function () {
      const node = this.getSelected();

      Object.assign(node.style, {
        fontStyle: node.style.fontStyle == "italic" ? "normal" : "italic",
      });
    },
    adjust: function (event) {
      const target = event.target;

      target.childNodes.forEach((node) => {
        console.log(node);
        if (node.nodeType == 3) {
          console.log("CREATE LINE");
          const line = document.createElement("div");
          target.appendChild(line);
          line.appendChild(node);

          // TODO: Set care to last position.
        }
      });
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