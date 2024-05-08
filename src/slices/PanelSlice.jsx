import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  studentLoading: false,
  teacherLoading: false,
  subjectsLoading: false,
  materialLoading: false,
  removeLoading: false,
  editSubjects: [],
  ttLoading: true,
  timeTables: [],
  selected: {},
  subjects: [],
  newsLoading: false,
  editLoading: false,
};

const url = "http://localhost:5000";

export const addStudent = createAsyncThunk("addStudent", async (data) => {
  try {
    const resp = await axios.post(`${url}/add_student`, {
      ...data,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getSubjects = createAsyncThunk("getSubjects", async () => {
  try {
    const resp = await axios.get(`${url}/get_subjects`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const addTeacher = createAsyncThunk("addTeacher", async (data) => {
  try {
    const resp = await axios.post(`${url}/add_teacher`, {
      ...data,
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const sendMaterial = createAsyncThunk("sendMaterial", async (data) => {
  try {
    const resp = await axios.patch(`${url}/add_material`, {
      ...data,
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const sendNews = createAsyncThunk("sendNews", async (data) => {
  try {
    const resp = await axios.post(`${url}/add_news`, {
      ...data,
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const removeUser = createAsyncThunk("removeUser", async (data) => {
  try {
    const resp = await axios.patch(`${url}/remove`, {
      data,
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getTimeTables = createAsyncThunk("getTimeTable2", async () => {
  try {
    const resp = await axios.get(`${url}/getTimeTables`);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateTimeTable = createAsyncThunk(
  "updateTimeTable",
  async (data) => {
    console.log(data);
    try {
      const resp = await axios.patch(`${url}/edit_tt`, { ...data });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    removeClass: (state, action) => {
      const { day, cls } = action.payload;
      console.log(day, cls);
      let newClasses = state.selected.tt[day].filter((el) => {
        if (cls.subject != el.subject && cls.time != el.time) return el;
      });
      const new_tt = { ...state.selected.tt, [day]: newClasses };
      state.selected = { ...state.selected, tt: new_tt };
    },
    addClass: (state, action) => {
      const { day, cls } = action.payload;
      let newsClasses = [...state.selected.tt[day], cls];
      const new_tt = { ...state.selected.tt, [day]: newsClasses };
      state.selected = { ...state.selected, tt: new_tt };
    },
    changeFaculty: (state, action) => {
      state.selected = state.timeTables.find(
        (el) => el.name === action.payload
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addStudent.pending, (state, action) => {
        state.studentLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.studentLoading = false;
        toast.success("student added");
      })
      .addCase(addTeacher.pending, (state) => {
        state.teacherLoading = true;
      })
      .addCase(addTeacher.fulfilled, (state) => {
        state.teacherLoading = false;
        toast.info("Teacher added");
      })
      .addCase(getSubjects.pending, (state) => {
        state.subjectsLoading = true;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.subjectsLoading = false;
        state.subjects = action.payload;
        if (action.meta.arg != undefined) {
          action.meta.arg.setData({
            title: "",
            text: "",
            subject: action.payload[0],
          });
        }
      })
      .addCase(sendMaterial.pending, (state, action) => {
        state.materialLoading = true;
      })
      .addCase(sendMaterial.fulfilled, (state, action) => {
        state.materialLoading = false;
        toast.info("Material Shared");
      })
      .addCase(sendNews.pending, (state) => {
        state.newsLoading = true;
      })
      .addCase(sendNews.fulfilled, (state, action) => {
        state.newsLoading = false;
        toast.info("news Shared");
      })
      .addCase(removeUser.pending, (state) => {
        state.removeLoading = true;
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.removeLoading = false;
        toast.info("User removed");
      })
      .addCase(removeUser.rejected, (state) => {
        state.removeLoading = false;
        toast.error("User does not exist");
      })
      .addCase(getTimeTables.pending, (state) => {
        state.ttLoading = true;
      })
      .addCase(getTimeTables.fulfilled, (state, action) => {
        state.ttLoading = false;
        state.timeTables = action.payload;
        state.editSubjects = action.payload[0].subjects;
        state.selected = action.payload[0];
      })
      .addCase(updateTimeTable.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(updateTimeTable.fulfilled, (state, action) => {
        state.editLoading = false;
        toast.info("timeTable updated");
        console.log(action.meta.arg);
        let new_tt = state.timeTables.map((el) => {
          if (el.name === action.meta.arg.name) {
            return action.meta.arg;
          } else {
            return el;
          }
        });
        state.timeTables = new_tt;
      }),
});

export default panelSlice.reducer;
export const { removeClass, addClass, changeFaculty } = panelSlice.actions;
