import { ProjectPlanningCsaPage } from './app.po';

describe('project-planning-csa App', () => {
  let page: ProjectPlanningCsaPage;

  beforeEach(() => {
    page = new ProjectPlanningCsaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
