import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extrareducers: (builder) => {

    }
})

export default authSlice.reducer