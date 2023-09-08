import { fireEvent, render, screen } from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator", () => {
  it("renders", () => {
    render(<Calculator />);
  });
});

function getActions(container) {
  return {
    operators: {
      add: container.getByText("+"),
      substract: container.getByText("-"),
      multiply: container.getByText("x"),
      divide: container.getByText("/"),
      equal: container.getByText("="),
      decimal: container.getByText("."),
      delete: container.getByText("←"),
      reset: container.getByText("C"),
    },
    numbers: {
      zero: container.getByTestId("zero-button"),
      three: container.getByText("3"),
      four: container.getByText("4"),
    },
  };
}

describe("Initial value", () => {
  let calculator;
  beforeEach(() => {
    calculator = render(<Calculator />);
  });

  it("Initial value zero is displayed", () => {
    const calculatorScreen = calculator.getByTestId("calculator-result");
    expect(calculatorScreen.textContent).toBe("0");
  });
});

describe("Clicking operator and number buttons", () => {
  let calculator;
  let actions;
  beforeEach(() => {
    calculator = render(<Calculator />);
    actions = getActions(calculator);
  });
  it("When a number is clicked, it's been displayed", () => {
    fireEvent.click(actions.numbers.four);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("4");
  });
  it("When various number are clicked without an operator, the full number is displayed", () => {
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.numbers.three);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("43");
  });
  it("When an operator is clicked, the current number should be displayed", () => {
    fireEvent.click(actions.operators.add);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("0");
  });
  it("When adding various numbers, the current number should be displayed", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.add);
    fireEvent.click(actions.numbers.four);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("4");
  });
  it("When adding various numbers and clicking equal button, it should return the result", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.add);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.equal);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("7");
  });
  it("When adding various two-digit numbers and clicking equal button, it should return the result", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.add);
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.equal);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("68");
  });
  it("When adding and substracting various numbers and clicking equal button, it should return the result", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.add);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.substract);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.equal);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("3");
  });
  it("When multiplying various numbers and clicking equal button, it should return the result", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.multiply);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.equal);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("12");
  });
  it("When dividing various numbers and clicking equal button, it should return the result", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.divide);
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.equal);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("1");
  });
  it("When dividing by zero and clicking equal button, it should return an error", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.divide);
    fireEvent.click(actions.numbers.zero);
    fireEvent.click(actions.operators.equal);
    expect(calculator.getByTestId("calculator-result").textContent).toBe("Err");
  });
  it("When adding decimals, it should return the result", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.decimal);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.add);
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.decimal);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.equal);

    expect(calculator.getByTestId("calculator-result").textContent).toBe("6.8");
  });
});

describe("Clicking delete and reset buttons", () => {
  let calculator;
  let actions;
  beforeEach(() => {
    calculator = render(<Calculator />);
    actions = getActions(calculator);
  });
  it("When clicking delete, it deletes", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.delete);

    expect(calculator.getByTestId("calculator-result").textContent).toBe("3");
  });
  it("When clicking reset (C), it resets", () => {
    fireEvent.click(actions.numbers.three);
    fireEvent.click(actions.operators.add);
    fireEvent.click(actions.numbers.four);
    fireEvent.click(actions.operators.reset);

    expect(calculator.getByTestId("calculator-result").textContent).toBe("0");
  });
});
