import React from "react";
import { FormEdit, LayoutStrip } from "../components";

function EditBooking() {
  return (
    <LayoutStrip>
      <h1 className="card-title fade-title">Edit Booking</h1>
      <hr />
      <FormEdit isTruck={true} isBus={false} />
    </LayoutStrip>
  );
}

export default EditBooking;
