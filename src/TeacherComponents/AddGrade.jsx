import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../components/Spinner";
import { useEffect, useRef, useState } from "react";
import {
  changeSubject,
  removeActivity,
  sendUpdate,
} from "../slices/AdminSlice";

function AddGrade({ show, setShow }) {
  const handleClose = () => setShow(false);
  const { studentLoading, student, subject, grade, updateLoading } =
    useSelector((store) => store.admin);
  const [activity, setActivity] = useState({ name: "", points: 0 });
  const myRef = useRef(null);
  const dispatch = useDispatch();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit{" "}
            {studentLoading ? "" : student.name + " " + student.surname + "'s"}{" "}
            Grading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {studentLoading ? (
            <h1 className="text-center">
              <Spin />
            </h1>
          ) : (
            <>
              <div className="row">
                <div className="col-12">
                  Choose subject{" "}
                  <select
                    name=""
                    id=""
                    value={subject}
                    onChange={(e) => dispatch(changeSubject(e.target.value))}
                  >
                    {" "}
                    {student.grades.map((el, index) => {
                      return (
                        <option value={el.name} key={index}>
                          {el.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-12">
                  Current grade{" "}
                  <input
                    type="number"
                    max={10}
                    min={0}
                    className="my-2"
                    defaultValue={grade.grade}
                    ref={myRef}
                  />
                </div>
              </div>
              <div className="col-12 my-2">Recent Activities: </div>
              {grade.activity.map((el, index) => {
                return (
                  <div className="row class my-1" key={index}>
                    <div className="col-8">{el.name}</div>
                    <div className="col-2">{el.points}</div>
                    <div
                      className="col-2"
                      onClick={() => dispatch(removeActivity(el.name))}
                    >
                      X
                    </div>
                  </div>
                );
              })}
              <div className="row">
                <div className="col-12">Add another activity :</div>
                <div className="col-12 my-1">
                  Name{" "}
                  <input
                    type="text"
                    value={activity.name}
                    onChange={(e) =>
                      setActivity({ ...activity, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 my-1">
                  Points{" "}
                  <input
                    type="number"
                    value={activity.points}
                    onChange={(e) =>
                      setActivity({ ...activity, points: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              dispatch(
                sendUpdate({
                  grade,
                  activity,
                  index: student.index,
                  handleClose,
                  newGr: myRef.current.value,
                })
              );
            }}
          >
            {updateLoading ? <Spin /> : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddGrade;
