<template>
    <Overview createPage="CreateCoinMark" overrideProperty="coinmark" query="coinMark" />
</template>

<script>
import Overview from './Overview.vue'
export default {
    name: "CoinMarkOverview",
    components: {
        Overview

    }
}
</script>