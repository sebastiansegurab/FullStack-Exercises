import React from "react";
import { connect } from "react-redux";
import { addVoteToAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = () => {
    if (props.filter !== "" && props.filter !== null) {
      return props.anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(props.filter))
        .sort(function (a, b) {
          return b.votes - a.votes;
        });
    }
    return props.anecdotes.sort(function (a, b) {
      return b.votes - a.votes;
    });
  }

  const addVote = (anecdote) => {
    props.addVoteToAnecdote(anecdote);
    props.setNotification(`you voted '${anecdote.content}'.`, 5);
  };

  return (
    <div>
      {anecdotes().map((anecdote) => (
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVoteToAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList;
