<template
  ><div class="div">
    <p>{{ value }}</p>
    <SimpleFormattedField v-model="value" />
  </div>
</template>

<script>
import SimpleFormattedField from "@/components/forms/SimpleFormattedField.vue";

export default {
  components: { SimpleFormattedField },
  data: function() {
    return {
      value: "Hello world",
    };
  },
};
</script>
