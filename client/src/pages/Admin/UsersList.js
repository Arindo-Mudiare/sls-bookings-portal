import React, { useEffect, useState } from "react";
import LayoutStrip from "../../components/LayoutStrip";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { Table } from "antd";
import moment from "moment";
import { useCallback } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsersData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
        // console.log(users);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    getUsersData();
  }, [getUsersData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MMMM-YYYY"),
    },

    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <div className="d-flex">
    //       <h1 className="anchor">Block</h1>
    //     </div>
    //   ),
    // },
  ];

  return (
    <LayoutStrip>
      <h5 className="page-header">Users List</h5>
      <hr />
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 7 }}
        rowKey={(record) => record._id}
      />
    </LayoutStrip>
  );
}

export default UsersList;
