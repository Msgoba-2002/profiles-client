// @vitest-environment nuxt
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import MyHeader from "@/components/MyHeader.vue";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

beforeAll(() => {
  setActivePinia(createPinia());
});
describe('MyHeader Component', () => {
  let store: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    store = useAuthStore();
  });

  it('renders the header logo correctly', async () => {
    await renderSuspended(MyHeader);
    expect(screen.getByAltText('set logo')).toBeDefined();
    expect(screen.getByAltText('set logo').parentElement?.getAttribute('href')).toBe('/');
  });

  it('renders the login button correctly', async () => {
    await renderSuspended(MyHeader);
    expect(screen.getByRole('link', { name: 'Login' })).toBeDefined();
  });

  it('renders the logout button correctly', async () => {
    store.updateAuthState(true);
    await renderSuspended(MyHeader);
    expect(screen.getByRole('button', { name: 'Logout' })).toBeDefined();
  });
});