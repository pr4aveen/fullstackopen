import React from 'react'

const Notification = ({notification}) => {

    if (notification.length === 0) {
        return null
    }

    const message = notification[0]
    const success = notification[1]

    return (
        <div className={success ? 'success' : 'error'} >
            {message}
        </div>
    )
}

export default Notification