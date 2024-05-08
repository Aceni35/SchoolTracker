import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./slices/HomeSlice";
import SubjectSlices from "./slices/SubjectSlices";
import mailSlice from "./slices/MailSlice";
import AdminSlice from "./slices/AdminSlice";
import PanelSlice from "./slices/PanelSlice";

export const store = configureStore({
  reducer: {
    home: HomeSlice,
    subjects: SubjectSlices,
    mail: mailSlice,
    admin: AdminSlice,
    panel: PanelSlice,
  },
});
