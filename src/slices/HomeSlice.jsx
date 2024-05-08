import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return {
    loginLoading: false,
    isLoading: true,
    cardInfo: {},
    news: {},
    timetable: {},
    attendance: {},
    token: token,
    attendanceLoading: false,
    timetableLoading: true,
    role: role,
  };
};

const url = "http://localhost:5000";

export const login = createAsyncThunk(
  "login",
  async ({ username, password }, thunkAPI) => {
    try {
      const resp = await axios.post(`${url}/login`, {
        index: username,
        password,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
      throw new Error(error.response.data.message);
    }
  }
);

export const getTimeTable = createAsyncThunk("getTimeTable", async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/timetable`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getAttendance = createAsyncThunk("getAttendance", async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/attendance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getHome = createAsyncThunk("getHome", async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/home`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("index", action.meta.arg.username);
        localStorage.setItem("role", action.payload.role);
        state.token = action.payload.token;
        toast.success("Login successful, Welcome back " + action.payload.name);
        action.meta.arg.navigate("/");
        state.loginLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        toast.error(action.error.message);
      })
      .addCase(getHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHome.fulfilled, (state, action) => {
        console.log(action.payload);
        if (state.role === "teacher") {
          state.news = action.payload[0];
          state.cardInfo = action.payload[1];
        } else {
          state.news = {
            faculty: action.payload.facultyNews,
            field: action.payload.fieldNews,
          };
          state.cardInfo = action.payload?.card;
        }
        state.isLoading = false;
      })
      .addCase(getAttendance.pending, (state) => {
        state.attendanceLoading = true;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.attendanceLoading = false;
        state.attendance = action.payload;
      })
      .addCase(getTimeTable.pending, (state) => {
        state.timetableLoading = true;
      })
      .addCase(getTimeTable.rejected, (state) => {
        console.log("rejected");
      })
      .addCase(getTimeTable.fulfilled, (state, action) => {
        return {
          ...state,
          timetable: action.payload,
          timetableLoading: false,
        };
      }),
});

export default HomeSlice.reducer;
export const {} = HomeSlice.actions;
