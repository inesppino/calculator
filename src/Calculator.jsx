import { useState } from "react";
import "./Calculator.css";

const CALCULATOR_NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const CALCULATOR_OPERATORS = [
  ["C", "←", "/"],
  ["x", "-", "+", "="],
];

const Calculator = () => {
  const [calc, setCalc] = useState({
    operation: "",
    num: 0,
    res: 0,
  });

  const handleOnClickNumber = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({ ...calc, num: value });
  };

  const handleOnClickOperator = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
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
          {CALCULATOR_NUMBERS.map((num) => (
            <button
              className="calculator-button-num"
              onClick={handleOnClickNumber}
              key={num}
            >
              {num}
            </button>
          ))}
          <button onClick={handleOnClickNumber}>.</button>
        </div>
      </div>
    </main>
  );
};

export default Calculator;
