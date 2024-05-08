import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFaculty,
  changeSemester,
  filterStudents,
  getFaculties,
  getStudent,
  searchStudents,
  turnFaculty,
  turnSemester,
} from "../slices/AdminSlice";
import Spin from "../components/Spinner";
import { Form } from "react-bootstrap";
import AddGrade from "../TeacherComponents/AddGrade";
import EditAttendance from "../TeacherComponents/EditAttendance";
const Students = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showGrade, setShowGrade] = useState(false);
  const [showAtt, setShowAtt] = useState(false);
  const {
    facultiesLoading,
    studentsLoading,
    results,
    faculties,
    facultiesOn,
    semesterOn,
    semester,
    faculty,
    savedResults,
  } = useSelector((store) => store.admin);
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role != "teacher") {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    dispatch(searchStudents(""));
    dispatch(getFaculties());
  }, []);
  useEffect(() => {
    dispatch(filterStudents());
  }, [facultiesOn, semesterOn, semester, faculty, savedResults]);

  if (facultiesLoading) {
    return (
      <>
        <Navbar />
        <h1 className="text-center">
          <Spin />
        </h1>
      </>
    );
  }
  return (
    <>
      {showAtt && <EditAttendance show={showAtt} setShow={setShowAtt} />}
      {showGrade && <AddGrade show={showGrade} setShow={setShowGrade} />}
      <Navbar />
      <div className="container-lg">
        <div className="row mt-2 text-white underline pb-2">
          <div className="col-6 fs-4 text-center ">
            Search{" "}
            <input
              type="text"
              className="rounded"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />{" "}
            <button
              className="btn btn-outline-light"
              onClick={() => dispatch(searchStudents(term))}
            >
              <IoSearch />
            </button>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-center">
            Filter by faculty
            <select
              name="idk"
              id=""
              className="ms-2"
              onChange={(e) => dispatch(changeFaculty(e.target.value))}
              value={faculty}
            >
              {faculties.map((el, index) => {
                return (
                  <option key={index} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
            <Form.Check
              type="switch"
              className="ms-2"
              onClick={() => dispatch(turnFaculty())}
            />
          </div>
          <div className="col-3 d-flex align-items-center justify-content-center">
            Filter by Semester{" "}
            <select
              value={semester}
              name="idk"
              id=""
              className="ms-2"
              onChange={(e) => dispatch(changeSemester(Number(e.target.value)))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
            <Form.Check
              type="switch"
              className="ms-2"
              onClick={() => dispatch(turnSemester())}
            />
          </div>
        </div>
        {results.map((el, index) => {
          return (
            <div className="row mt-2 grade py-2 fs-3" key={index}>
              <div className="col-8 ">
                {el.name} {el.surname}{" "}
                <span className="text-danger">{el.index}</span>
              </div>
              <div className="col-2 fs-6 d-flex align-items-center justify-content-center">
                <button
                  onClick={() => {
                    dispatch(getStudent(el.index));
                    setShowGrade(true);
                  }}
                  className="btn btn-outline-light"
                >
                  Grades
                </button>
              </div>
              <div className="col-2 fs-6 d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    setShowAtt(true);
                    dispatch(getStudent(el.index));
                  }}
                >
                  Attendance
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Students;
