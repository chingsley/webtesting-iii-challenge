import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  it('renders without crashing', () => {
    render(<Dashboard />);
  });

   describe('close/open button', () => {

     it('defaults to "Close Gate" on render', () => {
       const { getByTestId } = render(<Dashboard />);
       const closeBtn = getByTestId(/close-btn/i)
       expect(closeBtn.textContent).toBe('Close Gate');
     });

     it('is disabled when the gate is locked', () => {
      const { getByTestId } = render(<Dashboard />);
      const closeBtn = getByTestId(/close-btn/i)
      const lockBtn = getByTestId(/lock-btn/i)
  
      fireEvent.click(closeBtn); // click once to close the gate and enable the lock button
      
      fireEvent.click(lockBtn); // click to lock the gate
  
      expect(closeBtn).toBeDisabled();
    });

    it('is enabled when the gate is unlocked', () => {
      const { getByTestId } = render(<Dashboard />);
      const gate = getByTestId(/gate-lock-state/i);
      const closeBtn = getByTestId(/close-btn/i)
  
      expect(gate.textContent).toBe('Unlocked');
      expect(closeBtn.hasAttribute('disabled')).toBeFalsy();
    });

    it('toggles the gate state between open and close', () => {
      const { getByTestId } = render(<Dashboard />);
      const closeBtn = getByTestId(/close-btn/i)
      const gateCloseState = getByTestId(/gate-close-state/i)
      expect(gateCloseState.textContent).toBe('Open');
      expect(gateCloseState).toHaveClass('led green-led');

      fireEvent.click(closeBtn);
      expect(gateCloseState.textContent).toBe('Closed');
      expect(gateCloseState).toHaveClass('led red-led');

      fireEvent.click(closeBtn);
      expect(gateCloseState.textContent).toBe('Open');
      expect(gateCloseState).toHaveClass('led green-led');
    });

     it('toggles its textContent between "Lock Gate" and "Unlock Gate" ', () => {
       const { getByTestId } = render(<Dashboard />);
       const closeBtn = getByTestId(/close-btn/i)
       
       expect(closeBtn.textContent).toBe('Close Gate');

       fireEvent.click(closeBtn);
       expect(closeBtn.textContent).toBe('Open Gate');

       fireEvent.click(closeBtn);
       expect(closeBtn.textContent).toBe('Close Gate');
     });

     it('toggles the "disable" attribute of the lock button', () => {
       const { getByTestId } = render(<Dashboard />);
       const closeBtn = getByTestId(/close-btn/i)
       const lockBtn = getByTestId(/lock-btn/i)
       
       expect(lockBtn.hasAttribute('disabled')).toBeTruthy();

       fireEvent.click(closeBtn);
       expect(lockBtn.hasAttribute('disabled')).toBeFalsy();

       fireEvent.click(closeBtn);
       expect(lockBtn.hasAttribute('disabled')).toBeTruthy();
     });

     it('does not change lock/unlock state of the gate" ', () => {
      const { getByTestId } = render(<Dashboard />);
      const closeBtn = getByTestId(/close-btn/i)
      const gateLockState = getByTestId(/gate-lock-state/i)
  
      fireEvent.click(closeBtn); 
      expect(gateLockState.textContent).toBe('Unlocked');
  
      fireEvent.click(closeBtn); 
      expect(gateLockState.textContent).toBe('Unlocked');
  
      fireEvent.click(closeBtn);
      expect(gateLockState.textContent).toBe('Unlocked');
    });

    
   });
});


describe('lock/unlock button', () => {

  afterEach(cleanup);
  it('is disabled at initial state', () => {
    const { getByTestId } = render(<Dashboard />);
    const lockBtn = getByTestId(/lock-btn/i)

    expect(lockBtn).toBeDisabled();
    // expect(lockBtn).toHaveAttribute('disabled');
    // expect(lockBtn.hasAttribute('disabled')).toBeTruthy();
  });

  it('is disabled when the gate is open', () => {
    const { getByTestId } = render(<Dashboard />);
    const gate = getByTestId(/gate-close-state/i);
    const closeBtn = getByTestId(/close-btn/i)
    const lockBtn = getByTestId(/lock-btn/i)

    fireEvent.click(closeBtn); // click once to close
    fireEvent.click(closeBtn); // click again to open

    expect(gate.textContent).toBe('Open');
    expect(lockBtn).toBeDisabled();
  });


  it('is enabled when the gate is closed', () => {
    const { getByTestId } = render(<Dashboard />);
    const gate = getByTestId(/gate-close-state/i);
    const closeBtn = getByTestId(/close-btn/i)
    const lockBtn = getByTestId(/lock-btn/i)

    expect(gate.textContent).toBe('Open');
    fireEvent.click(closeBtn);

    expect(gate.textContent).toBe('Closed');
    expect(lockBtn.hasAttribute('disabled')).toBeFalsy();
  });

  it('toggles the lock state when clicked', () => {
    const { getByTestId } = render(<Dashboard />);
    const gateLockState = getByTestId(/gate-lock-state/i);
    const lockBtn = getByTestId(/lock-btn/i)
    const closeBtn = getByTestId(/close-btn/i)

    expect(gateLockState.textContent).toBe('Unlocked'); // gate is Unlocked by default
    fireEvent.click(closeBtn); // close the gate to enable the lock button

    fireEvent.click(lockBtn); 
    expect(gateLockState.textContent).toBe('Locked');

    fireEvent.click(lockBtn); // click again to Unlock
    expect(gateLockState.textContent).toBe('Unlocked');
  });


  it('toggles the disable attribute of the Close Button', () => {
    const { getByTestId } = render(<Dashboard />);
    const lockBtn = getByTestId(/lock-btn/i)
    const closeBtn = getByTestId(/close-btn/i)

    fireEvent.click(closeBtn); // close the gate to enable the lock button

    fireEvent.click(lockBtn); // click once to Lock the gate
    expect(closeBtn).toBeDisabled();

    fireEvent.click(lockBtn); // click again to Unlock
    expect(closeBtn.hasAttribute('disabled')).toBeFalsy();
  });

  it('toggles its textContent between "Lock Gate" and "Unlock Gate" ', () => {
    const { getByTestId } = render(<Dashboard />);
    const lockBtn = getByTestId(/lock-btn/i)
    const closeBtn = getByTestId(/close-btn/i)

    fireEvent.click(closeBtn); // close the gate to enable the lock button

    fireEvent.click(lockBtn); // click once to Lock the gate
    expect(lockBtn.textContent).toBe('Unlock Gate');

    fireEvent.click(lockBtn); // click again to Unlock
    expect(lockBtn.textContent).toBe('Lock Gate');
  });

  it('does not change close/open state of the gate" ', () => {
    const { getByTestId } = render(<Dashboard />);
    const lockBtn = getByTestId(/lock-btn/i)
    const closeBtn = getByTestId(/close-btn/i)
    const gateCloseState = getByTestId(/gate-close-state/i)

    fireEvent.click(closeBtn); // close the gate to enable the lock button
    expect(gateCloseState.textContent).toBe('Closed');

    fireEvent.click(lockBtn); // click once to Lock the gate
    expect(gateCloseState.textContent).toBe('Closed');

    fireEvent.click(lockBtn); // click again to Unlock
    expect(gateCloseState.textContent).toBe('Closed');
  });
});
