import { useState } from "react";
import "./Calculator.css";

const CALCULATOR_NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const CALCULATOR_OPERATORS = [
  ["C", "←", "/"],
  ["x", "-", "+", "="],
];

const OPERATIONS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "/": (a, b) => a / b,
};

const Calculator = () => {
  const [calc, setCalc] = useState({
    operation: "",
    num: 0,
    res: 0,
    decimal: false,
  });

  const getResultFromOperation = (a, b) => {
    if (calc.operation === "/" && b === "0") {
      return "Err";
    }
    return OPERATIONS[calc.operation](Number(a), Number(b));
  };

  const handleOnClickDecimal = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
      decimal: true,
    });
  };

  const handleOnClickNumber = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (!calc.operation) {
      const number = calc.num === 0 ? value : calc.num + value;
      setCalc({
        ...calc,
        num: number,
        res: number,
      });
    } else {
      setCalc({
        ...calc,
        num: calc.decimal ? calc.num + value : value,
      });
    }
  };

  const handleOnClickOperator = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (value === "=") {
      const rest = getResultFromOperation(calc.res, calc.num);
      setCalc({
        operation: "",
        num: rest,
        res: 0,
        decimal: false,
      });
    } else if (calc.operation) {
      const rest = getResultFromOperation(calc.res, calc.num);
      setCalc({
        ...calc,
        operation: value,
        res: rest,
        decimal: false,
      });
    } else {
      setCalc({ ...calc, operation: value, decimal: false });
    }
  };

  const handleOnClickFormat = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (value === "←") {
      console.log(calc);
      const isEmpty = String(calc.num).length === 1;
      setCalc({
        ...calc,
        num: isEmpty ? 0 : calc.num.slice(0, calc.num.length - 1),
      });
    }
    if (value === "C") {
    }
  };

  return (
    <main>
      <div className="calculator-container">
        <div className="calculator-screen" id="calculator-screen">
          {calc.num}
        </div>
        <div className="calculator-upper-buttons">
          {CALCULATOR_OPERATORS[0].map((operator) => (
            <button
              className="calculator-button-num"
              onClick={
                operator === "/" ? handleOnClickOperator : handleOnClickFormat
              }
              key={operator}
            >
              {operator}
            </button>
          ))}
        </div>

        <div className="calculator-lateral-buttons">
          {CALCULATOR_OPERATORS[1].map((operator) => (
            <button
              className="calculator-button-num"
              onClick={handleOnClickOperator}
              key={operator}
            >
              {operator}
            </button>
          ))}
        </div>

        <div className="calculator-main-buttons">
          {CALCULATOR_NUMBERS.map((num) =>
            num === 0 ? (
              <button
                id="zero-button"
                className="calculator-button-num"
                onClick={handleOnClickNumber}
                key={num}
              >
                {num}
              </button>
            ) : (
              <button
                className="calculator-button-num"
                onClick={handleOnClickNumber}
                key={num}
              >
                {num}
              </button>
            )
          )}
          <button onClick={handleOnClickDecimal}>.</button>
        </div>
      </div>
    </main>
  );
};

export default Calculator;
