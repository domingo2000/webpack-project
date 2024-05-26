import React, { useState, useEffect } from "react";
import { Counter } from "./Counter.tsx";
import OfflineIndicator from "./OfflineIndicator.tsx";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div>
      <h1>React App</h1>
      <OfflineIndicator />
      <Counter></Counter>
      <p>{data ? JSON.stringify(data) : ""}</p>
    </div>
  );
}

export default App;
