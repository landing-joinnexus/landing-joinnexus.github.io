import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Features } from '.';

describe('features', () => {
  beforeEach(() => {
    render(<Features />);
  });

  describe('when user click on a different tab', () => {
    beforeEach(async () => {
      await act(async () => {
        userEvent.click(screen.getByText(/features/i));
      });
    });

    it('should change details', () => {
      const linkElement = screen.getByTestId('details_features');
      expect(linkElement).toBeInTheDocument();
    })
  })
})
