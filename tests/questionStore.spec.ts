import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { useQuestionsStore } from '@/stores/questionsStore';
import * as apiFetch from '@/composables/useApiFetch';
import type { AsyncDataRequestStatus } from '#app';
import { ref } from 'vue';

beforeAll(() => {
  setActivePinia(createPinia());
});

describe('useQuestionStore', () => {
    let store: ReturnType<typeof useQuestionsStore>;
  
    beforeEach(() => {
      store = useQuestionsStore();
    });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a question store', () => {
    expect(store).toBeDefined();
  });

  it('has the correct initial state', () => {
    expect(store.questions).toEqual([]);
  });

  it('correctly adds a question', async () => {
    const dto = {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correct_option: 0,
    };
    const returnedData = {
      data: ref({
        id: '123abc',
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
      }),
      error: ref(null),
      pending: ref(false),
      refresh: () => Promise.resolve(),
      clear: () => {},
      status: ref<AsyncDataRequestStatus>('success'),
      execute: () => Promise.resolve(),
    };
    const mockedFetch = vi.spyOn(apiFetch, 'useApiFetch').mockImplementation(() => Promise.resolve(returnedData));

    await store.addQuestion(dto);
    expect(store.questions).toEqual([{ id: '123abc', question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'] }]);
    expect(mockedFetch).toHaveBeenCalledWith('/questions', { method: 'POST', key: 'AddQuestion', body: JSON.stringify(dto) });
  });

  it('correctly fetches questions', async () => {
    const returnedData = {
      data: ref([
        { id: '123abc', question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'] },
        { id: '456def', question: 'What is the capital of Germany?', options: ['Paris', 'London', 'Berlin', 'Madrid'] },
        { id: '456def', question: 'What is the capital of Spain?', options: ['Paris', 'London', 'Berlin', 'Madrid'] },
      ]),
      error: ref(null),
      pending: ref(false),
      refresh: () => Promise.resolve(),
      clear: () => { },
      status: ref<AsyncDataRequestStatus>('success'),
      execute: () => Promise.resolve(),
    };

    const mockedFetch = vi.spyOn(apiFetch, 'useApiFetch').mockImplementation(() => Promise.resolve(returnedData));

    await store.fetchQuestions();
    expect(store.questions).toEqual([
      { id: '123abc', question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'] },
      { id: '456def', question: 'What is the capital of Germany?', options: ['Paris', 'London', 'Berlin', 'Madrid'] },
      { id: '456def', question: 'What is the capital of Spain?', options: ['Paris', 'London', 'Berlin', 'Madrid'] },
    ]);
    expect(mockedFetch).toHaveBeenCalledWith('/questions', { method: 'GET', key: 'GetQuestions' });
  });
});