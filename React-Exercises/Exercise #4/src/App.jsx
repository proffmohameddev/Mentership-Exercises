import { useState } from "react";

function App() {
  const [status, setStatus] = useState(false);

  const togle = () => {
    setStatus(!status);
  };

  return (
    <>
      <p>The Button Is {status ? "OFF" : "ON"}</p>
      <button onClick={togle}>Turn {status ? "ON" : "OFF"} </button>
    </>
  );
}

export default App;
