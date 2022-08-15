import { Button, Form, Input } from "antd";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to booking page");
        localStorage.setItem("token", response.data.data);
        values.email === "slsadmin@slsportation.com"
          ? navigate("/admin/bookings")
          : navigate("/");
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
        <h1 className="card-title">Welcome Back!</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email or Phone Number" name="email">
            <Input placeholder="Enter Email or Phone Number" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="type your password" type="password" />
          </Form.Item>
          <div className="d-flex flex-column">
            <Button className="primary-button my-2" htmlType="submit">
              Login
            </Button>

            <Link to="/register" className="anchor">
              Not Registered yet? Click here to Register
            </Link>
            <Link to="/forgot-password" className="anchor mt-2">
              Forgot password?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
