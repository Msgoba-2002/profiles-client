<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated', 'is-verified', 'has-profile', 'is-admin'],
});

const { fetchQuestions, deleteQuestion } = useQuestionsStore();
await fetchQuestions();
const { questions } = storeToRefs(useQuestionsStore());

const delQues = async (id: string) => {
  await deleteQuestion(id);
}
</script>


<template>
  <section class="py-4">
    <div class="sm:w-[70%] w-full mx-auto bg-oba-red rounded-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto text-lg text-oba-white">Eligibility Questions</h1>
      </div>
      
      <div class="rounded-md bg-oba-gray p-6">
        <div class="flex flex-col gap-4">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-2">
            <span>Question&nbsp;{{ index + 1 }}:</span>
            <span class="flex flex-row justify-between">
              <p class="text-oba-black font-roboto text-base font-light">{{ question.question }}</p>
              <div class="flex flex-row gap-4">
                <Icon @click="() => navigateTo({name: 'admin-questions-edit-questionId', params: { questionId: question.id}})"
                  name="mdi:pencil" size="16px" class="text-oba-black hover:scale-105 cursor-pointer" />
                <Icon @click="() => delQues(question.id)"
                  name="mdi:delete" size="16px" class="text-oba-black hover:scale-105 cursor-pointer" />
              </div>
            </span>

          </div>
        </div>
        <div class="my-6">
          <UiLinkAsBtn label-text="Create Question" :link-dest="{name: 'admin-questions-create'}" class="bg-oba-blue w-full py-2 rounded-md"
            text-style="font-roboto text-lg text-oba-white"/>
        </div>
      </div>
    </div>
  </section>
</template>