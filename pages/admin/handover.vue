<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated', 'is-verified', 'has-profile', 'is-admin'],
});
const { user } = storeToRefs(useUserStore());
</script>


<template>
  <section class="py-4">
    <span>Handover Page</span>
  </section>
</template>