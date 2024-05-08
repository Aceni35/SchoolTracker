import React from "react";
import { useDispatch } from "react-redux";
import { setInfoSelect } from "../slices/SubjectSlices";

const SubjEl = ({ show, setShow, el }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="col-12 fs-3 p-2 text-light subjectAn mt-3 rounded"
        onClick={() => {
          setShow(true);
          dispatch(setInfoSelect(el));
        }}
      >
        <div className="row" style={{ cursor: "pointer" }}>
          <div className="col-10 d-flex" style={{ flexDirection: "column" }}>
            <span className="ms-2">{el.title}</span>
            <span className="fs-6 ms-3">{el.subject}</span>
          </div>
          <div className="col-2 fs-6 d-flex align-items-center">{el.time}</div>
        </div>
      </div>
    </>
  );
};

export default SubjEl;
