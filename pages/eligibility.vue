<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated', 'is-verified'],
  layout: 'auth-layout',
});


const submitEligibilityCheck = () => {
  submitForm('check-eligibility');
}

const { checkEligibility } = useAuthStore();
const snackbar = useSnackbar();
const { fetchQuestions } = useQuestionsStore();
await fetchQuestions();
const { questions } = storeToRefs(useQuestionsStore());
const handleEligibilityCheck = async (form: Record<string, string>) => {
  const data: Record<string, string> = {};
  Object.keys(form).forEach((key) => {
    data[key] = form[key];
  });
  try {
    const data = await checkEligibility();
    // if (data.statusCode = 200) {
    //   snackbar.add({
    //     title: 'Password Updated',
    //     text: 'Your password has been updated. Please login to continue.',
    //     type: 'success',
    //   });
    //   setTimeout(() => {
    //     return navigateTo({ name: 'login' });
    //   }, 3000);
    // }
  } catch (error) {
    console.log(error);
  }
}
</script>


<template>
  <section class="py-4">
    <div class="w-[70%] mx-auto bg-oba-red rounded-md">
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
          class="w-full bg-oba-blue rounded-md py-2" />
      </div>
    </div>
  </section>
</template>