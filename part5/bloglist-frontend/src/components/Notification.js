import React from 'react'
import PropTypes from 'prop-types'

import '../App.css'

const Notification = ({ notification }) => {
    if (notification === null || notification === undefined) {
        return null
    }
    return <div className={notification.status === "success" ? "notification-success" : "notification-error"}>{notification.message}</div>
}

Notification.propTypes = {
    notification: PropTypes.object
}

export default Notification