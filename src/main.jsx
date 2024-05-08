import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Grades from "./pages/Grades.jsx";
import Subjects from "./pages/Subjects.jsx";
import Message from "./pages/Message.jsx";
import { Provider } from "react-redux";
import { store } from "./store.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Students from "./pages/Students.jsx";
import Admin from "./pages/Admin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/message" element={<Message />} />
          <Route path="/students" element={<Students />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
