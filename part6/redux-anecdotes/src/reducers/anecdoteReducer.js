const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const addVoteToAnecdote = (id) => {
  return {
    type: "ADD_VOTE",
    payload: {
      id,
    },
  };
};

export const addNewAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content,
    },
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INITIAL_ANECDOTES",
    payload: {
      anecdotes,
    },
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VOTE":
      const { id } = action.payload;
      return state.map((anecdote) => {
        if (anecdote.id === id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          };
        }
        return anecdote;
      });
    case "NEW_ANECDOTE":
      return [...state, asObject(action.payload.content)];
    case "INITIAL_ANECDOTES":
      return action.payload.anecdotes;
    default:
      return state;
  }
};

export default anecdoteReducer;
