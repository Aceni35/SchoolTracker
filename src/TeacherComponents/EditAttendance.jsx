import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../components/Spinner";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { editAttendance } from "../slices/AdminSlice";

function EditAttendance({ show, setShow }) {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const [number, setNumber] = useState({});
  const { student, studentLoading, editLoading } = useSelector(
    (store) => store.admin
  );
  useEffect(() => {
    setNumber(student.attendance);
  }, [student]);
  const handleChange = (e) => {
    const newValues = number.map((el) => {
      if (el.subject === e.target.name) {
        return { ...el, attendance: e.target.value };
      } else {
        return el;
      }
    });
    setNumber(newValues);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit{" "}
            {studentLoading ? "" : student.name + " " + student.surname + "'s"}{" "}
            Attendance
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
                <div className="col-8 d-flex">
                  Edit by Percentage{" "}
                  <Form.Check type="switch" className="ms-2" />
                </div>
              </div>

              {student.attendance.map((el) => {
                return (
                  <div className="row class my-2 p-1">
                    <div className="col-7">{el.subject}</div>
                    <div className="col-5 text-center">
                      <input
                        type="number"
                        max={100}
                        name={el.subject}
                        min={0}
                        style={{ width: "80px" }}
                        defaultValue={el.attendance}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                );
              })}
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
                editAttendance({
                  data: number,
                  handleClose,
                  index: student.index,
                })
              );
            }}
          >
            {editLoading ? <Spin /> : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAttendance;
