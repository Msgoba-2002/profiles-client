<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only'],
  layout: 'auth-layout',
})
</script>


<template>
  <section class="py-4">
    Reset password request
  </section>
</template>