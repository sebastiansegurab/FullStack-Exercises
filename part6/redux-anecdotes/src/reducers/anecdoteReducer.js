import { getAll, createAnecdote, addVote } from "../services/anecdotes";

export const addVoteToAnecdote = (anecdote) => {
  return async (dispatch) => {
    const addVoteAnecdote = await addVote(anecdote)
    dispatch({
      type: "ADD_VOTE",
      payload: {
        addVoteAnecdote
      },
    });
  }
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
      const { addVoteAnecdote } = action.payload;
      return state.map((anecdote) => {
        if (anecdote.id === addVoteAnecdote.id) {
          return addVoteAnecdote
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
