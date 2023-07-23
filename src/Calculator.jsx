import "./Calculator.css";

const CALCULATOR_NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const CALCULATOR_OPERATORS = [
  ["C", "←", "/"],
  ["x", "-", "+", "="],
];

const Calculator = () => {
  const onClick = (e) => {
    console.log("clicked", e);
  };

  return (
    <main>
      <div className="calculator-container">
        <div className="calculator-screen">0</div>
        <div className="calculator-upper-buttons">
          {CALCULATOR_OPERATORS[0].map((operator) => (
            <button
              className="calculator-button-num"
              onClick={() => onClick(operator)}
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
              onClick={() => onClick(operator)}
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
              onClick={() => onClick(num)}
              key={num}
            >
              {num}
            </button>
          ))}
          <button onClick={() => onClick(".")}>.</button>
        </div>
      </div>
    </main>
  );
};

export default Calculator;
