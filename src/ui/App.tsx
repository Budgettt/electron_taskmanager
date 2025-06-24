import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    // @ts-ignore
    window.electron.subscribeStats((stats) => console.log(stats));
  }, []);

  return (
    <>
      <h1>cooked.</h1>
      <h6>fried</h6>
    </>
  );
}

export default App;
