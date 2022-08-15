import React from "react";
import { FormTemplate, LayoutStrip } from "../components";

function BookTruck() {
  return (
    <LayoutStrip>
      <h1 className="card-title fade-title">Book Truck Service</h1>
      <hr />
      <FormTemplate isTruck={true} isBus={false} />
    </LayoutStrip>
  );
}

export default BookTruck;
