import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

jest.mock('react-native-config', () => ({
  PROJECT_ENV: 'local',
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

import LocalEnvBadge from '.';

describe('LocalEnvBadge', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

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

    it('뱃지 탭 시 playground 화면으로 이동한다', async () => {
      await render(<LocalEnvBadge />);
      fireEvent.press(screen.getByTestId('local-env-badge'));
      expect(mockNavigate).toHaveBeenCalledWith('playground');
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
