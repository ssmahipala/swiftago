import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from './projectService';

const initialState = {
  projects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new project
export const createProject = createAsyncThunk('project/create', async (project, thunkAPI) => {
  try {
    const response = await projectService.createProject(project);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get all projects
export const getProjects = createAsyncThunk('project/getAll', async (_, thunkAPI) => {
  try {
    const response = await projectService.getAllProjects();
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
        state.message = '';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = '';
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getProjects.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
        state.message = '';
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = '';
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default projectSlice.reducer;
