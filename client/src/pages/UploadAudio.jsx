import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { galleryData } from "../store/apiSlice";
import Modal from "../components/Modal";
import LoadingPage from "../components/LoadingPage";
const UploadAudio = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const typeValue = searchParams.get("type") || "music";

  console.log(typeValue);
  const dispatch = useDispatch();
  const { loading } = useSelector(({ api }) => api);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  useEffect(() => {
    if (watch("music")?.length) {
      setValue(
        "name",
        watch("music")[0]?.name?.split(".").slice(0, -1).join(".")
      );
    }
  }, [watch("music")?.length]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.music[0]);
    formData.append("name", data.name);
    formData.append("type", typeValue);
    formData.append("campaign_id", params.campaign_id);
    dispatch(galleryData({ url: "/api/media/addMedia", data: formData }))
      .unwrap()
      .then((res) => {
        setSuccessMessage("You have successfully added Song");
        if (res.data._id) {
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
        <h2 className="text-2xl font-semibold mb-4">
          Campaign - Add {typeValue === "music" ? "Music" : "Picture"}{" "}
        </h2>
        <p className="mb-4">
          Your campaign has been created, now add the{" "}
          {typeValue === "music" ? "audio" : "image"} files
        </p>
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md">
            {errorMessage}
          </div>
        )}
        {successMessage && <Modal text={successMessage} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* area of upload file image */}
          <div className="flex flex-col items-center justify-center mb-4 shadow-md border p-5 px-10">
            <input
              type="file"
              id="music"
              name="music"
              accept={typeValue === "music" ? ".mp3,audio/*" : ".jpg, .jpeg, .png, .webp"}
              {...register("music", { required: true })}
              className="hidden"
            />
            <label
              htmlFor="music"
              className={`w-full flex justify-center  px-4 py-2 focus:outline-none focus:border-blue-500 ${
                errors?.music ? "border-red-500" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-40 h-40"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            </label>
            <label htmlFor="music" className="block font-semibold mb-2">
              Drag 'n' drop some files here, or click to select files
            </label>
            {errors?.music && (
              <span className="text-red-500">
                {typeValue === "music" ? "Music" : "Picture"} file is required
              </span>
            )}
          </div>

          {/* end area of upload image */}
          {watch("music")?.length ? (
            <div>
              <div className="flex items-center justify-between w-full mt-4">
                <input
                  type="text"
                  placeholder="Enter some text"
                  className="block w-full rounded-md px-3 py-2  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300"
                  {...register("name", { required: true })}
                />
                <button
                  onClick={() => setValue("music", [])}
                  className="ml-2 bg-[#D4D4D8] text-white px-4 py-2 rounded-md hover:bg-[#D4D4D8] focus:outline-none focus:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0F172A"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center  justify-center space-y-7 mt-4">
                <button
                  type="submit"
                  className="rounded-md bg-[#D4D4D8] px-5 py-2 text-base font-semibold leading-6 text-[#0F172A] shadow-sm dark:hover:bg-white hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:ring-2 active:ring-gray-500 uppercase"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default UploadAudio;
