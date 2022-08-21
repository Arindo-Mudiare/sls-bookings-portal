import React, { useCallback, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
  const { user, reloadUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        // dispatch(reloadUserData(false));
      } else {
        localStorage.clear();
        navigate("/landing");
      }
    } catch (error) {
      // console.log(error);
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/landing");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user || reloadUser) {
      getUser();
    }
  }, [user, reloadUser, getUser]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/landing" />;
  }
}

export default ProtectedRoute;
