<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated', 'is-verified', 'has-profile', 'is-admin'],
});

import type { CreateQuestionForm } from '@/types/question';

const answerOptions = [
  { value: 0, label: 'A' },
  { value: 1, label: 'B' },
  { value: 2, label: 'C' },
];

const savingQuestion = ref(false);
const { addQuestion } = useQuestionsStore();
const handleCreateQuestion = async (form: CreateQuestionForm) => {
  savingQuestion.value = true;
  const dto = {
    question: form.question,
    options: [form.option_a, form.option_b, form.option_c],
    correct_option: form.correct_answer,
  }

  await addQuestion(dto);
  savingQuestion.value = false;
  navigateTo({ name: 'admin-questions' });
}

const submitQuestionCreate = () => {
  submitForm('questions-edit');
}

</script>


<template>
  <section class="py-4">
    <div class="sm:w-[70%] w-full mx-auto bg-oba-red rounded-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto text-lg text-oba-white">Create Eligibility Question</h1>
      </div>
      <div class="rounded-md bg-oba-gray p-6">
        <FormKit type="form" id="questions-edit" @submit="handleCreateQuestion" submit-label="Submit"
          :classes="{
            form: 'flex flex-col gap-6',
          }"
          :submit-attrs="{
            'wrapper-class': 'hidden',
          }"
          :config="{validationVisibility: 'dirty'}">
          <FormKit type="textarea" name="question" label="Question" required rows="3"
            :classes="{
              label: 'text-oba-black text-base font-roboto',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-light',
              outer: 'flex flex-col gap-1',
            }"
            :validation="[['required'], ['length', 15, 200]]"
             />

            <h4 class="font-roboto text-oba-black text-lg font-light">Answers</h4>

          <FormKit type="text" name="option_a" label="A" required
            :classes="{
              label: 'text-oba-black text-base font-roboto',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-light',
              outer: 'flex flex-col gap-1',
            }"
            :validation="[['required'], ['length', 5]]" />
          <FormKit type="text" name="option_b" label="B" required
            :classes="{
              label: 'text-oba-black text-base font-roboto',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-light',
              outer: 'flex flex-col gap-1',
            }"
            :validation="[['required'], ['length', 5]]" />
          <FormKit type="text" name="option_c" label="C" required
            :classes="{
              label: 'text-oba-black text-base font-roboto',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-light',
              outer: 'flex flex-col gap-1',
            }"
            :validation="[['required'], ['length', 5]]" />
          
          <div class="w-full bg-oba-red rounded-md p-4 flex flex-col gap-2">
            <FormKit type="radio" name="correct_answer" label="Correct Answer" required
              :options="answerOptions"
              :classes="{
                options: 'flex flex-row justify-between',
                wrapper: 'flex flex-row gap-1 justify-end',
                outer: 'text-oba-white text-base font-roboto',
                label: 'text-oba-white text-base font-roboto'
              }"/>

          </div>
        </FormKit>
        <UiBaseBtn @click="submitQuestionCreate" label-text="Submit" button-type="button" text-style="text-oba-white text-base font-roboto"
          class="w-full bg-oba-blue rounded-md py-2" :is-disabled="savingQuestion" >
          <template #appendIcon>
            <Icon v-if="savingQuestion" name="line-md:loading-alt-loop" size="16px" class="text-oba-white" />
          </template>
        </UiBaseBtn>
      </div>
    </div>
  </section>
</template>