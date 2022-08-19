import { render, screen } from '@testing-library/react';
import { LandingPage } from '.';

describe('landing-page', () => {
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
    render(<LandingPage />);
  });

  it('should render section 1', () => {
    const linkElement = screen.getByTestId('register-early-access-section')
    expect(linkElement).toBeInTheDocument();
  })
})
