import { useState } from "react";
import Chart from "components/Chart/Chart";
import Range from "components/Range/Range";
import "./App.css";

const App = () => {
  const [storage, setStorage] = useState<number>(50);
  const [transfer, setTransfer] = useState<number>(50);

  return (
    <div className="app">
      <div className="container">
        <div className="ranges">
          <Range type="Storage" value={storage} setValue={setStorage} />
          <Range type="Transfer" value={transfer} setValue={setTransfer} />
        </div>
        <Chart storage={storage} transfer={transfer} />
      </div>
    </div>
  );
};

export default App;
