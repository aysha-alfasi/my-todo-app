import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("header", () => {
  test("should render an img and title", () => {
    render(<Header />);

    const h1Element = screen.getByRole("heading", { level: 1 });
    const imgElement = screen.getByRole("img");

    expect(h1Element).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  test('img must have src = {mainpic} and alt = "logo"', () => {
    render(<Header />);

    const imgElement = screen.getByRole("img");

    expect(imgElement).toHaveAttribute("src", "todoAppLogo.png");
    expect(imgElement).toHaveAttribute("alt", "logo");
  });
});
