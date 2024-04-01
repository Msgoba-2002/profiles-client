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
  <button v-bind="$attrs" class="flex flex-row items-center justify-center relative">
    <div class="absolute inset-y-2 left-3">
      <slot name="prependIcon"></slot>
    </div>
    <span :class="textStyle">{{ labelText }}</span>
    <div class="absolute inset-y-2 right-3">
      <slot name="appendIcon"></slot>
    </div>
  </button>
</template>