import { defineStore } from "pinia";
import type { CreateQuestionDto, IQuestion, UpdateQuestionDto, QuestionCreateResponse } from "@/types/question";
import { fetchKeys } from "../types/enums";
import { ref } from "vue";
import { useApiFetch } from "@/composables/useApiFetch";

export const useQuestionsStore = defineStore('questions', () => {
  const questions = ref<IQuestion[]>([]);

  const addQuestion = async (dto: CreateQuestionDto) => {
    const { data, error } = await useApiFetch('/question/', {
      method: 'POST',
      key: fetchKeys.AddQuestion,
      body: JSON.stringify(dto),
    });

    if (error.value) {
      throw new Error(error.value.message);
    }
    const { id, options, question } = data.value as QuestionCreateResponse;
    questions.value.push({ id, options, question });
  }

  const updateQuestion = async (dto: UpdateQuestionDto, id: string) => {
    const { data, error } = await useApiFetch(`/question/${id}`, {
      method: 'PATCH',
      key: fetchKeys.UpdateQuestion,
      body: JSON.stringify(dto),
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    return { success: true };
  }

  const fetchQuestions = async (forAdmin = false) => {
    let url = '/question/';
    if (forAdmin) {
      url += 'admin'
    }
    const { data, error } = await useApiFetch(url, {
      method: 'GET',
      key: fetchKeys.GetQuestions,
    });

    if (error.value) {
      throw new Error(error.value.message);
    }
    const returnedQuestions = data.value as IQuestion[];
    questions.value = returnedQuestions;
  }

  const deleteQuestion = async (id: string) => {
    const { error } = await useApiFetch(`/question/${id}`, {
      method: 'DELETE',
      key: fetchKeys.DeleteQuestion,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    refreshNuxtData(fetchKeys.GetQuestions);
    fetchQuestions();
  }

  return {
    questions,
    addQuestion,
    updateQuestion,
    fetchQuestions,
    deleteQuestion,
  }
});