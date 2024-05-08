import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  grades: [],
  subjects: [],
  material: [],
  gradesLoading: true,
  subjectsLoading: true,
  chosenActivity: [],
  selected: [],
  infoSelect: {},
};

const url = "http://localhost:5000";

export const getGrades = createAsyncThunk("getGrades", async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/grades`, {
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

export const getSubjects = createAsyncThunk("getSubjects", async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/subjects`, {
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

const SubjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubject: (state, action) => {
      state.chosenActivity = state.grades.find(
        (el) => el.name === action.payload
      ).activity;
    },
    changeSelected: (state, action) => {
      if (action.payload === "all") {
        state.selected = state.material;
      } else {
        const selected = state.material.filter(
          (el) => el.subject === action.payload
        );
        state.selected = selected;
      }
    },
    setInfoSelect: (state, action) => {
      state.infoSelect = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getGrades.pending, (state) => {
        state.gradesLoading = true;
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.grades = action.payload;
        state.gradesLoading = false;
      })
      .addCase(getSubjects.pending, (state) => {
        state.subjectsLoading = true;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload.subjects;
        state.material = action.payload.material;
        state.selected = action.payload.material;
        state.subjectsLoading = false;
      }),
});

export default SubjectsSlice.reducer;
export const { setSubject, changeSelected, setInfoSelect } =
  SubjectsSlice.actions;
