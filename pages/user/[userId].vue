<script setup lang="ts">
definePageMeta({
  middleware:['is-authenticated', 'is-verified'],
});
</script>


<template>
  <section class="py-4">
    dashboard
  </section>
</template>