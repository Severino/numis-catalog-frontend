<template>
  <div class="simple-formatted-field">
    <Row class="toolbar" style="margin-bottom: 10px">
      <button @click="align('left')"><FormatAlignLeft /></button>
      <button @click="align('center')"><FormatAlignCenter /></button>
      <button @click="align('right')"><FormatAlignRight /></button>
      <div class="spacer"></div>
      <button @click="toggleBold"><FormatBold /></button>
      <button @click="toggleCursive"><FormatItalic /></button>
    </Row>

    <div ref="field" class="formatted-text-area" contenteditable></div>
  </div>
</template>

<script>
import Row from "../layout/Row.vue";

import FormatAlignLeft from "vue-material-design-icons/FormatAlignLeft";
import FormatAlignCenter from "vue-material-design-icons/FormatAlignCenter";
import FormatAlignRight from "vue-material-design-icons/FormatAlignRight";

import FormatBold from "vue-material-design-icons/FormatBold";
import FormatItalic from "vue-material-design-icons/FormatItalic";

export default {
  components: {
    Row,
    FormatAlignLeft,
    FormatAlignCenter,
    FormatAlignRight,
    FormatBold,
    FormatItalic,
  },
  name: "SimpleFormattedField",
  data: function() {
    return {
      range: null,
    };
  },
  methods: {
    setContent: function(str) {
      if(!str){
        str = '<div style="text-align: center;"><br></div>'
      }

      this.$refs.field.innerHTML = str;
    },
    getContent: function() {
      return this.$refs.field.innerHTML;
    },
    getSelected: function() {
      let node = document.getSelection().anchorNode;

      /**
       * Break when selection is outside this element.
       */
      if (this.$refs.field == node || !this.$refs.field.contains(node)) {
        return null;
      } else {
        while (node.parentNode != this.$refs.field) {
          node = node.parentNode;
        }

        if (
          node.nodeType == 3 ||
          (node.nodeType == 1 && node.tagName.toLowerCase() !== "div")
        ) {
          let textNode = node;
          node = document.createElement("div");
          textNode.parentNode.insertBefore(node, textNode);
          node.appendChild(textNode);
        }
      }

      return node;
    },

    align: function(value) {
      const node = this.getSelected();
      if (node) {
        Object.assign(node.style, {
          textAlign: value,
        });
        this.$emit("input", this.$refs.field.innerHTML);
      }
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

.toolbar {
  // background-color: rgb(100, 100, 100);
  margin-bottom: 0  !important;
  > *:not(.spacer) {
    width: unset;
    margin: 0 !important;
    padding: 0;
    padding-top: 3px;
    background-color: rgb(100, 100, 100);
    .material-design-icon__svg {
      height: 18px;
      color: $white;
    }
  }
}

.formatted-text-area {
  @include input();
  font-size: 1rem;
  min-height: 1em;
  // background-color: red;

 

  span {
    display: block;
  }
}
</style>
