import { render, screen } from '@testing-library/react';
import { Section5 } from '.';

describe('section-5', () => {
  beforeEach(() => {
    render(<Section5 />);
  });

  it('renders message', () => {
    const linkElement = screen.getByTestId('message');
    expect(linkElement).toBeInTheDocument();
  });
})
