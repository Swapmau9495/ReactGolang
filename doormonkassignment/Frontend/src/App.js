import React from "react";
import Form from "./components/Form";
import SuccessMessage from "./components/SuccessMessage/SuccessMessage";
function App() {
  const [submitted, setSubmitted] = React.useState(false);
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
