<template>
    <div class="flex row">
        <slot></slot>
    </div>
</template>


<script>

export default {
  name: "LayoutRow"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "@/scss/_import.scss";

    .row{
        display: flex;
    
        >* {
            flex:1;
            &:not(:last-child){
                margin-right: $padding;
            }
        }
    }

</style> 

