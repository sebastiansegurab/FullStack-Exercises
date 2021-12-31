import React from 'react'

const Notification = ({ error, success }) => {
    const errorStyle = {
        backgroundColor: "red",
        color: "white",
        padding: ".3rem",
        margin: ".5rem",
        fontWeight: "bold"
    };
    const successStyle = {
        backgroundColor: "green",
        color: "white",
        padding: ".3rem",
        margin: ".5rem",
        fontWeight: "bold"
    };
    if (error) {
        return (
            <div style={errorStyle}>
                <p>{error}</p>
            </div>
        )
    }
    if (success) {
        return (
            <div style={successStyle}>
                <p>Added book '{success}'</p>
            </div>
        )
    }
}


export default Notification