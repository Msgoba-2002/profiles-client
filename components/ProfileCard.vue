<script setup lang="ts">
type ProfileCardProps = {
  idProp: string;
}
const props = defineProps<ProfileCardProps>();
</script>


<template>
  <div class="w-56 h-96 rounded-md flex flex-col gap-0 bg-oba-blue justify-between cursor-pointer hover:opacity-85" :key="idProp">
    <div class="w-full bg-oba-white">
      <img src="https://source.unsplash.com/OGljLs0DnJ4" alt="profile-pic" class="w-full object-contain rounded-t-md" />
    </div>
    <div class="w-full h-16 bg-oba-red rounded-b-md p-2">
      <span class="font-roboto text-lg text-oba-white">Benedict Utukwa</span>
    </div>
  </div>
</template>