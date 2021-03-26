<template>
  <div class="removable-input">
    <input type="text" v-model="value" />
    <div class="button">
      <Close @click="remove" />
    </div>
  </div>
</template>

<script>

    import Close from "vue-material-design-icons/Close"

export default {
  name: "RemovableInputField",
  components: {
      Close
  },
  props: {
      value: {
          type:String,
          required: true
      }
  },
  methods: {
      remove: function(){
          this.$emit("remove")
      }
  }
};
</script>

<style lang="scss" scoped>
    .removable-input{
        display: flex;
        
        > .button{
            border-left: none;
            padding: 0 5px;
            box-sizing: border-box;

            display: flex;
            align-items: center;

            span{
                display: flex;
                align-items: center;
            }


            
        }
        
        >input{
            border-right: none;
            flex: 1;
        }
    }
</style>