import React, { useEffect, useState } from "react";
import LayoutStrip from "../../components/LayoutStrip";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { Table } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
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
          value: "Bus Booking",
        },
        {
          text: "Bike",
          value: "Bike Booking",
        },
        {
          text: "Truck",
          value: "Truck Booking",
        },
        {
          text: "Interstate",
          value: "Interstate Dispatch",
        },
      ],
      onFilter: (value, record) => record.bookingType.indexOf(value) === 0,
    },
    {
      title: "Pick up Address",
      dataIndex: "pickUpFrom",
      render: (text, record) => (
        <span>
          {record.pickUpFrom} {record.pickupAddress}
        </span>
      ),
    },
    {
      title: "Delivery Address",
      dataIndex: "deliverTo",
      render: (text, record) => (
        <span>
          {record.deliverTo} {record.deliverToAddress}
        </span>
      ),
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
      // sorter: (a, b) => a.inputOffer - b.inputOffer,
    },
    {
      title: "Booking-Date",
      dataIndex: "bookingDate",
      // sorter: (a, b) => b.bookingDate - a.bookingDate,
      sorter: (a, b) =>
        moment(a.bookingDate).unix() - moment(b.bookingDate).unix(),
      render: (text, record) =>
        moment(record.bookingDate).format("DD-MMMM-YYYY"),
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

      <h5 className="page-header">Bookings List</h5>
      <hr />
      <Table
        columns={columns}
        dataSource={bookings}
        size="small"
        pagination={{ pageSize: 5 }}
      />
    </LayoutStrip>
  );
}

export default BookingsList;
