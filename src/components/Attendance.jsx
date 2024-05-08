import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Progress from "./Progress";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAttendance } from "../slices/HomeSlice";

function Attendance({ show, setShow }) {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const { attendance } = useSelector((store) => store.home);
  useEffect(() => {
    dispatch(getAttendance());
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "300px" }}>
          {attendance.map((att, index) => {
            return <Subject value={19} key={index} att={att} />;
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Subject = ({ att }) => {
  const { attendance, subject } = att;
  return (
    <div className="col-12 my-1">
      <div className="row subject py-1">
        <div className="col-9">
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </div>
        <div className="col-3 d-flex align-items-center">
          <Progress value={attendance} />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
