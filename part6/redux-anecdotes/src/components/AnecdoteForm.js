import React from 'react'
import { connect } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const { target } = event
        props.addNewAnecdote(target.content.value)
        props.setNotification(`new anecdote '${target.content.value}' added.`, 5)
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

const mapDispatchToProps = {
    addNewAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm