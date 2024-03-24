import { setActivePinia, createPinia, storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import * as apiFetch from "@/composables/useApiFetch";
import { fetchKeys } from "../types/enums";
import type { AsyncDataRequestStatus } from "#app";
import { ref } from "vue";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("useAuthStore", () => {
  let store: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    store = useAuthStore();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('creates a user store', () => {
    expect(store).toBeDefined();
  });

  it('has the correct initial state', () => {
    expect(store.isAuthenticated).toBe(false);
  });

  it('correctly updates the auth state', () => {
    store.updateAuthState(true);
    expect(store.isAuthenticated).toBe(true);

    store.updateAuthState(false);
    expect(store.isAuthenticated).toBe(false);
  });

  it('correctly updates state after fetching user', async () => {
    const returnedData = {
      data: ref({
        user: {
          id: '123abc',
          email: 'test@test.com',
          first_name: 'Test',
          last_name: 'User',
          email_verified: false,
          questions_verified: false,
        },
      }),
      error: ref(null),
      pending: ref(false),
      refresh: () => Promise.resolve(),
      clear: () => {},
      status: ref<AsyncDataRequestStatus>('success'),
      execute: () => Promise.resolve(),
    };
    const mockedFetch = vi.spyOn(apiFetch, 'useApiFetch').mockImplementation(() => Promise.resolve(returnedData));

    await store.fetchUser();
    expect(mockedFetch).toHaveBeenCalledOnce();
    expect(mockedFetch).toHaveBeenCalledWith('/auth/user', {
      method: 'GET',
      key: fetchKeys.GetUser,
    });
    expect(store.isAuthenticated).toBe(true);
  });

  it('correctly updates state after email login', async () => {
    const returnedData = {
      data: ref({
          id: '123abc',
          email: 'test@test.com',
          first_name: 'Test',
          last_name: 'User',
          email_verified: false,
          questions_verified: false,
        }),
      error: ref(null),
      pending: ref(false),
      refresh: () => Promise.resolve(),
      clear: () => {},
      status: ref<AsyncDataRequestStatus>('success'),
      execute: () => Promise.resolve(),
    };
    const mockedFetch = vi.spyOn(apiFetch, 'useApiFetch').mockImplementation(() => Promise.resolve(returnedData));
    const { user } = storeToRefs(useUserStore());

    await store.emailLogin('test@test.com', 'password');

    expect(mockedFetch).toHaveBeenCalledOnce();
    expect(mockedFetch).toHaveBeenCalledWith('/auth/login', {
      method: 'POST',
      key: fetchKeys.Login,
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'password'
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    expect(store.isAuthenticated).toBe(true);
    expect(user.value).toHaveProperty('id', '123abc');
    expect(user.value).toHaveProperty('email', 'test@test.com');
    expect(user.value).toHaveProperty('first_name', 'Test');
    expect(user.value).toHaveProperty('last_name', 'User');
    expect(user.value).toHaveProperty('email_verified', false);
    expect(user.value).toHaveProperty('questions_verified', false);
  });

  it('logs out correctly', async () => {
    const userStore = useUserStore();
    const returnedData = {
      data: ref({}),
      error: ref(null),
      pending: ref(false),
      refresh: () => Promise.resolve(),
      clear: () => {},
      status: ref<AsyncDataRequestStatus>('success'),
      execute: () => Promise.resolve(),
    };

    const mockedFetch = vi.spyOn(apiFetch, 'useApiFetch').mockImplementation(() => Promise.resolve(returnedData));

    await store.logout();

    expect(mockedFetch).toHaveBeenCalledOnce();
    expect(mockedFetch).toHaveBeenCalledWith('/auth/logout', {
      method: 'POST',
      key: fetchKeys.Logout,
    });
    expect(store.isAuthenticated).toBe(false);
    expect(userStore.user).toBeNull();
  });

  it('correctly updates state after user registration', async () => {
    const returnedData = {
      data: ref({
          id: '123abc',
          email: 'test@test.com',
          first_name: 'Test',
          last_name: 'User',
          email_verified: false,
          questions_verified: false,
          created_at: '2021-09-01T00:00:00Z',
        }),
      error: ref(null),
      pending: ref(false),
      refresh: () => Promise.resolve(),
      clear: () => {},
      status: ref<AsyncDataRequestStatus>('success'),
      execute: () => Promise.resolve(),
    };

    const registerForm = {
      email: 'test@test.com',
      first_name: 'Test',
      last_name: 'User',
      password: 'password',
      confirm_password: 'password',
    }

    const mockedFetch = vi.spyOn(apiFetch, 'useApiFetch').mockImplementation(() => Promise.resolve(returnedData));
    const { user } = storeToRefs(useUserStore());

    await store.registerUser(registerForm);

    expect(mockedFetch).toHaveBeenCalledOnce();
    expect(mockedFetch).toHaveBeenCalledWith('/auth/register', {
      method: 'POST',
      key: fetchKeys.Register,
      body: JSON.stringify(registerForm),
    });

    expect(store.isAuthenticated).toBe(false);
    expect(user.value).toHaveProperty('id', '123abc');
    expect(user.value).toHaveProperty('email', 'test@test.com');
    expect(user.value).toHaveProperty('first_name', 'Test');
    expect(user.value).toHaveProperty('last_name', 'User');
    expect(user.value).toHaveProperty('email_verified', false);
    expect(user.value).toHaveProperty('questions_verified', false);
  });
});
