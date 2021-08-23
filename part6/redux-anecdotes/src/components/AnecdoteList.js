import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addVoteToAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.sort(function (a, b) {
            return b.votes - a.votes;
        });
    })
    const dispatch = useDispatch()

    const addVote = (id) => {
        dispatch(addVoteToAnecdote(id))
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
                            <button onClick={() => addVote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList