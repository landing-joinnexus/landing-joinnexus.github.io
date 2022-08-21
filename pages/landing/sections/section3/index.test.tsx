import { render, screen } from '@testing-library/react';
import { Section3 } from '.';

describe('section-3', () => {
  beforeEach(() => {
    render(<Section3 />);
  });

  it('renders message', () => {
    const linkElement = screen.getByTestId('message');
    expect(linkElement).toBeInTheDocument();
  });

  it('renders mockup', () => {
    const linkElement = screen.getByTestId('mockup');
    expect(linkElement).toBeInTheDocument();
  });
})
