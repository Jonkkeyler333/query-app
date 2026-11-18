import useNotification from '../hooks/useNotify'
import { Alert, Snackbar } from '@mui/material'

const Notification = () => {
  const { notification } = useNotification()
  
  if (!notification) return null

  return (
    <Snackbar open={!!notification} autoHideDuration={3000}>
      <Alert severity="success" sx={{ width: '100%' }}>
        {notification}
      </Alert>
    </Snackbar>
  )
}

export default Notification