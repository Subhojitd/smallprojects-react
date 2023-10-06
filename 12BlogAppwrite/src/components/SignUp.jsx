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
  };

  return (
    <div className="flec items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text2xl font-bold leading-tight ">
          Sign up to create an Account
        </h2>
        <p className="text-center mt-2 text-base text-black/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
          {error && (
            <p className="text-center mt-2 text-base text-red-500">{error}</p>
          )}
        </p>

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Name :"
              placeholder="Enter your name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email :"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(
                      value
                    ) || "Email address must be a valid email address",
                },
              })}
            />
            <Input
              label="Password :"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
