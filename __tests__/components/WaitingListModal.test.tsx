import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WaitingListModal from "@/components/WaitingListModal";
import * as waitingListApi from "@/lib/waiting-list-api";

// Mock the waiting list API
jest.mock("@/lib/waiting-list-api", () => ({
  joinWaitingList: jest.fn(),
  migrateWaitlistModalStorage: jest.fn(),
  WAITLIST_MODAL_STORAGE_KEY: "gamersarc_waitlist_modal_hidden",
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock createPortal
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: any) => node,
}));

describe("WaitingListModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should render when open is true", () => {
    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);

    expect(screen.getByText("Join the waitlist")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByText("Notify me")).toBeInTheDocument();
  });

  it("should not render when open is false", () => {
    render(
      <WaitingListModal open={false} onClose={mockOnClose} theme="dark" />,
    );

    expect(screen.queryByText("Join the waitlist")).not.toBeInTheDocument();
  });

  it("should successfully submit email and join waitlist", async () => {
    // Mock successful API response
    jest
      .spyOn(waitingListApi, "joinWaitingList")
      .mockResolvedValue({ ok: true });

    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    // Enter email
    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "test@example.com");

    // Submit form
    const submitButton = screen.getByText("Notify me");
    await user.click(submitButton);

    // Check API was called with correct email
    await waitFor(() => {
      expect(waitingListApi.joinWaitingList).toHaveBeenCalledWith(
        "test@example.com",
      );
    });

    // Success message should appear
    await waitFor(() => {
      expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
    });
  });

  it("should show error message for empty email", async () => {
    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    // Try to submit without entering email
    const submitButton = screen.getByText("Notify me");
    await user.click(submitButton);

    // Error message should appear
    await waitFor(() => {
      expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
    });

    // API should not be called
    expect(waitingListApi.joinWaitingList).not.toHaveBeenCalled();
  });

  it("should handle API error response", async () => {
    // Mock API error
    jest.spyOn(waitingListApi, "joinWaitingList").mockResolvedValue({
      ok: false,
      message: "Something went wrong. Please try again.",
    });

    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    // Enter email and submit
    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "test@example.com");

    const submitButton = screen.getByText("Notify me");
    await user.click(submitButton);

    // Error message should appear
    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again."),
      ).toBeInTheDocument();
    });
  });

  it('should handle "already on list" scenario (409)', async () => {
    // Mock "already exists" response
    jest.spyOn(waitingListApi, "joinWaitingList").mockResolvedValue({
      ok: false,
      message: "You're already on the list — we'll be in touch!",
    });

    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "existing@example.com");

    const submitButton = screen.getByText("Notify me");
    await user.click(submitButton);

    // Should show "already on list" message
    await waitFor(() => {
      expect(screen.getByText(/already on the list/i)).toBeInTheDocument();
    });
  });

  it("should show loading state during submission", async () => {
    // Mock delayed API response
    jest
      .spyOn(waitingListApi, "joinWaitingList")
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true }), 100),
          ),
      );

    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "test@example.com");

    const submitButton = screen.getByText("Notify me");
    await user.click(submitButton);

    // Loading state should show
    await waitFor(() => {
      expect(screen.getByText("Joining…")).toBeInTheDocument();
    });
  });

  it('should close modal when "Maybe later" is clicked', async () => {
    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    const maybeLaterButton = screen.getByText("Maybe later");
    await user.click(maybeLaterButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should close modal when close button (×) is clicked", async () => {
    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    const closeButton = screen.getByLabelText("Close");
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should close modal when backdrop is clicked", async () => {
    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    const backdrop = screen.getByLabelText("Close waiting list dialog");
    await user.click(backdrop);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should set localStorage flag when dismissed", async () => {
    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    const maybeLaterButton = screen.getByText("Maybe later");
    await user.click(maybeLaterButton);

    expect(localStorageMock.getItem("gamersarc_waitlist_modal_hidden")).toBe(
      "1",
    );
  });

  it("should auto-close modal after successful submission", async () => {
    jest.useFakeTimers();
    jest
      .spyOn(waitingListApi, "joinWaitingList")
      .mockResolvedValue({ ok: true });

    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup({ delay: null });

    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "test@example.com");

    const submitButton = screen.getByText("Notify me");
    await user.click(submitButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
    });

    // Fast-forward timer to trigger auto-close
    jest.advanceTimersByTime(2200);

    expect(mockOnClose).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it("should render in light mode when theme is light", () => {
    render(
      <WaitingListModal open={true} onClose={mockOnClose} theme="light" />,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("light-mode");
  });

  it("should render in dark mode when theme is dark", () => {
    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);

    const dialog = screen.getByRole("dialog");
    expect(dialog.className).not.toContain("light-mode");
  });

  it("should trim whitespace from email before submitting", async () => {
    jest
      .spyOn(waitingListApi, "joinWaitingList")
      .mockResolvedValue({ ok: true });

    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "  test@example.com  ");

    const submitButton = screen.getByText("Notify me");
    await user.click(submitButton);

    await waitFor(() => {
      expect(waitingListApi.joinWaitingList).toHaveBeenCalledWith(
        "test@example.com",
      );
    });
  });

  it("should disable input and button during submission", async () => {
    jest
      .spyOn(waitingListApi, "joinWaitingList")
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true }), 100),
          ),
      );

    render(<WaitingListModal open={true} onClose={mockOnClose} theme="dark" />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText(
      "you@example.com",
    ) as HTMLInputElement;
    await user.type(emailInput, "test@example.com");

    const submitButton = screen.getByText("Notify me") as HTMLButtonElement;
    await user.click(submitButton);

    // Input and button should be disabled during loading
    await waitFor(() => {
      expect(emailInput.disabled).toBe(true);
      expect(submitButton.disabled).toBe(true);
    });
  });
});
