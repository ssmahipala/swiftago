import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
import {toast} from 'react-toastify'

const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus()

    if(checkingStatus){
        const message = "Checking authentication status...";
        return (toast.done(message))
    }

    return loggedIn ? <Outlet /> : <Navigate to= '/login' />
}

export default PrivateRoute