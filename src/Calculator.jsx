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
  });

  const getResultFromOperation = (a, b) => {
    console.log(calc.operation, a, b);
    if (calc.operation === "/" && b === "0") {
      console.log("soy err");
      return "Err";
    }
    return OPERATIONS[calc.operation](Number(a), Number(b));
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
      const rest = getResultFromOperation(calc.res, value);
      setCalc({
        operation: rest === "Err" ? "" : calc.operation,
        num: value,
        res: rest,
      });
    }
  };

  const handleOnClickOperator = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (value === "=") {
      setCalc({
        operation: "",
        num: calc.res,
        res: 0,
      });
    } else {
      setCalc({ ...calc, operation: value });
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
              onClick={handleOnClickOperator}
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
          <button onClick={handleOnClickNumber}>.</button>
        </div>
      </div>
    </main>
  );
};

export default Calculator;
