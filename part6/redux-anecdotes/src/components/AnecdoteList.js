import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addVoteToAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.anecdotes.sort(function (a, b) {
            return b.votes - a.votes;
        });
    })
    const dispatch = useDispatch()

    const addVote = (anecdote) => {
        dispatch(addVoteToAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'.`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
    }

    return (
        <div>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => addVote(anecdote)}>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList