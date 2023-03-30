import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
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
  try{
    return await authService.signIn(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
  });

  //Logout user
export const signOut =createAsyncThunk('auth/signout', async() => {
  await authService.signOut
})

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
        .addCase(signIn.pending, (state) => {
          state.isLoading = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.message = action.payload
          state.user = action.payload
      })
      .addCase(signIn.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.user = null
          state.message = action.payload 
      })
        .addCase(signOut.fulfilled, (state) => {
          state.user = null
        })
  },
});

export const {reset} = authSlice.actions
export default authSlice.reducer;