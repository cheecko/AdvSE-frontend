import { Portal, Snackbar, Alert } from '@mui/material'

const Toast = ({ message, type, autoHideDuration = 2000, handleToastClose }) => {
  return (
    <Portal>
      <Snackbar open={!!message} autoHideDuration={autoHideDuration} onClose={handleToastClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    </Portal>
  )
}

export default Toast
