import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Logo } from "../components";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong comrade!!!");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-4">
        <Logo />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter Username" />
          </Form.Item>
          <Form.Item label="Email or Phone Number" name="email">
            <Input placeholder="Enter Email or Phone Number" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="type your password" type="password" />
          </Form.Item>
          <div className="d-flex flex-column">
            <Button className="primary-button my-2" htmlType="submit">
              Register
            </Button>

            <Link to="/login" className="anchor">
              Already Registered? Click here to Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
