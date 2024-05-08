import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Grade from "../components/Grade";
import GradeModal from "../components/GradeModal";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { getGrades } from "../slices/SubjectSlices";

const Grades = () => {
  const [show, setShow] = useState(false);
  const { gradesLoading, grades } = useSelector((store) => store.subjects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGrades());
  }, []);
  if (gradesLoading) {
    return (
      <>
        <Navbar />
        <h1 className="text-center">
          <Spinner />
        </h1>
      </>
    );
  }
  return (
    <>
      <Navbar />
      {show && <GradeModal show={show} setShow={setShow} />}
      <div className="container-lg">
        <div className="row">
          <div className="col-12 text-center text-white fs-1 underline">
            Your Grades :
          </div>
          {grades.map((el, index) => {
            return (
              <Grade show={show} setShow={setShow} key={index} grade={el} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Grades;
