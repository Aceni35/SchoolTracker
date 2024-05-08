import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SubjEl from "../components/SubjEl";
import SubjModal from "../components/SubjModal";
import { useDispatch, useSelector } from "react-redux";
import { changeSelected, getSubjects } from "../slices/SubjectSlices";
import Spinner from "../components/Spinner";

const Subjects = () => {
  const [show, setShow] = useState(false);
  const [sel, setSelected] = useState("all");
  const { subjects, selected, subjectsLoading } = useSelector(
    (store) => store.subjects
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjects());
  }, []);
  if (subjectsLoading) {
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
      {show && <SubjModal show={show} setShow={setShow} />}
      <div className="container-lg">
        <div className="rows underline pb-3">
          <div className="col-3 px-4">
            <div className="row">
              <div
                className="col-12 mx-auto text-center mt-2 options fs-5"
                onClick={() => {
                  dispatch(changeSelected("all"));
                  setSelected("all");
                }}
                style={{
                  backgroundColor:
                    sel === "all" ? "rgb(0, 62, 68)" : "rgb(26, 36, 45)",
                }}
              >
                All subjects
              </div>
            </div>
          </div>
          {subjects.map((el, index) => {
            let color = "rgb(26, 36, 45)";
            if (el === sel) {
              color = "rgb(0, 62, 68)";
            }

            return (
              <div
                className="col-3 px-4"
                key={index}
                onClick={() => dispatch(changeSelected(el))}
              >
                <div className="row">
                  <div
                    className="col-12 mx-auto text-center mt-2 options fs-5"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setSelected(el);
                    }}
                  >
                    {el}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* end */}
        <div className="row">
          {selected == 0 ? (
            <h2 className="text-center mt-2 text-light">No new material</h2>
          ) : (
            selected.map((el, index) => {
              return (
                <SubjEl show={show} setShow={setShow} key={index} el={el} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Subjects;
