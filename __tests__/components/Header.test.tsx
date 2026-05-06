import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";
import { jest, describe, expect, it } from "@jest/globals";

// Mock Next.js Link component
jest.mock("next/link", () => {
  function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  }
  return MockLink;
});

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("PlayersArcadia Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    // Use getAllByText since Home appears in both desktop and mobile nav
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(screen.getAllByText("Features").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Trending").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Teams").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Partners").length).toBeGreaterThan(0);
    expect(screen.getAllByText("More").length).toBeGreaterThan(0);
  });

  it("renders download app button", () => {
    render(<Header />);
    const downloadButton = screen.getByRole("button", {
      name: /download players arcadia mobile app/i,
    });
    expect(downloadButton).toBeInTheDocument();
  });

  it("toggles mobile menu when menu button is clicked", async () => {
    render(<Header />);

    const menuButton = screen.getByLabelText("Toggle menu");
    const user = userEvent.setup();

    // Initially, mobile menu should be hidden
    const mobileNavs = screen
      .getAllByText("Home")
      .map((link) => link.closest("nav"))
      .filter(Boolean);
    const mobileNav = mobileNavs.find((nav) =>
      nav?.classList.contains("md:hidden"),
    );
    expect(mobileNav).toHaveClass("max-h-0", "opacity-0");

    await user.click(menuButton);

    // After click, mobile menu should be visible
    const mobileNavsAfter = screen
      .getAllByText("Home")
      .map((link) => link.closest("nav"))
      .filter(Boolean);
    const mobileNavAfter = mobileNavsAfter.find((nav) =>
      nav?.classList.contains("md:hidden"),
    );
    expect(mobileNavAfter).toHaveClass("max-h-96", "opacity-100");
  });
});
