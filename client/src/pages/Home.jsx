import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userVerify } from "../store/authSlice";
import { updateData } from "../store/apiSlice";
import Modal from "../components/Modal";

import LoadingPage from "../components/LoadingPage";
import PlayButton from "../components/PlayButton";
import PauseButton from "../components/PauseButton";
import Close from "../components/Close";
import { useGetCampaignsQuery } from "../store/query";
const Home = () => {
  const dispatch = useDispatch();
  const { reqUserId, profile, loading } = useSelector(({ auth }) => auth);
  const { loading: loadingapi } = useSelector(({ api }) => api);

  const [selectedSong, setSelectedSong] = useState(null);
  const [voteSong, setVoteSong] = useState(null);
  const [showVoteConfirmation, setShowVoteConfirmation] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.search.split("=")[1];
  const jwtTokenPattern =
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [message, setMessage] = useState("");
  const {
    data: votes,
    isLoading,
    refetch,
  } = useGetCampaignsQuery(
    `/api/campaign/getNewestCampaign?user_id=${reqUserId}`,
    // `/api/campaign/getCampaign/662e91afdfeb1cc8e5ba758a`,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // console.log(data, isLoading);

  const handleMute = useCallback(() => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  }, [isMuted]);

  const handleProgressChange = useCallback(
    (e) => {
      const newProgress = parseFloat(e.target.value);
      setProgress(newProgress);
      audioRef.current.currentTime = (newProgress * duration) / 100;
    },
    [duration]
  );

  const handleTimeUpdate = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  }, [duration]);

  const handleLoadedMetadata = useCallback(() => {
    const newDuration = audioRef.current.duration;
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration);
    }
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const formattedCurrentTime = useMemo(
    () => formatTime(currentTime),
    [currentTime]
  );
  const formattedRemainingTime = useMemo(
    () => formatTime(duration - currentTime),
    [currentTime, duration]
  );
  const handlePlay = useCallback(() => {
    audioRef.current.play();
    setIsPlaying(true);
  }, [audioRef, setIsPlaying]);

  const handlePause = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, [audioRef, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [selectedSong]);
  // select song, pause and play again play
  const handleSongSelect = (song) => {
    if (!profile?._id) {
      navigate("/log-in");
      return;
    }
    if (selectedSong?._id === song._id) {
      isPlaying ? handlePause() : handlePlay();
      return;
    }
    setSelectedSong(song);
    setIsPlaying(true);
    // setCurrentTime(0);

    // setProgress(0); // Reset progress when a new song is selected
    if (selectedSong) {
      isPlaying && audioRef.current.pause();
      // audioRef.current.currentTime = 0;
      // audioRef.current.duration = 0;
    }
  };

  useEffect(() => {
    if (token) {
      if (!jwtTokenPattern.test(token)) {
        navigate("/404");
      }

      dispatch(userVerify(token))
        .unwrap()
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {});
    }
  }, [token]);

  const handleVote = async () => {
    const data = {
      song_id: voteSong._id,
      user_id: profile._id,
      campaign_id: votes.data?._id,
    };
    profile.city && (data.user_city = profile.city);
    profile.age && (data.user_age = profile.age);
    profile.gender && (data.user_gender = profile.gender);
    dispatch(updateData({ url: `/api/media/vote`, data }))
      .unwrap()
      .then((res) => {
        setShowVoteConfirmation(false);
        res.status === "success" &&
          setMessage("Your Vote has been successfully submitted");

        setTimeout(() => {
          setSelectedSong(null);
          setMessage("");
          refetch();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setShowVoteConfirmation(false);
        setMessage(err?.data);
      });
  };

  return (
    <>
      {loading || isLoading || loadingapi ? <LoadingPage /> : null}
      <div className="min-w-full mb-20">
        <div className="flex container h-full flex-grow min-w-full">
          <div className="h-full dark:text-white text-gray-800 bg-[#E2E8F0] dark:bg-[#070E22] w-screen py-7 px-10">
            <h1
              className="text-3xl xsm:text-2xl xss:text-2xl font-bold leading-9 tracking-tight mb-4"
              // onClick={() => navigate(".", { replace: true })}
            >
              SELECT YOUR FAVORITE
              {/* {votes?.data.type === "city"
                ? "VOTE FOR FAVOURITES"
                : votes?.data.type === "music"
                ? "LISTEN & VOTE"
                : votes?.data.type === "image"
                ? "VOTE YOUR FAVOUITE IMAGE"
                : "LISTEN & VOTE"} */}
            </h1>

            {votes?.data?.name ? (
              <div className="space-y-1 my-1">
                <p className="text-2xl font-bold capitalize">
                  {votes?.data?.name}
                </p>
                <p className="text-md mb-2">{votes?.data?.description}</p>
                {!profile?._id ? (
                  <button
                    onClick={() => {
                      if (!profile?._id) {
                        navigate("/log-in");
                        return;
                      }
                    }}
                    className=" inline-block font-semibold text-sm md:text-base w-full md:w-auto text-center mt-4 md:mr-5 px-14 py-2.5 lg:py-2.5 text-gray-800 dark:text-white  bg-[#EA580C] border border-[#EA580C] rounded-md active:border-2 "
                  >
                    Vote
                  </button>
                ) : null}
              </div>
            ) : (
              <div className="my-1">
                <p className=" text-lg  leading-9 tracking-tight mb-2">
                  {votes?.message
                    ? votes?.message
                    : "This campaign is no longer active. Stay in touch by subscribing."}
                </p>
                <Link
                  to={reqUserId ? "/profile" : "/log-in"}
                  className=" inline-block font-semibold text-sm md:text-base w-full md:w-auto text-center mt-4 md:mr-5 px-14 py-2.5 lg:py-2.5 text-gray-800 dark:text-white  bg-[#EA580C] border border-[#EA580C] rounded-md active:border-2 "
                >
                  Account
                </Link>
              </div>
            )}
          </div>
        </div>
        {message ? <Modal text={message} /> : null}

        {showVoteConfirmation && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-gradient-to-r from-[#000721] via-[#000721] to-[#0a2862] dark:from-[#000721] dark:via-[#000721] dark:to-[#0a2862] shadow-lg rounded-md py-6 px-5 z-50 w-50 xsm:w-80 xss:w-80">
            <div className="flex justify-end">
              <button
                onClick={() => setShowVoteConfirmation(false)}
                className="hover:bg-gray-400  text-white font-semibold block text-end"
                aria-label="Close"
              >
                <Close />
              </button>
            </div>
            <p className="text-md sm:text-sm xss:text-sm my-6 text-center overflow-ellipsis overflow-hidden">
              Are you sure this is the selection you want to vote for?{" "}
              <br className="md:block lg:block sm:hidden xss:hidden xsm:hidden" />
              You can’t change your vote after you submit.
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleVote}
                className="text-[#E2E8F0] sm:text-sm xss:text-sm border-2  bg-transparent font-semibold py-2 px-10 sm:px-4 xss:px-2 rounded-xl mr-2 uppercase"
              >
                Submit my vote
              </button>
            </div>
          </div>
        )}

        <div
          className={`border-${
            votes?.data?.options?.length && votes?.data.type !== "image"
              ? "2"
              : "0"
          } shadow-md md:m-10 xss:m-5 ${
            votes?.data.type === "image" ? "flex-row" : "flex-col"
          } flex flex-wrap gap-2 sm:justify-center xss:justify-center md:justify-center justify-center`}
        >
          {votes?.data?.options?.map((item, index) => (
            <div
              className={`${
                votes?.data.type === "image" ? "flex-col" : "flex-row"
              } flex items-center justify-between
               py-4 px-10 xss:px-5 gap-2 h-full`}
              key={item?._id}
            >
              {votes?.data.type === "image" ? (
                <img
                  src={item.s3_url}
                  alt={item?.name}
                  className="h-48 object-contain  w-26 md:w-40 lg:w-48"
                />
              ) : (
                <div className="flex flex-col overflow-x-auto whitespace-pre-line">
                  <p className="font-medium dark:text-white text-gray-800 overflow-ellipsis overflow-hidden capitalize ">
                    {index + 1}. {item.name?.replaceAll("_", " ")}
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                {votes?.data.type === "music" ? (
                  <button
                    onClick={() => handleSongSelect(item)}
                    className="bg-[#0F172A] dark:bg-gray-300 dark:text-gray-800 text-white p-1 rounded-full"
                    aria-label="Play"
                  >
                    {selectedSong?._id === item._id && isPlaying ? (
                      <PlayButton />
                    ) : (
                      <PauseButton />
                    )}
                  </button>
                ) : null}
                {profile?._id ? (
                  <button
                    onClick={() => {
                      setShowVoteConfirmation(true);
                      setVoteSong(item);
                    }}
                    aria-label="Like"
                    className="text-gray-800 dark:text-white hover:text-red-600 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>
            </div>
          ))}

          {selectedSong ? (
            <div className="dark:text-white text-gray-800 bg-[#E2E8F0] dark:bg-[#070E22] py-2 pt-5 shadow-md">
              <div className="flex items-center justify-between mb-2 px-5">
                <input
                  type="range"
                  value={progress}
                  onChange={handleProgressChange}
                  className="w-full mx-2"
                />
              </div>
              <audio
                ref={audioRef}
                src={selectedSong?.s3_url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              ></audio>
              <p className="text-center overflow-ellipsis overflow-hidden px-5 whitespace-pre-line">
                {selectedSong?.name?.replaceAll("_", " ")}
              </p>
              <div className="flex items-center justify-between my-4 w-full px-5">
                <div className="flex items-center space-x-1/2 dark:text-white text-gray-600 flex-1">
                  <div>{formattedCurrentTime}</div>
                  <div>{"/"}</div>
                  <div>{formattedRemainingTime}</div>
                </div>
                <div className="flex-1">
                  <button
                    onClick={isPlaying ? handlePause : handlePlay}
                    aria-label="Pause"
                    className="bg-[#0F172A] dark:bg-gray-300 dark:text-gray-800 text-white p-1 rounded-full"
                  >
                    {isPlaying ? <PlayButton /> : <PauseButton />}
                  </button>
                </div>

                {/* <button
                    onClick={handlePlayPause}
                    className="bg-[#0F172A] dark:bg-gray-300 dark:text-gray-800 text-white p-1 rounded-full"
                  >
                  </button> */}
                <button
                  onClick={handleMute}
                  className={`dark:text-white text-gray-600  ${
                    isMuted ? "line-through" : "font-medium"
                  }`}
                >
                  Mute
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
