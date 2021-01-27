<template>
  <div class="inventory-page">
    <h1>Inventar</h1>
    <p>
      The inventory provides an overview over all possible Database objects.
    </p>
    <ul>
      <li>
        <router-link :to="{ name: 'Material' }">Material</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Inventory",
};
</script>