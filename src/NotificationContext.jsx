import { createContext, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NofificationContextProvider = (props) => {
    const [notification, setNotification] = useState(null)
    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
}