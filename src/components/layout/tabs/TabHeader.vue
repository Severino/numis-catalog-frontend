<template>
    <div class="tab-header" @click="$emit('select')">
        <slot />
    </div>
</template>

<script>
export default {
    name: "TabHeader"
}
</script>