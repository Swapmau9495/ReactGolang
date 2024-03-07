import React from "react";
import Form from "./components/Form.js";
import SuccessMessage from "./components/SuccessMessage/SuccessMessage.js";
function App() {
  //hook for submission state
  const [submitted, setSubmitted] = React.useState(false);
  //hook for error state
  const [isError, setIsError] = React.useState(false);

  return (
    <div>
      {!submitted && (
        <Form setSubmitted={setSubmitted} setIsError={setIsError} />
      )}
      {submitted && <SuccessMessage isError={isError} />}
    </div>
  );
}

export default App;
