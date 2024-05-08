import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSubject } from "../slices/SubjectSlices";

const Grade = ({ show, setShow, grade }) => {
  const dispatch = useDispatch();
  console.log(grade);
  return (
    <>
      <div className="col-12 grade mt-3 rounded">
        <div className="row ms-1">
          <div className="col-10 p-2">
            <div className="col-12 fs-1">{grade.name}</div>
            <div
              className="col-12"
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(setSubject(grade.name));
                setShow(true);
              }}
            >
              View Recent Activity
            </div>
          </div>
          <div className="col-2 d-flex align-items-center fs-1 ">
            <div className="roundDiv">
              {grade.grade === 0 ? "N" : `${grade.grade}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grade;
