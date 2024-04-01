<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated', 'is-verified', 'has-profile', 'is-admin'],
});

</script>


<template>
  <section class="py-4">
    Create Questions
  </section>
</template>