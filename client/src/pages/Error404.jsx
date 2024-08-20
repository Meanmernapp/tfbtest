import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto w-screen px-10">
      <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800">
        404
      </h2>
      <div className="flex justify-center font-semibold text-sm md:text-base w-full md:w-auto text-center px-14 py-1.5 lg:py-2.5 text-rose-400">
        Page not found
      </div>
      <button
        onClick={goBack}
        className="rounded-md bg-transparent border px-10 py-2 text-base font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-gray-700 active:ring-2 active:ring-gray-500 uppercase cursor-pointer"
      >
        Go back
      </button>
    </div>
  );
};

export default Error404;
