import { render, screen } from '@testing-library/react';
import { Section7 } from '.';

describe('section-6', () => {
  beforeEach(() => {
    render(<Section7 />);
  });

  it('renders contact form', () => {
    const linkElement = screen.getByTestId('contact-form');
    expect(linkElement).toBeInTheDocument();
  });
})
