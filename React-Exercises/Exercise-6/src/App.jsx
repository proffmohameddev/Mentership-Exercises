import { useState, useEffect } from "react";

const GreetingTitle = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    if (!name) {
      document.title = "Welcome!";
    } else {
      document.title = `${greeting}, ${name}`;
    }
  }, [name, greeting]); // Re-run effect when name or greeting changes

  return (
    <div>
      <h2>Enter Your Name:</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h2>Choose a Greeting:</h2>
      <input
        type="text"
        value={greeting}
        onChange={(e) => setGreeting(e.target.value)}
      />
    </div>
  );
};

export default GreetingTitle;
