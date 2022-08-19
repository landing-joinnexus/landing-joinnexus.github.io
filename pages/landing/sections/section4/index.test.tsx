import { render, screen } from '@testing-library/react';
import { Section4 } from '.';

describe('section-4', () => {

  class IntersectionObserver {
    observe = jest.fn()
    disconnect = jest.fn()
    unobserve = jest.fn()
  }
  
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  })
  
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  })

  beforeEach(() => {
    render(<Section4 />);
  });

  it('renders statistics', () => {
    const linkElement = screen.getByTestId('statistics');
    expect(linkElement).toBeInTheDocument();
  });

})