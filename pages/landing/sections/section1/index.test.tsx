import { render, screen } from '@testing-library/react';
import React from 'react';
import { Section1 } from '.';

describe('section-1', () => {

  beforeEach(() => {
    const section6Ref = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { focus } });
    render(<Section1 section6Ref={section6Ref as unknown as React.RefObject<HTMLDivElement>} />);
  });

  it('renders early access form', () => {
    const linkElement = screen.getByTestId('register-early-access-section');
    expect(linkElement).toBeInTheDocument();
  });
})
