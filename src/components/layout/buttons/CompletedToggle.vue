<template>
  <div class="button button-completed" @click.stop.prevent="toggle">
      <Briefcase v-if="!value" />
      <Check v-if="value" class="active" />
  </div>
</template>

<script>

import Briefcase from "vue-material-design-icons/Briefcase";
import Check from "vue-material-design-icons/Check";

    

export default {
    name: "CompletedButton",
    components: {
        Briefcase,
        Check
    },
    props: {
        value: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        toggle: function(){
            this.$emit("input", !this.value)
        },
        stop(event){
            console.log(event)
            event.stopPropagation()
            event.preventDefault()
        }
    }
}
</script>

<style lang="scss" scoped>

.active svg {
    fill: #3CB8FF;
}

.button {
    border-radius: 0 !important;
    border: none;
    background-color: transparent;

    &:hover{
        background-color: rgb(223, 223, 223);
    }
}
</style>