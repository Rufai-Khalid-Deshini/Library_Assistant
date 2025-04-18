import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const SnackbarComponent = ({open, message, severity, handleClose}) => {

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} sx={{ width: '100%' }} variant='filled'>
            <Alert severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent