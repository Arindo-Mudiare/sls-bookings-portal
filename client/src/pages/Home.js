import React, { useEffect } from "react";
import axios from "axios";
import LayoutStrip from "../components/LayoutStrip";

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutStrip>
      <h1>Your Bookings</h1>
    </LayoutStrip>
  );
}

export default Home;
