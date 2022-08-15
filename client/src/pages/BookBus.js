import React from "react";
import { FormTemplate, LayoutStrip } from "../components";

function BookBus() {
  return (
    <LayoutStrip>
      <h1 className="card-title fade-title">Book Bus Service</h1>
      <hr />
      <FormTemplate isTruck={false} isBus={true} />
    </LayoutStrip>
  );
}

export default BookBus;
