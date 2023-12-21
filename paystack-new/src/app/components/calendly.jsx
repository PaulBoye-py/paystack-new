import React from "react";
import { InlineWidget } from "react-calendly";

const Calendly = () => {
  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/paul-aderoju" />
    </div>
  );
};

export default Calendly;