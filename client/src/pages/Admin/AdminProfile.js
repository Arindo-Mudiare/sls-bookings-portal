import React, { useEffect, useState } from "react";
import LayoutStrip from "../../components/LayoutStrip";
import { Button, Col, Form, Input, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";

const AdminProfile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/update-admin-profile",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload(false);
        // navigate("/admin/booking-stats");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getAdminData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/get-admin-info-by-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setAdmin(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <LayoutStrip>
      <h3 className="page-header">Admin Profile</h3>
      <div className="form-container">
        {admin && (
          <Form
            layout="vertical"
            className="form-effizi"
            onFinish={onFinish}
            initialValues={admin}
          >
            {/* <h1 className="card-title card-mgy">Kindly Provide Details Below...</h1> */}
            <Row gutter={20}>
              <Col span={8} xs={24} sm={24} lg={24}>
                <Form.Item required label="Name" name="name">
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={24} lg={24}>
                <Form.Item required label="Email" name="email">
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>

            <div className="d-flex justify-content-end bt-submit">
              <Button className="primary-button" htmlType="submit">
                Update
              </Button>
            </div>
          </Form>
        )}
      </div>
    </LayoutStrip>
  );
};

export default AdminProfile;
