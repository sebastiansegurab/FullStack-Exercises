import { getAll, createAnecdote } from "../services/anecdotes";

export const addVoteToAnecdote = (id) => {
  return {
    type: "ADD_VOTE",
    payload: {
      id,
    },
  };
};

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createAnecdote(content)
    dispatch({
      type: "NEW_ANECDOTE",
      payload: {
        newAnecdote
      },
    });
  }

};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()
    dispatch({
      type: "INITIAL_ANECDOTES",
      payload: {
        anecdotes,
      },
    })
  }
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
      return [...state, action.payload.newAnecdote];
    case "INITIAL_ANECDOTES":
      return action.payload.anecdotes;
    default:
      return state;
  }
};

export default anecdoteReducer;
