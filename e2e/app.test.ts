import { device, element, by, expect as detoxExpect } from 'detox';

describe('App launch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should display the home screen', async () => {
    await detoxExpect(element(by.text('Detail로 이동'))).toBeVisible();
  });
});
