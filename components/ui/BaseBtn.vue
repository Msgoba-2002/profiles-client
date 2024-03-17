<script setup lang="ts">
type BtnProps = {
  labelText: string;
  buttonType: string;
  textStyle: string;
}
const props = withDefaults(defineProps<BtnProps>(), {
  buttonType: 'button',
  textStyle: 'text-oba-white text-lg'
});
</script>


<template>
  <button v-bind="$attrs" class="flex flex-row items-center gap-2">
    <slot name="prependIcon"></slot>
    <span :class="textStyle">{{ labelText }}</span>
    <slot name="appendIcon"></slot>
  </button>
</template>