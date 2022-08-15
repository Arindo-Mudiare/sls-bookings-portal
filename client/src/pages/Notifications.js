import React from "react";
import { notification, Tabs } from "antd";
import { LayoutStrip } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../redux/userSlice";

function Notifications() {
  const { TabPane } = Tabs;
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong...");
    }
  };
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notifications-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong...");
    }
  };

  return (
    <LayoutStrip>
      <h1 className="page-title">Notifications</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Unseen Notifications" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => markAllAsSeen()}>
              Mark all as seen
            </h1>
          </div>
          {user?.unseenNotifications.map((notification, key) => (
            <div
              className="card p-2"
              key={notification.data.bookingId}
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </TabPane>
        <TabPane tab="Seen Notifications" key={2}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => deleteAll()}>
              Delete All
            </h1>
          </div>
          {user?.seenNotifications.map((notification, key) => (
            <div
              className="card p-2"
              key={notification.data.bookingId}
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </TabPane>
      </Tabs>
    </LayoutStrip>
  );
}

export default Notifications;
