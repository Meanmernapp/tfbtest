import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { galleryData, postData } from "../store/apiSlice";
import Modal from "../components/Modal";
import LoadingPage from "../components/LoadingPage";
const UploadCities = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const typeValue = searchParams.get("type") || "city";
  const dispatch = useDispatch();
  const { loading } = useSelector(({ api }) => api);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    let formData = {};
    formData["type"] = typeValue;
    formData["campaign_id"] = params.campaign_id;
    formData.cities = data.cities;

    dispatch(postData({ url: "/api/media/addMediaCities", data: formData }))
      .unwrap()
      .then((res) => {
        setSuccessMessage("You have successfully added Cities");
        if (res.status === "success") {
          navigate(`/admin/edit/` + params.campaign_id);
        }
      })
      .catch((err) => {
        setErrorMessage("Error adding. Try Again");
        console.log(err);
      });
  };

  return (
    <>
      {loading ? <LoadingPage /> : null}
      <div className="max-w-xl mx-auto dark:text-white text-gray-700 rounded-md p-6 my:10">
        <h2 className="text-2xl font-semibold mb-4">Campaign - Add Text</h2>
        <p className="mb-4">
          Your campaign has been created, now add choices
        </p>
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md">
            {errorMessage}
          </div>
        )}
        {successMessage && <Modal text={successMessage} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* area of upload file image */}
          <div className="flex flex-col  justify-center mb-4 shadow-md border p-5 px-10 md:px-8 sm:px-6 xsm:px-5 xss:px-3 w-full">
            <TextComponent
              control={control}
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex flex-col items-center  justify-center space-y-7 mt-4">
            <button
              type="submit"
              className="rounded-md bg-[#D4D4D8] px-10 py-2 text-base font-semibold leading-6 text-[#0F172A] shadow-sm dark:hover:bg-white hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:ring-2 active:ring-gray-500 uppercase"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadCities;
const TextComponent = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cities", // Name of the field array
  });
  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end gap-2 my-1">
          <div className="flex-1">
            <label
              htmlFor={`name-${index}`}
              className="block text-md font-medium mb-1"
            >
              Choice {index + 1}
            </label>
            <input
              id={`name-${index}`}
              type="text"
              {...register(`cities.${index}.name`, { required: true })}
              className="block  w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300"
              placeholder="Enter Text "
            />
            {errors?.cities?.[index]?.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="rounded-md bg-transparent border px-10 md:px-8 sm:px-5 xsm:px-3 xss:px-2 py-2.5 text-base font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-gray-700 active:ring-2 active:ring-gray-500 uppercase"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: "" })}
        className="bg-[#D4D4D8] text-black px-3 py-2.5 mt-3 rounded-xl"
      >
        Add Text
      </button>
    </>
  );
};
