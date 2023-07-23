import "./Calculator.css";

const Calculator = () => {
  return (
    <main>
      <div className="calculator-container">
        <div className="calculator-screen">0</div>
        <div className="calculator-upper-buttons">
          <button>C</button>
          <button>←</button>
          <button>/</button>
        </div>

        <div className="calculator-lateral-buttons">
          <button>x</button>
          <button>-</button>
          <button>+</button>
          <button className="equal-button">=</button>
        </div>

        <div className="calculator-main-buttons">
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button className="zero-button">0</button>
          <button>.</button>
        </div>
      </div>
    </main>
  );
};

export default Calculator;
