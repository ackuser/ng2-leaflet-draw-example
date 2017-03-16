import { Ng2LeafletDrawExamplePage } from './app.po';

describe('ng2-leaflet-draw-example App', () => {
  let page: Ng2LeafletDrawExamplePage;

  beforeEach(() => {
    page = new Ng2LeafletDrawExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
