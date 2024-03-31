<script setup lang="ts">
const props = defineProps<{
  loadingLabel: string;
}>();
</script>


<template>
  <div class="w-[70%] mx-auto bg-oba-red rounded-md">
    <div class="px-6 py-4">
      <h1 class="font-roboto text-lg text-oba-white">{{ loadingLabel }}</h1>
    </div>
    <div class="rounded-md bg-oba-gray p-6 flex justify-center">
      <Icon name="line-md:loading-alt-loop" size="48px" />
    </div>
  </div>
</template>