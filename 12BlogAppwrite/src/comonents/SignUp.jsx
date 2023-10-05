import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import authService from "../appWrite/auth";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

    const signUp = async (data) => {
        setError("");
      try {
        const session = await authService.createAccount(data);
        if (session) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            dispatch(login(userData));
            navigate("/");
          }
        }
      } catch (err) {
        setError(err.message);
      }
    }

  return <div>SignUp</div>;
};

export default SignUp;
