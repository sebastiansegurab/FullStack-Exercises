export const setNotification = notification => {
    return {
        type: 'SET_NOTIFICATION',
        payload: {
            notification
        }
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload.notification
        default: return state
    }
}

export default notificationReducer

