import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postData } from "../store/apiSlice";
import Modal from "../components/Modal";

const AccountAdmin = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (formData) => {
    setErrorMessage("");
    setSuccessMessage("");
    dispatch(postData({ url: "/api/user/access", data: formData }))
      .unwrap()
      .then((res) => {
        setSuccessMessage(res.message);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.error);
      });

    // If request is successful, set success message
    // Reset form fields
    reset();
  };

  return (
    <div className="py-10 h-full text-gray-800 dark:text-white w-full space-y-10 px-12">
      <h2 className="text-2xl font-semibold mb-3">Add Admin</h2>
      <p className=" mb-3">Share admin access with existing users</p>
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md">
          {errorMessage}
        </div>
      )}
      {successMessage && <Modal text={successMessage} />}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-md font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...register("email", { required: true })}
            className="block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300"
            placeholder="Enter Email"
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-md font-medium mb-1">
            Type
          </label>
          <select
            id="type"
            {...register("type", { required: true })}
            className="block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300"
          >
            <option value="">Select</option>
            <option value="general">General</option>
            <option value="admin">Admin</option>
            {/* Add your category options here */}
          </select>
          {errors.category && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <button
          type="submit"
          className="rounded-md w-1/2 bg-[#D4D4D8] px-10 py-2 text-base font-semibold leading-6 text-[#0F172A] shadow-sm dark:hover:bg-white hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:ring-2 active:ring-gray-500 uppercase"
        >
          Submit Changes
        </button>
      </form>
    </div>
  );
};

export default AccountAdmin;
