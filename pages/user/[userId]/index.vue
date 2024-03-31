<script setup lang="ts">
definePageMeta({
  middleware:['is-authenticated', 'is-verified', 'is-eligible'],
});
</script>


<template>
  <section class="py-4">
    dashboard
  </section>
</template>