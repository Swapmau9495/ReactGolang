import React from "react";

const SuccessMessage = ({ isError }) => {
  //isError checking if API thorwing error by any reason Message will be displayed accordingly
  return isError ? (
    <div style={{ color: "whitesmoke" }}>
      <h2>Registration Failed</h2>
    </div>
  ) : (
    <div style={{ color: "whitesmoke" }}>
      <h2>Form submitted successfully!</h2>
      <h4>Thank you for Registration!</h4>
    </div>
  );
};

export default SuccessMessage;
