const PERMISSIONS = {
  IOS: {
    CAMERA: 'ios.permission.CAMERA',
  },
  ANDROID: {
    CAMERA: 'android.permission.CAMERA',
  },
};

const RESULTS = {
  UNAVAILABLE: 'unavailable',
  DENIED: 'denied',
  LIMITED: 'limited',
  GRANTED: 'granted',
  BLOCKED: 'blocked',
};

const check = jest.fn(() => Promise.resolve(RESULTS.UNAVAILABLE));
const request = jest.fn(() => Promise.resolve(RESULTS.GRANTED));

module.exports = { PERMISSIONS, RESULTS, check, request };
