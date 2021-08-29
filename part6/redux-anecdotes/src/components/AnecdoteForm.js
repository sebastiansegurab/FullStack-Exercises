import React from 'react'
import { useDispatch } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const { target } = event
        dispatch(addNewAnecdote(target.content.value))
        dispatch(setNotification(`new anecdote '${target.content.value}' added.`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
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