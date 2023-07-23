import { fireEvent, render, screen } from "@testing-library/react";
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

describe("Clicking buttons", () => {
  it("When a number is clicked, it's been displayed", () => {
    const number = "3";
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");
    const button = screen.getByText(number);
    fireEvent.click(button);
    console.log(number);
    expect(calculatorScreen.innerHTML).toBe(number);
  });
  it("When various number are clicked without an operator, the full number is displayed", () => {
    const firstNumber = "3";
    const secondNumber = "4";
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");
    const firstButton = screen.getByText(firstNumber);
    const secondButton = screen.getByText(secondNumber);
    fireEvent.click(firstButton);
    fireEvent.click(secondButton);

    expect(calculatorScreen.innerHTML).toBe(firstNumber + secondNumber);
  });
});
