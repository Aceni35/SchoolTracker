import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getTimeTable } from "../slices/HomeSlice";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

function TimeTable({ show, setShow }) {
  const handleClose = () => setShow(false);
  const { timetable, role } = useSelector((store) => store.home);
  const [selected, setSelected] = useState(0);
  const changeDayUp = () => {
    if (selected === 4) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  };
  const changeDayDown = () => {
    if (selected === 0) {
      setSelected(4);
    } else {
      setSelected(selected - 1);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimeTable());
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Timetable</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "200px" }}>
          <div className="row">
            <div className="col-2 d-flex align-items-center justify-content-center">
              <FaArrowAltCircleLeft
                size={30}
                cursor="pointer"
                onClick={() => changeDayDown()}
              />
            </div>
            <div className="col-8  fs-4 d-flex align-items-center justify-content-center">
              {days[selected].charAt(0).toUpperCase() + days[selected].slice(1)}
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
              <FaArrowAltCircleRight
                size={30}
                cursor="pointer"
                onClick={() => changeDayUp()}
              />
            </div>

            <hr />
          </div>
          <div className="row mt-1">
            {timetable[days[selected]].map((el, index) => {
              return <Class subj={el} key={index} />;
            })}
          </div>
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

export default TimeTable;

const Class = ({ subj }) => {
  const { subject, time } = subj;
  return (
    <div className="col-12 class p-1 my-1">
      <div className="row">
        <div className="col-9">
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </div>
        <div className="col-3">{time}</div>
      </div>
    </div>
  );
};
