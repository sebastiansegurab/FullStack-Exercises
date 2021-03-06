export const setNotification = (notification, seconds) => {
    if (window.clearNotificationTimeout) {
        clearTimeout(window.clearNotificationTimeout)
    }

    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
                notification
            }
        })
        window.clearNotificationTimeout = setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION'
            })
        }, seconds * 1000)
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload.notification
        case 'CLEAR_NOTIFICATION':
            return ""
        default: return state
    }
}

export default notificationReducer

