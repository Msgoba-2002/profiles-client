import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "@/stores/userStore";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("useUserStore", () => {
  let store: ReturnType<typeof useUserStore>;

  beforeEach(() => {
    store = useUserStore();
  });

  it('creates a user store', () => {
    expect(store).toBeDefined();
  });

  it('has the correct initial state', () => {
    expect(store.user).toBeNull();
  });
});