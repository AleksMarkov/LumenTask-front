import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../api/auth-api.js';
import * as userAPI from '../../api/user-api.js';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authAPI.register(credentials);
      toast.success('Congratulations! You have successfully registered!');
      return data;
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authAPI.logIn(credentials);
      return data;
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await authAPI.logOut(auth.token);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const data = await authAPI.getCurrentUser(auth.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (body, { rejectWithValue }) => {
    try {
      const data = await userAPI.updateUserInfo(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'auth/updateUserAvatar',
  async (file, { rejectWithValue }) => {
    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 200,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      
      const formData = new FormData();
      formData.append('avatar', compressedFile);

      const data = await userAPI.updateUserAvatar(formData);
      return data;
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      return rejectWithValue(error.response.data.message);
    }
  }
);
