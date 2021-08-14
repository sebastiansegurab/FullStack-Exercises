import React from 'react'
import '../App.css'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }
    return <div className="notification-error">{notification}</div>
}

export default Notification