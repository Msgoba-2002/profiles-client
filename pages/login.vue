<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const {googleLogin} = useUserStore()
</script>


<template>
  <section class="py-4">
    <button @click="googleLogin">Google</button>
  </section>
</template>