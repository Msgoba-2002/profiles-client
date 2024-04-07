// @vitest-environment nuxt
import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime';
import LandingPage from '@/pages/index.vue';
import { screen } from '@testing-library/vue';

describe('Landing Page', () => {
  it('can mount the landing page', async () => {
    const component = await mountSuspended(LandingPage);
    expect(component.html()).toContain('MSGOBA 2002');
    expect(component.html()).toContain('Mount Saint Gabriel\'s Secondary School Makurdi Old Boys Association, Set of 2002!');
  });

  it('correctly displays the landing page', async () => {
    await renderSuspended(LandingPage);
    expect(screen.getByRole('link').getAttribute('href')).toBe('/register');
    expect(screen.getByText('If you aren\'t, well...')).toBeDefined();
    expect(screen.getByText('Sayonara...')).toBeDefined();
    expect(screen.getByText('Are you one of us?')).toBeDefined();
    expect(screen.getByAltText('futuristic banner img')).toBeDefined();
  });
});