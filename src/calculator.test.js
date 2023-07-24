import { fireEvent, render, screen } from "@testing-library/react";
import Calculator from "./Calculator";

const ADD_OPERATOR = "+";
const SUBSTRACT_OPERATOR = "-";
const MULTIPLY_OPERATOR = "x";
const DIVIDE_OPERATOR = "/";
const EQUAL_OPERATOR = "=";
const FIRST_NUMBER = "3";
const SECOND_NUMBER = "4";
const ZERO_NUMBER_ID = "#zero-button";

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

describe("Clicking operator and number buttons", () => {
  it("When a number is clicked, it's been displayed", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");
    const button = screen.getByText(FIRST_NUMBER);
    fireEvent.click(button);
    expect(calculatorScreen.innerHTML).toBe(FIRST_NUMBER);
  });

  it("When various number are clicked without an operator, the full number is displayed", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");
    const firstNumButton = screen.getByText(FIRST_NUMBER);
    const secondNumButton = screen.getByText(SECOND_NUMBER);
    fireEvent.click(firstNumButton);
    fireEvent.click(secondNumButton);

    expect(calculatorScreen.innerHTML).toBe(FIRST_NUMBER + SECOND_NUMBER);
  });

  it("When an operator is clicked, the current number should be displayed", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");
    const button = screen.getByText(ADD_OPERATOR);
    fireEvent.click(button);

    expect(calculatorScreen.innerHTML).toBe("0");
  });

  it("When adding various numbers, the current number should be displayed", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");

    const firstNumButton = screen.getByText(FIRST_NUMBER);
    const secondNumButton = screen.getByText(SECOND_NUMBER);
    const addButton = screen.getByText(ADD_OPERATOR);

    fireEvent.click(firstNumButton);
    fireEvent.click(addButton);
    fireEvent.click(secondNumButton);

    expect(calculatorScreen.innerHTML).toBe(SECOND_NUMBER);
  });

  it("When adding various numbers and clicking equal button, it should return the result", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");

    const firstNumButton = screen.getByText(FIRST_NUMBER);
    const secondNumButton = screen.getByText(SECOND_NUMBER);
    const addButton = screen.getByText(ADD_OPERATOR);
    const equalButton = screen.getByText(EQUAL_OPERATOR);

    fireEvent.click(firstNumButton);
    fireEvent.click(addButton);
    fireEvent.click(secondNumButton);
    fireEvent.click(equalButton);

    expect(calculatorScreen.innerHTML).toBe(
      `${Number(FIRST_NUMBER) + Number(SECOND_NUMBER)}`
    );
  });
  it("When adding and substracting various numbers and clicking equal button, it should return the result", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");

    const firstNumButton = screen.getByText(FIRST_NUMBER);
    const secondNumButton = screen.getByText(SECOND_NUMBER);
    const addButton = screen.getByText(ADD_OPERATOR);
    const substractButton = screen.getByText(SUBSTRACT_OPERATOR);
    const equalButton = screen.getByText(EQUAL_OPERATOR);

    fireEvent.click(firstNumButton);
    fireEvent.click(addButton);
    fireEvent.click(secondNumButton);

    fireEvent.click(substractButton);
    fireEvent.click(secondNumButton);

    fireEvent.click(equalButton);

    expect(calculatorScreen.innerHTML).toBe(FIRST_NUMBER);
  });
  it("When multiplying various numbers and clicking equal button, it should return the result", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");

    const firstNumButton = screen.getByText(FIRST_NUMBER);
    const secondNumButton = screen.getByText(SECOND_NUMBER);
    const multiplyButton = screen.getByText(MULTIPLY_OPERATOR);
    const equalButton = screen.getByText(EQUAL_OPERATOR);

    fireEvent.click(firstNumButton);
    fireEvent.click(multiplyButton);
    fireEvent.click(secondNumButton);

    fireEvent.click(equalButton);

    expect(calculatorScreen.innerHTML).toBe(
      `${Number(FIRST_NUMBER) * Number(SECOND_NUMBER)}`
    );
  });
  it("When dividing various numbers and clicking equal button, it should return the result", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");

    const firstNumButton = screen.getByText(FIRST_NUMBER);
    const divideButton = screen.getByText(DIVIDE_OPERATOR);
    const equalButton = screen.getByText(EQUAL_OPERATOR);

    fireEvent.click(firstNumButton);
    fireEvent.click(divideButton);
    fireEvent.click(firstNumButton);

    fireEvent.click(equalButton);

    expect(calculatorScreen.innerHTML).toBe(
      `${Number(FIRST_NUMBER) / Number(FIRST_NUMBER)}`
    );
  });
  it("When dividing by zero and clicking equal button, it should return an error", () => {
    const calculator = render(<Calculator />);
    const calculatorScreen =
      calculator.container.querySelector("#calculator-screen");

    const firstNumButton = screen.getByText(FIRST_NUMBER);
    const secondNumButton = calculator.container.querySelector(ZERO_NUMBER_ID);
    const divideButton = screen.getByText(DIVIDE_OPERATOR);
    const equalButton = screen.getByText(EQUAL_OPERATOR);

    fireEvent.click(firstNumButton);
    fireEvent.click(divideButton);
    fireEvent.click(secondNumButton);

    fireEvent.click(equalButton);

    expect(calculatorScreen.innerHTML).toBe("Err");
  });
});
