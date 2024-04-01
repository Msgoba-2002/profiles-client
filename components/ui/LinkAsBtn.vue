<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router/auto';


type LinkProps = {
  labelText: string;
  linkDest: RouteLocationRaw;
  textStyle: string;
}
const props = withDefaults(defineProps<LinkProps>(), {
  textStyle: 'text-oba-white text-lg',
});
</script>


<template>
  <NuxtLink :to="linkDest" v-bind="$attrs" class="flex flex-row items-center justify-center">
    <span :class="textStyle">{{ labelText }}</span>
  </NuxtLink>
</template>