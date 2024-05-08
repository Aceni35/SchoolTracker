import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Options from "../components/Options";
import News from "../components/News";
import TimeTable from "../components/TimeTable";
import Attendance from "../components/Attendance";
import { useDispatch, useSelector } from "react-redux";
import { getAttendance, getHome, getTimeTable } from "../slices/HomeSlice";
import { Spinner } from "react-bootstrap";
import Card from "../TeacherComponents/Card";
import TeacherNews from "../TeacherComponents/TeacherNews";

const Home = () => {
  const [showTime, setShowTime] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const { isLoading, attendanceLoading, timetableLoading, role } = useSelector(
    (store) => store.home
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "student") {
      dispatch(getAttendance());
    }
    dispatch(getTimeTable());
    dispatch(getHome());
  }, []);
  if (isLoading) {
    return (
      <>
        <Navbar />
        <h1 className="text-center">
          <Spinner />
        </h1>
        ;
      </>
    );
  }
  return (
    <>
      {showTime && <TimeTable show={showTime} setShow={setShowTime} />}
      {showAttendance && (
        <Attendance show={showAttendance} setShow={setShowAttendance} />
      )}
      <Navbar />
      <div className="container-lg my-3">
        <div className="row">
          <div className="col-3">
            {role != "teacher" ? <Profile /> : <Card />}
            <div className="col-12 text-center">
              <button
                className="btn btn-danger mt-1 px-4"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Log out
              </button>
            </div>
          </div>
          <div className="col-9">
            <Options
              setShowTime={setShowTime}
              setShowAttendance={setShowAttendance}
            />{" "}
            {role != "teacher" ? <News /> : <TeacherNews />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
