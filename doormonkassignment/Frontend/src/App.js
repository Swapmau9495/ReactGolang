import React from 'react';
import Form from './components/Form';
import SuccessMessage from './components/SuccessMessage';
import StudentList from './components/StudentList';

function App() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div>
      {!submitted && <Form setSubmitted={setSubmitted} />}
      {submitted && <SuccessMessage />}
      <StudentList />
    </div>
  );
}

export default App;
