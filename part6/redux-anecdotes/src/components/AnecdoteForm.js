import React from 'react'
import { useDispatch } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const { target } = event
        dispatch(addNewAnecdote(target.content.value))
        target.content.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='content' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm