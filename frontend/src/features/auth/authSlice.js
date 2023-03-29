import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
//Register New user
export const signUp = createAsyncThunk('auth/signUp', async (user, thunkAPI) => {
  try{
    return await authService.signUp(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
});

//Login User
export const signIn = createAsyncThunk('auth/signIn', async (user, thunkAPI) => {
    console.log(user);
  });
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
        state.isLoading =false
        state.isError =false
        state.isSuccess =false
        state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(signUp.pending, (state) => {
            state.isLoading = true
        })
        .addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
            state.user = action.payload
        })
        .addCase(signUp.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.user = null
            state.message = action.payload 
        })
  },
});

export const {reset} = authSlice.actions
export default authSlice.reducer;