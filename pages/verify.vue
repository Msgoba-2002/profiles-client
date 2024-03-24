<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated'],
  layout: 'auth-layout',
});

</script>


<template>
  <section class="py-4">
    Verify your email
  </section>
</template>