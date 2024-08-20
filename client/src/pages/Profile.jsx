import React, { useEffect, useState } from "react";

import VoteHistory from "../components/VoteHistory";
import ProfileTabs from "../components/ProfileTabs";
import en from "react-phone-number-input/locale/en";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import { useForm } from "react-hook-form";
import TextField from "../components/TextField";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../store/authSlice";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const auth = useSelector(({ auth }) => auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (auth.reqUserId) {
      setValue("age", auth.profile?.age);
      setValue("firstName", auth.profile?.firstName);
      setValue("email", auth.profile?.email);
      setValue("lastName", auth.profile?.lastName);
      setValue("city", auth.profile?.city);
      setValue("gender", auth.profile?.gender);
      setValue("countryCode", auth.profile?.countryCode);
      setValue("phoneNumber", auth.profile?.phoneNumber);
    }
  }, [auth.reqUserId]);

  const onSubmit = async (formData) => {
    // Your form submission logic here
    setLoading(true);
    dispatch(userUpdate({ id: auth.reqUserId, data: formData }))
      .unwrap()
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  return (
    <div
      className={`flex flex-col items-start justify-start pb-10 pt-2 px-6 py-2 w-full text-gray-800 dark:text-white`}
    >
      <div className="w-full">
        <ProfileTabs />
      </div>
      <div className="w-full">
        <h2 className="text-start text-3xl font-bold leading-9 tracking-tight ">
          My Profile
        </h2>
      </div>
      <form className="mt-10 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div class="flex  md:items-center gap-5 xss:gap-2 xss:flex-wrap sm:flex-wrap sm:flex-col xss:flex-col md:flex-row lg:flex-row">
          <div className="flex-1">
            <CountrySelect
              labels={en}
              register={register}
              className={`block w-full mb-3 rounded-md px-3 py-2.5 ring-1 ring-[#6B7280] placeholder:text-gray-400 focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300`}
            />
            <input
              type="hidden"
              name="countryCode"
              value={watch("countryCode")}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <TextField
              name="phoneNumber"
              register={register}
              required="Phone Number is Required"
              errors={errors}
              placeholder="New phone number"
              type="tel"
              // defaultValue={customer.phone ?? ''}
            />
          </div>
        </div>
        <TextField
          name="email"
          label="Email"
          register={register}
          disabled
          required="Email is Required"
          errors={errors}
        />
        <TextField
          name="firstName"
          label="First Name"
          register={register}
          required="First Name is Required"
          errors={errors}
        />
        <TextField
          name="lastName"
          label="Last Name"
          register={register}
          required="Last Name is Required"
          errors={errors}
        />

        <TextField
          name="city"
          label="City"
          register={register}
          required="City  is Required"
          errors={errors}
        />
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-base font-medium leading-6 mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className={`block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-gray-400 focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300 capitalize`}
            {...register("gender")}
          >
            {["", "Male", "Female", "Other"].map((item) => (
              <option
                value={item}
                className="text-gray-800 dark:text-white capitalize"
              >
                {item || "Select Gender"}
              </option>
            ))}
          </select>
        </div>
        <TextField
          name="age"
          label="Age"
          type="number"
          register={register}
          required="Age is Required"
          errors={errors}
        />
        <div className="mt-10">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#D4D4D8] px-3 py-2.5 text-base font-semibold leading-6 text-[#0F172A] shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:ring-2 active:ring-white uppercase"
            disabled={loading}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Vote History section */}
      <VoteHistory vote_history={auth.profile?.vote_history} />
    </div>
  );
};

export default ProfileForm;
const CountrySelect = ({ register, labels, ...rest }) => (
  <select {...rest} {...register("countryCode")}>
    <option value="">{labels["ZZ"]}</option>
    {getCountries().map((country) => (
      <option
        key={country}
        value={country}
        selected={country == "US" ? true : false} // set US as default option
      >
        {labels[country]} +{getCountryCallingCode(country)}
      </option>
    ))}
  </select>
);
