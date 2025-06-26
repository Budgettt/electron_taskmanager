import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    window.electron.subscribeStatistics((stats) => console.log(stats));
  }, []);

  return (
    <>
      <h1>cooked.</h1>
      <h6>fried</h6>
    </>
  );
}

export default App;
