import { useCallback, useEffect, useState } from "react";
import "./Calculator.css";

const OPERATOR_NAME = {
  RESET: "C",
  DELETE: "←",
  ADD: "+",
  SUBSTRACT: "-",
  MULTIPLY: "x",
  DIVIDE: "/",
  EQUALS: "=",
  DECIMAL: ".",
};
const ERROR_MESSAGE = "Err";
const CALCULATOR_NUMBERS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const CALCULATOR_OPERATORS = [
  [OPERATOR_NAME.RESET, OPERATOR_NAME.DELETE, OPERATOR_NAME.DIVIDE],
  [
    OPERATOR_NAME.MULTIPLY,
    OPERATOR_NAME.SUBSTRACT,
    OPERATOR_NAME.ADD,
    OPERATOR_NAME.EQUALS,
  ],
];

const OPERATIONS = {
  [OPERATOR_NAME.ADD]: (a, b) => a + b,
  [OPERATOR_NAME.SUBSTRACT]: (a, b) => a - b,
  [OPERATOR_NAME.MULTIPLY]: (a, b) => a * b,
  [OPERATOR_NAME.DIVIDE]: (a, b) => a / b,
};

const getResultFromOperation = ({ a, b, operator }) => {
  if (operator === OPERATOR_NAME.DIVIDE && b === "0") {
    return ERROR_MESSAGE;
  }
  return OPERATIONS[operator](Number(a), Number(b));
};

const INITIAL_STATE = {
  operation: "",
  num: 0,
  res: 0,
  decimal: false,
};

const Calculator = () => {
  const [calc, setCalc] = useState(INITIAL_STATE);

  const handleOnClickNumber = useCallback(
    (e) => {
      const value = e.target.innerHTML;
      if (String(calc.num).length > 14) return;
      if (!calc.operation) {
        const number = calc.num === 0 ? value : calc.num + value;
        setCalc((calc) => ({
          ...calc,
          num: number,
          res: number,
        }));
      } else {
        setCalc((calc) => ({
          ...calc,
          num: calc.decimal
            ? calc.num + value
            : calc.num
            ? calc.num + value
            : value,
        }));
      }
    },
    [calc]
  );

  const handleOnClickFormat = useCallback(
    (e) => {
      const value = e.target.innerHTML;
      if (value === OPERATOR_NAME.DELETE) {
        const isEmpty = String(calc.num).length === 1;
        setCalc({
          ...calc,
          num: isEmpty ? 0 : String(calc.num).slice(0, calc.num.length - 1),
        });
      }
      if (value === OPERATOR_NAME.RESET) {
        setCalc(INITIAL_STATE);
      }
    },
    [calc]
  );

  const handleOnClickDecimal = useCallback(
    (e) => {
      const value = e.target.innerHTML;
      setCalc({
        ...calc,
        num: !calc.num.toString().includes(OPERATOR_NAME.DECIMAL)
          ? calc.num + value
          : calc.num,
        decimal: true,
      });
    },
    [calc]
  );

  const handleOnClickOperator = useCallback(
    (e) => {
      const value = e.target.innerHTML;
      if (value === OPERATOR_NAME.EQUALS) {
        const rest = getResultFromOperation({
          a: calc.res,
          b: calc.num,
          operator: calc.operation,
        });
        setCalc({
          operation: "",
          num: rest,
          res: rest,
          decimal: false,
        });
      } else if (calc.operation) {
        const rest = getResultFromOperation({
          a: calc.res,
          b: calc.num,
          operator: calc.operation,
        });
        setCalc({
          operation: value,
          num: null,
          res: rest,
          decimal: false,
        });
      } else {
        setCalc({ ...calc, operation: value, decimal: false, num: null });
      }
    },
    [calc]
  );

  const detectKeyDown = useCallback(
    (e) => {
      e.preventDefault();
      const keyPressed = e.key;
      if (CALCULATOR_NUMBERS.includes(keyPressed)) {
        handleOnClickNumber({ target: { innerHTML: keyPressed } });
      } else if (keyPressed === "c" || keyPressed === OPERATOR_NAME.RESET) {
        handleOnClickFormat({ target: { innerHTML: OPERATOR_NAME.RESET } });
      } else if (keyPressed === "Backspace" || keyPressed === "Delete") {
        handleOnClickFormat({ target: { innerHTML: OPERATOR_NAME.DELETE } });
      } else if (keyPressed === "," || keyPressed === OPERATOR_NAME.DECIMAL) {
        handleOnClickDecimal({
          target: { innerHTML: OPERATOR_NAME.DECIMAL },
        });
      } else if (
        CALCULATOR_OPERATORS[1].includes(keyPressed) ||
        keyPressed === OPERATOR_NAME.DIVIDE
      ) {
        handleOnClickOperator({ target: { innerHTML: keyPressed } });
      } else if (keyPressed === "Enter") {
        handleOnClickOperator({
          target: { innerHTML: OPERATOR_NAME.EQUALS },
        });
      } else if (keyPressed === "*") {
        handleOnClickOperator({
          target: { innerHTML: OPERATOR_NAME.MULTIPLY },
        });
      } else {
        return;
      }
    },
    [
      handleOnClickNumber,
      handleOnClickFormat,
      handleOnClickDecimal,
      handleOnClickOperator,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    return () => {
      document.removeEventListener("keydown", detectKeyDown);
    };
  }, [detectKeyDown]);

  return (
    <main>
      <div className="calculator-container">
        <div
          className="calculator-screen"
          id="calculator-screen"
          data-testid="calculator-result"
        >
          {calc.num ? calc.num : calc.res}
        </div>
        <div className="calculator-upper-buttons">
          {CALCULATOR_OPERATORS[0].map((operator) => (
            <button
              onClick={
                operator === OPERATOR_NAME.DIVIDE
                  ? handleOnClickOperator
                  : handleOnClickFormat
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
              id={operator === OPERATOR_NAME.EQUALS ? "equal-button" : null}
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
              id={num === "0" ? "zero-button" : null}
              data-testid={num === "0" ? "zero-button" : null}
              onClick={handleOnClickNumber}
              key={num}
            >
              {num}
            </button>
          ))}
          <button onClick={handleOnClickDecimal}>.</button>
        </div>
      </div>
    </main>
  );
};

export default Calculator;
