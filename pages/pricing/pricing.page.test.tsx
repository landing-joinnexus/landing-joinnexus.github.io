import { render, screen } from '@testing-library/react';
import PricingPage from './pricing.page';

test('renders default label', () => {
  render(<PricingPage />);
  const linkElement = screen.getByText(/Pricing/i);
  expect(linkElement).toBeInTheDocument();
});
