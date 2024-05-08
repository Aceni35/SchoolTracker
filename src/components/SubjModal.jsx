import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function SubjModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const { infoSelect } = useSelector((store) => store.subjects);
  console.log(infoSelect);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{infoSelect.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{infoSelect.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SubjModal;
