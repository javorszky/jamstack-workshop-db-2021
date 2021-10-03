import { useAuth } from './use-auth'

function Notification() {
    const auth = useAuth()

    const dismiss = () => {
        auth.setNotification({})
    }

    console.log('auth notification is', auth.notification)

    return (
        <div className={'notification ' + auth.notification.type}>
            <button className="delete" onClick={dismiss}></button>
            {auth.notification.message}
        </div>
    )
}

export default Notification