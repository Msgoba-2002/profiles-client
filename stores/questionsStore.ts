import { defineStore } from "pinia";
import type { CreateQuestionDto, IQuestion, UpdateQuestionDto, QuestionCreateResponse } from "@/types/question";
import { fetchKeys } from "../types/enums";

export const useQuestionsStore = defineStore('questions', () => {
  const questions = ref<IQuestion[]>([]);

  const addQuestion = async (dto: CreateQuestionDto) => {
    const { data, error } = await useApiFetch('/questions', {
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
    const { data, error } = await useApiFetch(`/questions/${id}`, {
      method: 'PATCH',
      key: fetchKeys.UpdateQuestion,
      body: JSON.stringify(dto),
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    console.log(data.value);
  }

  const fetchQuestions = async () => {
    const { data, error } = await useApiFetch('/questions', {
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
    const { error } = await useApiFetch(`/questions/${id}`, {
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