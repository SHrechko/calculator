import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calculator from "./components/calculator/Calculator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator />
      </header>
    </div>
  );
}

export default App;
