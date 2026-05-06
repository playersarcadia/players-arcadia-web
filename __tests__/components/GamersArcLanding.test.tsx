import {render, screen , waitFor} from '@testing-library/react';
import GamersArcLanding from '@/components/GamersArcLanding';
import userEvent from '@testing-library/user-event';
import {jest, describe, beforeEach, it} from '@jest/globals';

// mock the useRouter hook from next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn()
    }),
}));

// mock the WaitingListModal component
jest.mock('@/components/WaitingListModal', () => {
    return function MockWaitingListModal({Open, onClose}: {Open: boolean; onClose: () => void}) {
        return Open ? (
            <div data-testid="waiting-list-modal">
                <p>Waiting List Modal</p>
                <button onClick={onClose}>Close</button>
            </div>
        ) : null;
    }
});

// Mock localStorage
const localStorageMock =(()=>{
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => { store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', { 
value: localStorageMock });

// Mock the matchMedia function
Object.defineProperties(window, {
    matchMedia: {
        writable: true,
        value: jest.fn().mockImplementation(query => ({ 
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), 
            removeListener: jest.fn(), 
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    },
});


describe('GamersArcLanding - Waitlist Modal Behavior', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should NOT auto-open waitlist modal on mount", async () => {
    render(<GamersArcLanding />);
    // Fast-forward time to simulate the 900ms delay
    jest.advanceTimersByTime(1000);

    // Modal should NOT be present
    const modal = screen.queryByTestId("waitlist-modal");
    expect(modal).not.toBeInTheDocument();
  });
  // Fast-forward time to simulate the 900ms delay
  jest.advanceTimersByTime(1000);

  // Modal should NOT be present
  const modal = screen.queryByTestId("waitlist-modal");
  expect(modal).not.toBeInTheDocument();
});
