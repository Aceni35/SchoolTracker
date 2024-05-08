import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { sendMail } from "../slices/MailSlice";
import { toast } from "react-toastify";
import Spin from "./Spinner";

const WriteMail = ({ show, setShow }) => {
  const { selectedTeacher, sendLoading } = useSelector((store) => store.mail);
  const [mail, setMail] = useState({ subject: "", text: "" });
  const dispatch = useDispatch();
  return (
    <>
      <div className="row">
        <div className="col-12 text-center mt-2 fs-2">Write a Mail</div>
        <div className="col-12  mt-2 fs-3">
          To :{" "}
          {selectedTeacher &&
            `${selectedTeacher.name} ${selectedTeacher.surname}`}
          <span className="ms-2">
            <IoSearch onClick={() => setShow(true)} />
          </span>
        </div>
        <div className="col-12 fs-3">
          Subject :{" "}
          <input
            type="text"
            className="inp-subj"
            onChange={(e) => setMail({ ...mail, subject: e.target.value })}
          />
        </div>
        <div className="col-12 mt-3 ">
          <textarea
            cols="30"
            className="inp-txt"
            rows="10"
            onChange={(e) => setMail({ ...mail, text: e.target.value })}
          ></textarea>
        </div>
        <div className="col-2 ms-auto mt-2">
          <button
            className="btn btn-outline-light"
            onClick={() => {
              if (!selectedTeacher || !mail.subject || !mail.text) {
                toast.error("Please fill all the details");
                return;
              }

              dispatch(sendMail({ ...mail, teacher: selectedTeacher.index }));
            }}
            disabled={sendLoading}
          >
            {sendLoading ? <Spin /> : "Send"}
          </button>
        </div>
      </div>
    </>
  );
};

export default WriteMail;
