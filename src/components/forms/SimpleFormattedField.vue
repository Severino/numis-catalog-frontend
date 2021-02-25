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

    <div
      v-once
      ref="field"
      class="formatted-text-area"
      @input="input"
      v-html="value"
      contenteditable
    ></div>
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
  data: function() {
    return {
      range: null,
    };
  },
  watch: {
    value: function(value) {
      console.log(value);
    },
  },
  methods: {
    getSelected: function() {
      let node = document.getSelection().anchorNode;
      while (
        node.parentNode &&
        !node.parentNode.hasAttribute("contenteditable")
      ) {
        node = node.parentNode;
      }
      console.log(node.nodeType == 3);
      if (node.parentNode && node.nodeType == 3) {
        let textNode = node;
        node = document.createElement("div");
        textNode.parentNode.insertBefore(node, textNode);
        node.appendChild(textNode);
      }
      // if(node.nodeType)
      return node;
    },

    align: function(value) {
      const node = this.getSelected();
      console.log(node);
      Object.assign(node.style, {
        textAlign: value,
      });
      this.$emit("input", this.$refs.field.innerHTML);

    },
    toggleBold: function() {
      document.execCommand("bold", false, null);
      this.$emit("input", this.$refs.field.innerHTML);
    },
    toggleCursive: function() {
      document.execCommand("italic", false, null);
      this.$emit("input", this.$refs.field.innerHTML);
    },
    input: function(event) {
      const target = event.target;
      this.$emit("input", target.innerHTML);
    },

    /**
     * Thankfully taken from: https://gist.github.com/dantaex/543e721be845c18d2f92652c0ebe06aa
     */
    saveSelection: function() {
      if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          return sel.getRangeAt(0);
        }
      } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
      }
      return null;
    },
    restoreSelection: function(range) {
      if (range) {
        if (window.getSelection) {
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (document.selection && range.select) {
          range.select();
        }
      }
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
