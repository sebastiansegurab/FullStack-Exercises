import React from 'react'

const Notification = ({ error }) => {
    const errorStyle = {
        backgroundColor: "red",
        color: "white",
        padding: ".3rem",
        margin: ".5rem",
        fontWeight: "bold"
    };
    return (
        <div style={errorStyle}>
            <p>{error}</p>
        </div>
    )
}

export default Notification