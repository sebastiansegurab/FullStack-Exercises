import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => {
    return state.sort(function (a, b) {
      return b.votes - a.votes;
    });
  })
  const dispatch = useDispatch()

  const addVoteToAnecdote = (id) => {
    return {
      type: "ADD_VOTE",
      payload: {
        id
      }
    }
  }

  const addVote = (id) => {
    dispatch(addVoteToAnecdote(id))
  }

  const addNewAnecdote = content => {
    return {
      type: 'NEW_NOTE',
      payload: {
        content
      }
    }
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const { target } = event
    dispatch(addNewAnecdote(target.content.value))
    target.content.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App