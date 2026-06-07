import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../src/app/App';

test('renders without crashing', () => {
  render(<App />);
});
