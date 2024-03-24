<template>
  <main class="max-w-2xl mx-auto bg-zinc-50">
    <MyHeader></MyHeader>
    <AuthCarousel></AuthCarousel>
    <slot />
    <footer class="w-full px-4 py-2 flex justify-center">
      <span class="text-sm text-oba-black text-center font-roboto">&copy; 2024
        <NuxtLink class="hover:text-oba-blue text-oba-black no-underline" to="https://arcodeh.pro" :external="true">
          Adejoh Umar Odeh
        </NuxtLink>
      </span>
    </footer>
  </main>
</template>