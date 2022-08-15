import React, { useEffect, useState } from "react";
import LayoutStrip from "../../components/LayoutStrip";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import * as dayjs from "dayjs";

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  // const [isEditing, setIsEditing] = useState(false);
  // const [editingBooking, setEditingBooking] = useState(null);

  const getBookingsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getBookingsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type of Booking",
      dataIndex: "bookingType",
      filters: [
        {
          text: "Bus",
          value: "busBooking",
        },
        {
          text: "Bike",
          value: "BikeBooking",
        },
        {
          text: "Truck",
          value: "truckBooking",
        },
        {
          text: "Interstate",
          value: "interstateDispatch",
        },
      ],
      onFilter: (value, record) => record.bookingType.indexOf(value) === 0,
    },
    {
      title: "Pick up Address",
      dataIndex: "pickUpFrom",
    },
    {
      title: "Delivery Address",
      dataIndex: "deliverTo",
    },
    {
      title: "Sender's Phone no",
      dataIndex: "sphoneNumber",
    },
    {
      title: "Receiver's Phone no",
      dataIndex: "rphoneNumber",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
    },

    {
      title: "Additional Information",
      dataIndex: "additionalInfo",
    },

    {
      title: "Input Offer",
      dataIndex: "inputOffer",
      sorter: (a, b) => a.inputOffer - b.inputOffer,
    },
    {
      title: "Booking-Date",
      dataIndex: "bookingDate",
      sorter: (a, b) => a.bookingDate - b.bookingDate,
      render: (text, record) =>
        dayjs(record.bookingDate).format("DD-MMMM-YYYY"),
    },
    // {
    //   title: "Actions",
    //   render: (record) => {
    //     return (
    //       <>
    //         <EditOutlined
    //           onClick={() => {
    //             onEditBooking(record);
    //           }}
    //         />
    //         <DeleteOutlined
    //           onClick={() => {
    //             onDeleteBooking(record);
    //           }}
    //           style={{ color: "red", marginLeft: 12 }}
    //         />
    //       </>
    //     );
    //   },
    // },

    // {
    //   title: "Status of Booking",
    //   dataIndex: "status",
    // },
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <div className="d-flex">
    //       {record.status === "pending" && <h1 className="anchor">Approve</h1>}
    //       {record.status === "approved" && <h1 className="anchor">Reject</h1>}
    //     </div>
    //   ),
    // },
  ];

  // const onDeleteBooking = (record) => {
  //   Modal.confirm({
  //     title: "Are you sure, you want to delete this user's Booking?",
  //     okText: "Yes",
  //     okType: "danger",
  //     onOk: () => {
  //       setBookings((pre) => {
  //         return pre.filter((booking) => booking.id !== record.id);
  //       });
  //     },
  //   });
  // };
  // const onEditBooking = (record) => {
  //   setIsEditing(true);
  //   setEditingBooking({ ...record });
  // };
  // const resetEditing = () => {
  //   setIsEditing(false);
  //   setEditingBooking(null);
  // };
  return (
    <LayoutStrip>
      {/* {bookings.map((booking) =>
        console.log(dayjs(booking.bookingDate).format("DD-MMMM-YYYY"))
      )} */}

      <h3 className="page-header">Bookings List</h3>
      <hr />
      <Table
        columns={columns}
        dataSource={bookings}
        size="small"
        pagination={{ pageSize: 6 }}
      />
    </LayoutStrip>
  );
}

export default BookingsList;
