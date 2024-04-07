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
  <NuxtLink :to="linkDest" v-bind="$attrs" class="flex flex-row items-center justify-center relative">
    <div class="absolute inset-y-2 left-3">
      <slot name="prependIcon"></slot>
    </div>
    <span :class="textStyle">{{ labelText }}</span>
    <div class="absolute inset-y-2 right-3">
      <slot name="appendIcon"></slot>
    </div>
  </NuxtLink>
</template>