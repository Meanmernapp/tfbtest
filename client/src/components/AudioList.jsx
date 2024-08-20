import React from "react";

const AudioList = React.memo(({ type, onDelete, item }) => {
  console.log(type, item)
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b py-4">
      <div className="flex flex-col items-center sm:items-start xss:items-start justify-between w-full md:w-auto sm:flex-wrap xss:flex-wrap overflow-x-auto">
        <p className="font-medium mb-2 md:mb-0 mr-4 overflow-ellipsis overflow-hidden xss:w-30 capitalize">
          {item.name?.replaceAll("_", " ")}
        </p>
        <p className="text-sm text-gray-500">Votes: {item.total_votes}</p>
      </div>
      <div className="flex items-center mt-4 md:mt-0 sm:flex-wrap xss:flex-wrap gap-1 justify-center">
        {type === "image" ? (
          // Render image
          <div className="w-32">
            <img
              src={item.s3_url}
              alt="Image"
              className="h-auto object-cover"
            />
          </div>
        ) : type === "music" ? (
          // Render audio
          <audio controls className="outline-none">
            <source src={item.s3_url} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        ) : null}

        <button
          onClick={() => onDelete(item._id, item)}
          className="text-red-500 hover:text-red-600 cursor-pointer ml-4"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default AudioList;
