import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  studentsLoading: false,
  facultiesLoading: false,
  results: [],
  savedResults: [],
  semester: 1,
  semesterOn: false,
  facultiesOn: false,
  faculties: [],
  faculty: "",
  student: {},
  studentLoading: false,
  subject: "",
  grade: {},
  updateLoading: false,
  editLoading: false,
};

const url = "http://localhost:5000";

export const searchStudents = createAsyncThunk(
  "searchStudents",
  async (term) => {
    try {
      const resp = await axios.get(`${url}/get_students?term=${term}`);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const editAttendance = createAsyncThunk(
  "editAttendance",
  async ({ data, index }) => {
    try {
      const resp = await axios.patch(`${url}/edit_attendance`, {
        data,
        index,
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getFaculties = createAsyncThunk("getFaculties", async () => {
  try {
    const resp = await axios.get(`${url}/get_faculties`);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const sendUpdate = createAsyncThunk("sendUpdate", async (data) => {
  const { activity, grade, index, newGr } = data;
  let newGrade = { ...grade, grade: newGr };
  if (activity.name) {
    newGrade.activity = [...grade.activity, activity];
  }
  try {
    const resp = await axios.patch(`${url}/update_student`, {
      newGrade,
      index,
    });
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getStudent = createAsyncThunk("getStudent", async (index) => {
  try {
    const resp = await axios.get(`${url}/get_student?index=${index}`);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    changeFaculty: (state, action) => {
      state.faculty = action.payload;
    },
    changeSemester: (state, action) => {
      state.semester = action.payload;
    },
    turnFaculty: (state) => {
      state.facultiesOn = !state.facultiesOn;
    },
    turnSemester: (state) => {
      state.semesterOn = !state.semesterOn;
    },
    filterStudents: (state) => {
      let students = state.savedResults;
      if (state.facultiesOn) {
        students = students.filter((s) => s.faculty === state.faculty);
      }
      if (state.semesterOn) {
        students = students.filter((s) => s.semester === state.semester);
      }
      state.results = students;
    },
    changeSubject: (state, action) => {
      state.subject = action.payload;
      state.grade = state.student.grades.find(
        (el) => el.name === action.payload
      );
    },
    removeActivity: (state, action) => {
      let newActivity = state.grade.activity.filter(
        (el) => el.name != action.payload
      );
      state.grade.activity = newActivity;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(searchStudents.pending, (state) => {
        state.studentsLoading = true;
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.results = action.payload;
        state.studentsLoading = false;
        console.log(action.payload);
        state.savedResults = action.payload;
      })
      .addCase(getFaculties.pending, (state) => {
        state.facultiesLoading = true;
      })
      .addCase(getFaculties.fulfilled, (state, action) => {
        state.facultiesLoading = false;
        state.faculties = action.payload;
        state.faculty = action.payload[0];
      })
      .addCase(getStudent.pending, (state) => {
        state.studentLoading = true;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.student = action.payload;
        state.studentLoading = false;
        state.subject = action.payload.grades[0].name;
        state.grade = action.payload.grades[0];
      })
      .addCase(sendUpdate.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(sendUpdate.fulfilled, (state, action) => {
        state.updateLoading = false;
        toast.info("Student Updated");
        action.meta.arg.handleClose();
      })
      .addCase(editAttendance.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editAttendance.fulfilled, (state, action) => {
        state.editLoading = false;
        toast.info("Student updated");
        action.meta.arg.handleClose();
      }),
});

export default adminSlice.reducer;
export const {
  changeFaculty,
  turnFaculty,
  turnSemester,
  filterStudents,
  changeSemester,
  changeSubject,
  removeActivity,
} = adminSlice.actions;
