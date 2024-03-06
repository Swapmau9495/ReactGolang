import React from "react";
import Form from "./components/Form";
import SuccessMessage from "./components/SuccessMessage";

function App() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div>
      {!submitted && <Form setSubmitted={setSubmitted} />}
      {submitted && <SuccessMessage />}
    </div>
  );
}

export default App;
