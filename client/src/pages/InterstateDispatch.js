import React from "react";
import { FormTemplate, LayoutStrip } from "../components";

function InterstateDispatch() {
  return (
    <LayoutStrip>
      <h1 className="card-title fade-title">Interstate Dispatch Booking</h1>
      <hr />
      <FormTemplate isTruck={false} isBus={false} />
    </LayoutStrip>
  );
}

export default InterstateDispatch;
