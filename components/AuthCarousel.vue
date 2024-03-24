<script setup lang="ts">
const images = [
  '/msgoba_pic_01.jpeg',
  '/msgoba_pic_02.jpeg',
  '/msgoba_pic_03.jpeg',
];

const displayOrder = ref(images);

if (process.client) {
  setInterval(() => {
    const firstElement = displayOrder.value.shift();
    if (!firstElement) return;
    displayOrder.value.push(firstElement);
  }, 3000);
}

const transitionNames = [
  'slide-right',
  'left-shrink',
  'left-grow'
]
</script>


<template>
  <section class="my-8">
    <div class="flex flex-row px-16 -space-x-8">
      <div v-for="(pic, index) in displayOrder" key="pic" class="h-30 w-60 self-center"
      :class="{ 'z-10': index === 1, 'scale-75': index !== 1 }">
        <Transition :name="transitionNames[index]" mode="out-in">
          <img :src="pic" :alt="'image:' + index" class="object-cover aspect-video shadow-oba-blue" :key="pic"
            :class="{'shadow-lg': index === 1, 'shadow-md': index !== 1}" />
        </Transition>
      </div>
    </div>
  </section>
</template>


<style scoped lang="css">
.left-shrink-enter-from,
.left-shrink-leave-to {
  opacity: 0.4;
  transform: scale(.9) translateX(-30px);
}

.left-grow-enter-from,
.left-grow-leave-to {
  opacity: 0.4;
  transform: scale(1.1) translateX(-30px);
}

.slide-right-enter-active,
.slide-right-leave-active,
.left-shrink-enter-active,
.left-shrink-leave-active,
.left-grow-enter-active,
.left-grow-leave-active {
  transition: all 0.8s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0.4;
  transform: translateX(100%);
}
</style>