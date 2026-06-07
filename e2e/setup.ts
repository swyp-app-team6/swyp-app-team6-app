import { device } from 'detox';

beforeEach(async () => {
  await device.reloadReactNative();
});
