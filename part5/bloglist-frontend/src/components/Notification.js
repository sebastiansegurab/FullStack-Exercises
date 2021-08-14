import React from 'react'
import '../App.css'

const Notification = ({ notification }) => {
    if (notification === null || notification === undefined) {
        return null
    }
    return <div className={notification.status === "success" ? "notification-success" : "notification-error"}>{notification.message}</div>
}

export default Notification