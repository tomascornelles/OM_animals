import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Title', () => {
  render(<App />);
  const mainTitle = screen.getByText(/animal lovers/i);
  expect(mainTitle).toBeInTheDocument();
});
