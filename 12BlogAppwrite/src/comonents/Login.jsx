import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import authService from "../appWrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <div className="flex items-center justify-center w-full">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-collapse border-black/10`}>

    <div className="mb-2 flex justify-center">
    <span className="inline-block w-full max-w-[100px]">
        <Logo width="100%" />
    </span>

    </div>

    <h2 className="text-center text2xl font-bold leading-tight ">Sign in to your Account</h2>
    <p className="text-center mt-2 text-base text-black/60">
        Don't have an account? <Link to="/signup" className="font-medium transition-all duration-200 hover:underline">Sign up</Link>
    </p>
    {
        error && <p className="text-center mt-2 text-base text-red-500">{error}</p>
    }

    <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
        <Input
            label="Email :"
            placeholder="Enter your email"
            type="email"
            {...register("email",{
                required: true,
                validate: {
                    matchPattern: (value) => /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(value) || "Email address must be a valid email address",
                }
            })}
        />
        <Input 
            label="Password :"
            placeholder="Enter your password"
            type="password"
            {...register("password",{
                required: true,
            })}
        />
        <Button type="submit" className="w-full">Sign In</Button>
    </form>
    
    </div>
  </div>);
};

export default Login;
