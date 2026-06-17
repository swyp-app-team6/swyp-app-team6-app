import React from 'react';
import { render, screen } from '@testing-library/react-native';

jest.mock('react-native-config', () => ({
  PROJECT_ENV: 'local',
}));

import LocalEnvBadge from '.';

describe('LocalEnvBadge', () => {
  afterEach(() => {
    jest.requireMock('react-native-config').PROJECT_ENV = 'local';
  });

  describe('PROJECT_ENV가 "local"일 때', () => {
    it('LOCAL 뱃지를 렌더링한다', async () => {
      await render(<LocalEnvBadge />);
      expect(screen.getByTestId('local-env-badge')).toBeTruthy();
    });

    it('"LOCAL" 텍스트를 표시한다', async () => {
      await render(<LocalEnvBadge />);
      expect(screen.getByText('LOCAL')).toBeTruthy();
    });
  });

  describe('PROJECT_ENV가 "local"이 아닐 때', () => {
    it('아무것도 렌더링하지 않는다', async () => {
      jest.requireMock('react-native-config').PROJECT_ENV = 'production';
      await render(<LocalEnvBadge />);
      expect(screen.queryByTestId('local-env-badge')).toBeNull();
    });
  });
});
