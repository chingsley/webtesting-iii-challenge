import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Display from './Display';

describe('<Display />', () => {
  it('renders without crashing', () => {
    render(<Display />);
  });

  it('has an initial lock state of "Unlocked"', () => {
    const { getByTestId } = render(<Display />);
    const gateLockState = getByTestId(/gate-lock-state/i)
    expect(gateLockState.textContent).toBe('Unlocked');
  });

  it('has is "Unlocked" at initial state', () => {
    const { getByTestId } = render(<Display />);
    const gateLockState = getByTestId(/gate-lock-state/i)
    expect(gateLockState.textContent).toBe('Unlocked');
  });

  it('has is "Open" at initial state', () => {
    const { getByTestId } = render(<Display />);
    const gateCloseState = getByTestId(/gate-close-state/i)
    expect(gateCloseState.textContent).toBe('Open');
    // console.log(gateCloseState)
    expect(gateCloseState).toHaveClass('led green-led');
  });

  it('has "led green-led" classes at initial state', () => {
    const { getByTestId } = render(<Display />);
    const gateCloseState = getByTestId(/gate-close-state/i)
    const gateLockState = getByTestId(/gate-Lock-state/i)
    expect(gateLockState).toHaveClass('led green-led');
    expect(gateCloseState).toHaveClass('led green-led');
  });
});