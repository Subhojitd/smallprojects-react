import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appWrite/auth";
import { logout } from "../../store/authSlice";

const LogOutBtn = () => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logOutHandler}>
      Logout <i className="fas fa-sign-out-alt"></i>
    </button>
  );
};

export default LogOutBtn;
