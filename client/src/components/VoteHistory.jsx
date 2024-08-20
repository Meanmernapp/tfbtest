import React from "react";


const VoteHistory = ({vote_history}) => {
 

  return (
    <div className="mt-10 w-full">
      <h2 className="text-2xl font-bold leading-9 tracking-tight ">
        My vote history
      </h2>
      <div className="mt-4 ">
        {vote_history?.map((vote, index) => (
          <VoteHistoryEntry
            key={index}
            songName={vote.song_name}
            votedDate={new Date(vote.voted_on).toDateString()}
          />
        ))}
      </div>
    </div>
  );
};
const VoteHistoryEntry = ({ songName, votedDate }) => {
  return (
    <div className="mb-2">
      <p className="font-semibold overflow-ellipsis overflow-hidden whitespace-pre-line">{songName} - </p>
      <p>voted on {votedDate}</p>
    </div>
  );
};



export default VoteHistory;
