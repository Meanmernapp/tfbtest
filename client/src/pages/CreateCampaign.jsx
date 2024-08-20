import React, { useState, useEffect, useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import AudioList from "../components/AudioList";
import { Link, useNavigate, useParams } from "react-router-dom";

import { deleteData, fetchData, postData, updateData } from "../store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../components/LoadingPage";
import { format, isAfter, isBefore, isEqual } from "date-fns";
import { convertToPacificTime, formatToPacificTime } from "../utils/time";
import { formatInTimeZone } from "date-fns-tz";
const CreateCampaign = () => {
  const params = useParams();
  const { loading } = useSelector(({ api }) => api);
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      image: "",
      type: "",
      start_date: new Date(Date.now()),
      end_date: new Date(Date.now()),
    },
  });
  useEffect(() => {
    if (params?.id) {
      dispatch(fetchData({ url: "/api/campaign/getCampaign/" + params?.id }))
        .unwrap()
        .then((res) => {
          const camp = res.data;
          setValue("name", camp.name);
          setValue("type", camp.type);
          setValue("description", camp.description);
          camp.start_date &&
            setValue("start_date", format(camp.start_date, "yyyy-MM-dd"));
          camp.end_date &&
            setValue("end_date", format(camp.end_date, "yyyy-MM-dd"));
          setSongs(camp?.options);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params?.id]);

  const onSubmit = async (formData) => {
    console.log(new Date(formData.start_date));
    formData.start_date = new Date(formData.start_date).toLocaleDateString(
      "en-US",
      { timeZone: "America/Los_Angeles" }
    );

    console.log(new Date(formData.start_date));
    const formDataWithPacificTime = {
      ...formData,
      start_date: formatToPacificTime(
        convertToPacificTime(new Date(formData.start_date))
      ),
      end_date: formatToPacificTime(
        convertToPacificTime(new Date(formData.end_date))
      ),
    };
    console.log(formDataWithPacificTime)

    const urldata = params?.id
      ? updateData({
          url: "/api/campaign/updateCampaign/" + params?.id,
          data: formData,
        })
      : postData({ url: "/api/campaign/create", data: formData });
    // updateCampaign
    dispatch(urldata)
      .unwrap()
      .then((res) => {
        if (!params?.id) {
          navigate(
            res.data?.type === "city"
              ? `/admin/cities/${res.data?._id}`
              : `/admin/upload/${res.data?._id}?type=${res.data?.type}`
          );
        }
      })
      .catch((err) => {});
  };

  const handleDelete = useCallback(async (Id) => {
    dispatch(deleteData({ url: "/api/campaign/deleteCampaign/" + Id }))
      .unwrap()
      .then((res) => {
        console.log(res);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteAudio = useCallback(
    async (id) => {
      dispatch(
        postData({
          url: "/api/media/deletemedia",
          data: { mediaID: id, campaignID: params?.id },
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);

          setSongs((prevSong) => prevSong.filter((item) => item._id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [setSongs]
  );

  return (
    <>
      {loading ? <LoadingPage /> : null}
      <div className="pb-10 pt-2 px-6 py-2 h-full text-gray-800 dark:text-white ">
        <h2 className="text-2xl font-semibold mb-4">New Campaign - Step 1</h2>
        <p className=" mb-4">Enter the campaign details below</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-md font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300"
              placeholder="Enter campaign name"
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-md font-medium mb-1">
              Category
            </label>
            <select
              id="type"
              disabled={params?.id}
              {...register("type", { required: params?.id ? false : true })}
              className="block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300"
            >
              <option value="">Select</option>
              <option value="music">Music</option>
              <option value="image">Images</option>
              <option value="city">Text</option>

              {/* Add your category options here */}
            </select>
            {errors.category && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex align-center gap-5 xss:gap-2 xss:flex-wrap">
            <div className="mb-4 flex-1">
              <label
                htmlFor="start_date"
                className="block text-md font-medium mb-1"
              >
                Start Date
              </label>
              <input
                id="start_date"
                type="date"
                {...register("start_date", {
                  required: "This field is required",
                  // validate: (value) => {
                  //   return (
                  //     isAfter(value, new Date(Date.now)) ||
                  //     "Start date "
                  //   );
                  // },
                })}
                className="block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300"
                placeholder="mm/dd/yyyy"
              />
              {errors?.start_date && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4 flex-1">
              <label
                htmlFor="end_date"
                className="block text-md font-medium mb-1"
              >
                End Date
              </label>
              <input
                id="end_date"
                type="date"
                {...register("end_date", {
                  required: "This field is required",
                  validate: (value) => {
                    return (
                      isAfter(value, watch("start_date")) ||
                      "End date must be greater than start date"
                    );
                  },
                })}
                className="block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300"
                placeholder="mm/dd/yyyy"
              />
              {errors?.end_date && (
                <span className="text-red-500">
                  {errors?.end_date?.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-md font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              className="block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300"
              rows="4"
              placeholder="Add a message about the campaign here"
            ></textarea>
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <button
            type="submit"
            className="rounded-md bg-[#D4D4D8] px-10 py-2 text-base font-semibold leading-6 text-[#0F172A] shadow-sm dark:hover:bg-white hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:ring-2 active:ring-gray-500 uppercase"
          >
            {!params?.id ? "NEXT" : "Submit Changes"}
          </button>
        </form>
        {params?.id ? (
          <React.Fragment>
            {songs?.map((item, index) => (
              <AudioList
                key={item._id}
                type={watch("type")}
                item={item}
                onDelete={deleteAudio}
              />
            ))}

            <Link
              to={
                watch("type") === "city"
                  ? `/admin/cities/${params?.id}`
                  : `/admin/upload/${params?.id}?type=${watch("type")}`
              }
              className="underline cursor-pointer text-medium py-1/2 my-4"
            >
              Add{" "}
              {watch("type") === "music"
                ? "Song"
                : watch("type") === "image"
                ? "Image"
                : "City"}
            </Link>
            <div className="my-5 sm:my-5 xss:my-8 space-y-5">
              <div className="block">
                <butotn
                  onClick={() => handleDelete(params?.id)}
                  className="rounded-md bg-transparent border px-10 py-2 text-base font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-gray-700 active:ring-2 active:ring-gray-500 uppercase cursor-pointer"
                >
                  Delete Campaign
                </butotn>
              </div>
              <div className="block">
                <Link
                  to="/admin"
                  className="rounded-md bg-transparent border px-10 py-2 text-base font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-gray-700 active:ring-2 active:ring-gray-500 uppercase cursor-pointer"
                >
                  BACK
                </Link>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </>
  );
};

export default CreateCampaign;
