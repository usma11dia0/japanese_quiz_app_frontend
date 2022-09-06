import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios, { AxiosError } from "axios";
import {
  AUTH_STATE,
  CRED,
  LOGIN_USER,
  JWT,
  USER,
  ValidationErrors,
} from "../../types/features";

export const fetchAsyncLogin = createAsyncThunk<
  JWT,
  CRED,
  { rejectValue: ValidationErrors }
>("auth/login", async (auth: CRED, { rejectWithValue }) => {
  try {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/authen/jwt/create/`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: CRED) => {
    const res = await axios.post<USER>(
      `${process.env.REACT_APP_API_URL}/api/create/`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncGetMyProf = createAsyncThunk(
  "auth/loginuser",
  async (auth: CRED) => {
    const res = await axios.get<USER>(
      `${process.env.REACT_APP_API_URL}/api/loginuser/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

const initialState: AUTH_STATE = {
  isLoginView: true,
  loginUser: {
    id: 0,
    username: "",
  },
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem("localJWT", action.payload.access);
        action.payload.access && (window.location.href = "/quizzes");
      }
    );
    builder.addCase(fetchAsyncLogin.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.detail;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(
      fetchAsyncGetMyProf.fulfilled,
      (state, action: PayloadAction<LOGIN_USER>) => {
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
  },
});

export const { toggleMode } = authSlice.actions;
export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
