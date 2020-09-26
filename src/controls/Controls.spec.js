import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Controls from './Controls';

describe('<Controls />', () => {
  it('renders without crashing', () => {
    render(<Controls />);
  });


  describe('Lock/Unlock button', () => {
    it('has initial text "Lock Gate" on render', () => {
      const { getByTestId } = render(<Controls />);
      const lockButton = getByTestId(/lock-btn/i);
      expect(lockButton.textContent).toBe('Lock Gate');
    });

    it('is disabled at initial state', () => {
      const { getByTestId, getAllByRole } = render(<Controls />);
      const lockButton = getByTestId(/lock-btn/i);
      const btns = getAllByRole('button').map(btn => {
        // console.log(btn.textContent);
        return btn;
      });
      // console.log(btns);
      // console.log(btns[0].textContent);
      expect(lockButton).toHaveAttribute('disabled')
      // expect(btns[0]).toHaveAttribute('disabled')
    });
  });

  describe('Close/Open button', () => {
    it('has initial text "Close Gate" on render', () => {
      const { getByTestId } = render(<Controls />);
      const closeButton = getByTestId(/close-btn/i);
      expect(closeButton.textContent).toBe('Close Gate');
    });
  });
});
