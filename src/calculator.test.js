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
    const firstNumButton = screen.getByText(firstNumber);
    const secondNumButton = screen.getByText(secondNumber);
    fireEvent.click(firstNumButton);
    fireEvent.click(secondNumButton);

    expect(calculatorScreen.innerHTML).toBe(firstNumber + secondNumber);
  });

  it("When an operator is clicked, the current number should be displayed", () => {
    const operator = "+";
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");
    const button = screen.getByText(operator);
    fireEvent.click(button);

    expect(calculatorScreen.innerHTML).toBe("0");
  });

  it("When adding various numbers, the current number should be displayed", () => {
    const operator = "+";
    const firstNumber = "3";
    const secondNumber = "4";
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");

    const firstNumButton = screen.getByText(firstNumber);
    const secondNumButton = screen.getByText(secondNumber);
    const addButton = screen.getByText(operator);

    fireEvent.click(firstNumButton);
    fireEvent.click(addButton);
    fireEvent.click(secondNumButton);

    expect(calculatorScreen.innerHTML).toBe(secondNumber);
  });

  it("When adding various numbers and clicking equal button, it should return the result", () => {
    const operator = "+";
    const firstNumber = "3";
    const secondNumber = "4";
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");

    const firstNumButton = screen.getByText(firstNumber);
    const secondNumButton = screen.getByText(secondNumber);
    const addButton = screen.getByText(operator);
    const equalButton = screen.getByText("=");

    fireEvent.click(firstNumButton);
    fireEvent.click(addButton);
    fireEvent.click(secondNumButton);
    fireEvent.click(equalButton);

    expect(calculatorScreen.innerHTML).toBe(
      `${Number(firstNumber) + Number(secondNumber)}`
    );
  });
});
