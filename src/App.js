import "./index.css";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";




function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);


 const [completeExpression, setCompleteExpression] = useState("");



  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") {
      return;
    } else {
     setInput(".")
    }
 



    // if total is true that means we have pressed the equal button and dont want to continue the calculations in the background so we set our previous state to nothing
    if (total) {
      setPreState("");
   } 
    

    //pre refers to the previous currentstate/preCurState. When a number is clicked, it is concatenated to the previous number   
    curState 
      ? setCurState((pre) => pre + e.target.innerText) 
      : setCurState(e.target.innerText);
     setTotal(false);
    

    
   completeExpression ? setCompleteExpression((preCurState) => preCurState + e.target.innerText) : setCompleteExpression(e.target.innerText);
  } 

   


  
  useEffect(() => {
    setInput(curState);
  }, [curState]);


  
  useEffect(() => {
    setInput("0");
  }, []);





  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    completeExpression ? setCompleteExpression((preCurState) => preCurState + e.target.innerText) : setCompleteExpression(e.target.innerText);
     

 
    if (e.target.innerText === "-" && curState === "") {
      setCurState("-");
    equal();
    };
    if (curState === "") return;
    if (preState !== "") {
// equal function runs to calculate the expression once an operatorType is pressed.
      equal();
    } else {
      setPreState(curState);
      setCurState("");
    }
   };

    

  const equal = (e) => {
    if (e.target.innerText === "=") {
      setTotal(true);
    }

    

   let cal;
    switch (operator) {
    case "/":
      cal = String(parseFloat(preState) / parseFloat(curState));
      break;

    case "*":
      cal = String(parseFloat(preState) * parseFloat(curState));
      break;  

    case "-":
      cal = String(parseFloat(preState) - parseFloat(curState));
      break;

    case "+":
      cal = String(parseFloat(preState) + parseFloat(curState));
      break;
      default:
      return; 
  }



  //this is done to make sure it's ready for the next calculation
  setInput("");
  setPreState(cal);
  setCurState("");
  setCompleteExpression("");
  };

 
   

  const allClear = () => {
    setPreState("");
    setCurState("");
    setInput("0");
    setCompleteExpression("")
  };
 

  const deleteLast = () => {
    if (curState === "") {
      return;
    }
     const newVal = curState.slice(0, -1);
    setCurState(newVal);

    const newHistoryDisplay = completeExpression.slice(0, -1);
    setCompleteExpression(newHistoryDisplay);
  };


  

  return (
   <div className="App">
      <div className="calculator">
        <div className="preview" id="history_log"> {completeExpression} </div>
         <div className="display">
         {input !== "" || input === "0" ? (
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
      </div>
    

      <div className="allButtons">

      
  
      <button className="allClear" onClick={allClear}>AC</button>


    
      <button className="operators" onClick={operatorType}>/</button>
      <button className="digits" onClick={inputNum} >7</button>
      <button className="digits" onClick={inputNum}>8</button>
      <button className="digits" onClick={inputNum}>9</button>

      <button className="operators" onClick={operatorType}>*</button>
      <button className="digits" onClick={inputNum}>4</button>
      <button className="digits" onClick={inputNum}>5</button>
      <button className="digits" onClick={inputNum}>6</button>

      <button className="operators" onClick={operatorType}>-</button>
      <button className="digits" onClick={inputNum}>1</button>
      <button className="digits" onClick={inputNum}>2</button>
      <button className="digits" onClick={inputNum}>3</button>

      <button className="operators" onClick={operatorType}>+</button>
      
      <button className="zero" onClick={inputNum}>0</button>
    

      <button className="dotSign" onClick={inputNum}>.</button>

      <button className="deleteButton" onClick={deleteLast}>←</button>
      
      <button className="equalSign" onClick={equal}>=</button>

      </div>

    </div>
   </div>
  );
}


export default App;

