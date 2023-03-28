import {configurStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

export const store = configurStore({
    reducer: {
        auth: authReducer,
    },

})