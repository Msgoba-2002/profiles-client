<script setup lang="ts">
import { fetchKeys } from '@/types/enums';
import type { EligibilityAnswer, EligibilityResponse } from '@/types/eligibility';

definePageMeta({
  middleware: ['is-authenticated', 'is-verified', 'mustnt-have-verified-questions'],
  layout: 'auth-layout',
});


const submitEligibilityCheck = () => {
  submitForm('check-eligibility');
}


const snackbar = useSnackbar();
const { fetchQuestions } = useQuestionsStore();
await fetchQuestions();
const { questions } = storeToRefs(useQuestionsStore());
const { user } = storeToRefs(useUserStore());
const { fetchUser } = useAuthStore();

const isChecking = ref(false);
const handleEligibilityCheck = async (form: Record<string, string>) => {
  isChecking.value = true;
  const dto: EligibilityAnswer[] = [];
  Object.keys(form).forEach((key) => {
    const relevantQuestion = questions.value.find((question) => question.id === key);
    const answer = relevantQuestion?.options.findIndex((option) => option === form[key]);
    dto.push({ questionId: key, providedAnswer: answer as number });
  });
  const { data, error, pending } = await useApiFetch('/question/answers', {
    method: 'POST',
    body: JSON.stringify({ answers: dto }),
    key: fetchKeys.CheckEligibility,
  });
  if (error.value) {
    if (error.value.statusCode === 400 && error.value.data) {
      snackbar.add({
        title: 'Verification Failed',
        text: error.value.data.message,
        type: 'error'
      });
    } else {
      snackbar.add({
        title: 'Error',
        text: error.value.message,
        type: 'error',
      });
    }
  }

  isChecking.value = pending.value;
  const eligibilityResponse = data.value as EligibilityResponse;
  if (eligibilityResponse.success) {
    snackbar.add({
      title: 'Success',
      text: eligibilityResponse.message,
      type: 'success',
    });
    await fetchUser();
    if (user.value) {
      return navigateTo({ name: 'user-userId', params: { userId: user.value.id } });
    }
  } else {
    snackbar.add({
      title: 'Error',
      text: eligibilityResponse.message,
      type: 'error',
    });
  }
}

const handleDeleteAcct = async () => {
  const authStore = useAuthStore();
  const result = await authStore.deleteAccount();
  if (result) {
    const { success } = result;
    if (success) {
      snackbar.add({
        title: 'Success',
        text: 'Account deleted successfully',
        type: 'success',
      });
      setTimeout(() => {
        navigateTo({ name: 'index' });
      }, 3000);
    } else {
      snackbar.add({
        title: 'Error',
        text: `Error: ${result.error}`,
        type: 'error',
      });
    }
  }
}
</script>


<template>
  <section class="py-4">
    <div class="sm:w-[70%] w-full mx-auto bg-oba-red rounded-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto text-lg text-oba-white">Eligibility Check</h1>
      </div>
      <div class="rounded-md bg-oba-gray p-6">
        <FormKit type="form" id="check-eligibility" @submit="handleEligibilityCheck" submit-label="Submit"
          :classes="{
            form: 'flex flex-col gap-6',
          }"
          :submit-attrs="{
            'wrapper-class': 'hidden',
          }"
          :config="{validationVisibility: 'dirty'}">
          <div v-for="question in questions" :key="question.id" class="bg-oba-white rounded-md p-2">
            <FormKit type="radio" :name="question.id" 
              :label="question.question + (question.question.endsWith('?') ? '' : '?')" required
              :options="question.options"
              :classes="{
                label: 'text-oba-black text-base font-roboto',
                wrapper: 'flex flex-col gap-2',
                message: 'text-oba-black text-xs font-roboto italic font-light',
                outer: 'flex flex-col gap-1',
                options: 'flex flex-row justify-between',
              }"
              :validation="[['required']]"
              />
          </div>
        </FormKit>
        <UiBaseBtn @click="submitEligibilityCheck" label-text="Submit" button-type="button" text-style="text-oba-white text-base font-roboto"
          class="w-full bg-oba-blue rounded-md py-2" :is-disabled="isChecking" >
          <template #appendIcon>
            <Icon v-if="isChecking" name="line-md:loading-alt-loop" size="16px" class="text-oba-white" />
          </template>
        </UiBaseBtn>
        <div class="my-8">
          <p class="text-center">Created an account by mistake?</p>
          <UiBaseBtn @click="handleDeleteAcct" label-text="Delete Account" button-type="button" text-style="text-oba-blue text-base font-roboto"
            class="w-full border-2 border-oba-blue rounded-md py-2" />
        </div>
      </div>
    </div>
  </section>
</template>