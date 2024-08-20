import { Link, Navigate } from "react-router-dom";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authData } from "../store/authSlice";
import LoadingPage from "../components/LoadingPage";

const LogIn = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useSelector(({ auth }) => auth);

  const onSubmit = async (formData) => {
    dispatch(authData({ url: "/api/user/enter", data: formData }))
      .unwrap()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
        setData(err);
      });
  };

  if (auth.profile?._id) {
    const redirectLink = "/profile";
    return <Navigate to={redirectLink} />;
  } else {
    return (
      <>
        {auth.loading ? <LoadingPage /> : null}
        <div className="flex flex-col justify-center pb-10 pt-2 px-6 py-2 text-gray-800 dark:text-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-3xl font-bold leading-9 tracking-tight">
              Login
            </h2>
            {data && data.error && (
              <p className="mt-6 text-center text-rose-400 font-medium">
                {data.errorMessage}
              </p>
            )}
            {data && data.ok && (
              <p className="mt-6 text-center font-medium text-green-500">
                {data.message}
              </p>
            )}
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-nase font-medium leading-6 "
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="text"
                    required
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-gray-400 focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              {/* <div className="mb-8">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base font-medium leading-6 "
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div> */}
              <div className="flex flex-col items-center  justify-center space-y-7 mt-10">
                <button
                  type="submit"
                  className="flex  justify-center  rounded-md bg-[#D4D4D8] px-10 py-2.5 text-base font-semibold leading-6 text-[#0F172A] shadow-sm dark:hover:bg-white hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:ring-2 active:ring-white uppercase"
                >
                  Log in
                </button>
                {/* <Link
                to="/sign-up"
                className="underline text-gray-800 dark:text-white hover:no-underline"
              >
                Forgot password?
              </Link> */}

                <p className=" text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="underline text-gray-800 dark:text-white hover:no-underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default LogIn;
