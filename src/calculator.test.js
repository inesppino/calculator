import { render } from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator", () => {
  it("renders", () => {
    render(<Calculator />);
  });
});

describe("Initial value", () => {
  it("Initial value zero is displayed", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");

    expect(calculatorScreen.innerHTML).toBe("0");
  });
});
