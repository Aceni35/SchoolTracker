import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addClass } from "../slices/PanelSlice";

function AddModal({ show, setShow, day }) {
  const handleClose = () => setShow(false);
  const { editSubjects } = useSelector((store) => store.panel);
  const [inp, setInp] = useState({
    subject: editSubjects[0],
    from: "",
    to: "",
  });
  const dispatch = useDispatch();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter new class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              Subject{" "}
              <select
                value={inp.subject}
                onChange={(e) => setInp({ ...inp, subject: e.target.value })}
              >
                {editSubjects.map((el, index) => {
                  return (
                    <option value={el} key={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-12 mt-3">
              Time from:{" "}
              <input
                type="time"
                value={inp.from}
                onChange={(e) => setInp({ ...inp, from: e.target.value })}
              />
              to:
              <input
                type="time"
                value={inp.to}
                onChange={(e) => setInp({ ...inp, to: e.target.value })}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (!inp.from || !inp.to || !inp.from) {
                toast.error("please fill all the data");
                return;
              }
              dispatch(
                addClass({
                  day,
                  cls: {
                    subject: inp.subject,
                    time: `${inp.from} - ${inp.to}`,
                  },
                })
              );
              handleClose();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;
