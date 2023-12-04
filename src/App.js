import { useState } from "react";
import "./App.css";
import styled from "styled-components";

function App() {
  const [calc, setCalc] = useState("");
  // 계산결과 state
  const [operCheck, setOperCheck] = useState(true);
  const [pointCheck, setPointCheck] = useState(true);

  const getNum = (e) => {
    setCalc((prev) => prev + e.target.value);
    setOperCheck(true);
  };

  const getOper = (e) => {
    if (operCheck) {
      setCalc((prev) => prev + e.target.value);
      setOperCheck(false);
      setPointCheck(true); // 소숫점 다시 사용위해
    }
  };

  const getPoint = (e) => {
    if (calc.length === 0) {
      return;
    }
    if (pointCheck) {
      setCalc((prev) => prev + e.target.value);
      setPointCheck(false);
    }
  };

  const getResult = () => {
    let replace_str = calc.replace(/×/gi, "*").replace(/÷/gi, "/");

    if (isNaN(eval(replace_str))) {
      setCalc("");
    } else if (eval(replace_str) == Infinity) {
      alert("0으로 나눌수 없습니다.");
      setCalc("");
      return false;
    } else {
      setCalc((prev) => eval(replace_str));
    }
  };

  const delCalc = () => {
    setPointCheck(true);
    setOperCheck(true);
    let str = String(calc).slice(0, -1);
    setCalc((prev) => str);
  };

  const allClear = () => {
    setPointCheck(true);
    setCalc((prev) => "");
  };

  return (
    <MainContainer>
      <InputBar readOnly value={calc} />
      <ButtonContainer>
        <Button onClick={allClear}>AC</Button>
        <Button onClick={delCalc}>DEL</Button>
        <CalButton value="%" onClick={getOper}>
          %
        </CalButton>
        <CalButton value="÷" onClick={getOper}>
          ÷
        </CalButton>
        <Button value={7} onClick={getNum}>
          7
        </Button>
        <Button value={8} onClick={getNum}>
          8
        </Button>
        <Button value={9} onClick={getNum}>
          9
        </Button>
        <CalButton value="×" onClick={getOper}>
          ×
        </CalButton>
        <Button value={4} onClick={getNum}>
          4
        </Button>
        <Button value={5} onClick={getNum}>
          5
        </Button>
        <Button value={6} onClick={getNum}>
          6
        </Button>
        <CalButton value="-" onClick={getOper}>
          -
        </CalButton>
        <Button value={1} onClick={getNum}>
          1
        </Button>
        <Button value={2} onClick={getNum}>
          2
        </Button>
        <Button value={3} onClick={getNum}>
          3
        </Button>
        <CalButton value="+" onClick={getOper}>
          +
        </CalButton>
        <Button value={0} onClick={getNum}>
          0
        </Button>
        <Button value="." onClick={getPoint}>
          .
        </Button>
        <EqButton onClick={getResult}>=</EqButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  display: grid;
  width: 40%;
  max-width: 450px;
  height: 20rem;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const Button = styled.button`
  background-color: #444;
  border: none;
  color: white;
  font-size: 1.5rem;
  border-radius: 35px;
  cursor: pointer;
  box-shadow: 3px 3px 3px lightgray;

  &:active {
    margin-left: 2px;
    margin-top: 2px;
    box-shadow: none;
  }
`;

const CalButton = styled(Button)`
  font-size: 2rem;
  color: white;
  background-color: #888;
`;

const EqButton = styled(Button)`
  grid-column: 3/5;
`;

const InputBar = styled.input`
  width: 33%;
  max-width: 450px;
  height: 65px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 30px;
  border: 2px solid #444;
  text-align: right;
  padding-right: 20px;
  &:focus {
    outline: none;
  }
`;
