import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function GradeModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const { chosenActivity } = useSelector((store) => store.subjects);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Activity in "Math"</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "300px" }}>
          {chosenActivity.map((el, index) => {
            return <Activity activity={el} key={index} />;
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

const Activity = ({ activity }) => {
  const { name, points } = activity;
  return (
    <div className="row mt-2 activity p-1">
      <div className="col-10">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </div>
      <div className="col-2">{points} pts</div>
    </div>
  );
};

export default GradeModal;
