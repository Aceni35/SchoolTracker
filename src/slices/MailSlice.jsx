import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = () => {
  const role = localStorage.getItem("role");
  return {
    teachers: [],
    sent: [],
    received: [],
    sendersLoading: false,
    mailLoading: true,
    display: [],
    read: {},
    sendLoading: false,
    selectedTeacher: null,
    role: role,
    searchLoading: false,
  };
};
const url = "http://localhost:5000";

export const getMails = createAsyncThunk("getMails", async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/mails`, {
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

export const searchSenders = createAsyncThunk(
  "searchSenders",
  async (term, thunkAPI) => {
    const token = localStorage.getItem("token");
    const role = thunkAPI.getState().home.role;
    try {
      const resp = await axios.get(
        `${url}/searchSenders?term=${term}&type=${role === "teacher" ? 0 : 1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getTeachers = createAsyncThunk("getTeachers", async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/teachers`, {
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

export const sendMail = createAsyncThunk("sendMail", async (mail, thunkAPI) => {
  const token = localStorage.getItem("token");
  const role = thunkAPI.getState().home.role;
  try {
    const resp = await axios.post(
      `${url}/send_mail`,
      {
        type: role === "teacher" ? 1 : 0,
        subject: mail.subject,
        text: mail.text,
        index: mail.teacher,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    changeDisplay: (state, action) => {
      if (action.payload === 1) {
        state.display = state.received;
      } else {
        state.display = state.sent;
      }
    },
    setRead: (state, action) => {
      state.read = action.payload;
    },
    setTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getMails.pending, (state) => {
        state.mailLoading = true;
      })
      .addCase(getMails.fulfilled, (state, action) => {
        state.sent = action.payload.outbox;
        state.received = action.payload.inbox;
        state.display = action.payload.inbox;
        state.mailLoading = false;
      })
      .addCase(getTeachers.pending, (state) => {
        state.sendersLoading = true;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.sendersLoading = false;
        state.teachers = action.payload;
      })
      .addCase(sendMail.pending, (state) => {
        state.sendLoading = true;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        const newMails = [action.payload.mail, ...state.sent];
        state.sent = newMails;
        toast.info("Mail sent");
        state.sendLoading = false;
      })
      .addCase(searchSenders.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchSenders.fulfilled, (state, action) => {
        state.teachers = action.payload;
        state.searchLoading = false;
      }),
});

export default mailSlice.reducer;
export const { changeDisplay, setRead, setTeacher } = mailSlice.actions;
