import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVoteToAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter !== "" && filter !== null) {
      return anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
        .sort(function (a, b) {
          return b.votes - a.votes;
        });
    }
    return anecdotes.sort(function (a, b) {
      return b.votes - a.votes;
    });
  });

  const dispatch = useDispatch();

  const addVote = (anecdote) => {
    dispatch(addVoteToAnecdote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'.`, 5));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
