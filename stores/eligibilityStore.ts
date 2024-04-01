import { defineStore } from 'pinia';
import { fetchKeys } from '../types/enums';

export const useEligibilityStore = defineStore('eligibility', () => {
  const questions = ref([]);

  const getQuestions = async () => {
    const { data, error } = await useApiFetch('/questions', {
      method: 'GET',
      key: fetchKeys.GetQuestions,
    });

    if (error.value) {
      throw new Error(error.value.message);
    }

    console.log(data.value);
  }

  return {
    questions,
  }
});