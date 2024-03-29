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
    <Carousel :items-to-show="2" :wrap-around="true" :autoplay="3000" :transition="500" >
      <Slide v-for="(pic, index) in images" :key="pic">
        <img :src="pic" :alt="'image:' + index" class="object-cover aspect-video" />
      </Slide>
    </Carousel>
  </section>
</template>


<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>