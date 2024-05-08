import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers, searchSenders, setTeacher } from "../slices/MailSlice";
import Spinner from "../components/Spinner";
import { IoSearch } from "react-icons/io5";

function SearchModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const { sendersLoading, teachers, searchLoading } = useSelector(
    (store) => store.mail
  );
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeachers());
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a receiver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 text-center mb-2">
            Enter name:{" "}
            <input
              type="text"
              onChange={(e) => {
                setTerm(e.target.value);
              }}
            />{" "}
            <button
              className="btn btn-outline-dark"
              onClick={() => dispatch(searchSenders(term))}
              disabled={searchLoading}
            >
              {!searchLoading ? <IoSearch /> : <Spinner />}
            </button>
          </div>
          {sendersLoading ? (
            <h1 className="text-center text-dark">
              <Spinner />
            </h1>
          ) : (
            <div className="row">
              {teachers.map((el, index) => {
                return (
                  <div className="col-4 my-1 " key={index}>
                    <div className="row px-1">
                      <div
                        className="col-12 rounded text-center p-2 text-light"
                        style={{
                          border: "solid 2px black",
                          background: "rgb(14, 35, 46)",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          dispatch(setTeacher(el));
                          setShow(false);
                        }}
                      >
                        {el.name} {el.surname}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

export default SearchModal;
