import React from "react";
import { DatePicker, Select, Button, Col, Form, Input, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";

function FormTemplate(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isTruck = props.isTruck;
  const isBus = props.isBus;

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/submit-new-booking",
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
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        className="form-effizi"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        {/* <h1 className="card-title card-mgy">Kindly Provide Details Below...</h1> */}
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Type of Booking"
              name="bookingType"
              rules={[
                {
                  required: true,
                  message: "Please select a type of booking",
                },
              ]}
            >
              <Select>
                <Select.Option value="Bike Booking">Bike Booking</Select.Option>
                <Select.Option value="Bus Booking">Bus Booking</Select.Option>
                <Select.Option value="Truck Booking">
                  Truck Booking
                </Select.Option>
                <Select.Option value="Interstate Dispatch">
                  Interstate Dispatch
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "The name is required.",
                },
                // {
                //   pattern: /A-Za-z0-9_/,
                //   message: "Name can only include letters.",
                // },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Pick Up (From)"
              name="pickUpFrom"
              rules={[
                {
                  required: true,
                  message: "Please enter your Pick up Address",
                },
              ]}
            >
              {isTruck || isBus ? (
                <Input placeholder="Pick Up(From)" />
              ) : (
                <Select>
                  <Select.Option value="Abuja">Abuja</Select.Option>
                  <Select.Option value="Port Harcourt">
                    Port Harcourt
                  </Select.Option>
                  <Select.Option value="Lagos">Lagos</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          {/* pick up address bike or interstate */}
          {isTruck || isBus ? null : (
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Pick up Address(From)"
                name="pickupAddress"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Pick up Address",
                  },
                ]}
              >
                <Input placeholder="Pick up Address(From)" />
              </Form.Item>
            </Col>
          )}

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Delivery (To)"
              name="deliverTo"
              rules={[
                {
                  required: true,
                  message: "Please enter your Delivery Address",
                },
              ]}
            >
              {isTruck || isBus ? (
                <Input placeholder="Pick up Address(From)" />
              ) : (
                <Select>
                  <Select.Option value="Abuja">Abuja</Select.Option>
                  <Select.Option value="Port Harcourt">
                    Port Harcourt
                  </Select.Option>
                  <Select.Option value="Lagos">Lagos</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          {/* delivery address bike and interstateDispatch */}
          {isTruck || isBus ? null : (
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Delivery Address(To)"
                name="deliverToAddress"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Delivery Address",
                  },
                ]}
              >
                <Input placeholder="Delivery Address(To)" />
              </Form.Item>
            </Col>
          )}
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Sender's Phone number(s)"
              name="sphoneNumber"
              rules={[
                { required: true, message: "Please enter your Phone Number" },
              ]}
            >
              <Input placeholder="Sender's Phone number(s)" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Receiver's Phone number(s)"
              name="rphoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter the Receiver's Phone Number",
                },
              ]}
            >
              <Input placeholder="Reciver's Phone number(s)" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Decription of item(s)"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter the item description",
                },
              ]}
            >
              <Input placeholder="Decription of item(s)" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please enter the quantity of items to be sent",
                },
              ]}
            >
              <Input placeholder="Quantity" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Additional information"
              name="additionalInfo"
              rules={[
                {
                  required: true,
                  message: "Kindly enter any Additional information here",
                },
              ]}
            >
              <Input placeholder="Additional information" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Input Offer"
              name="inputOffer"
              rules={[{ required: false }]}
            >
              <Input
                placeholder={
                  isTruck ? "Please Input your Offer" : "Not Available"
                }
                disabled={isTruck ? false : true}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Date of Booking"
              name="bookingDate"
              rules={[
                {
                  required: true,
                  message: "Kindly enter a Date",
                },
              ]}
            >
              <DatePicker picker="date" format="DD-MMMM-YYYY" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end bt-submit">
          <Button className="primary-button" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FormTemplate;
