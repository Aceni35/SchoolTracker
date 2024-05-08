import React from "react";
import { useSelector } from "react-redux";

const Mail = () => {
  const { read } = useSelector((store) => store.mail);
  return (
    <>
      <div className="row underline">
        <div className="col-2 d-flex justify-content-center">
          <div
            className="profile-pic my-3"
            style={{ height: "85px", width: "85px" }}
          >
            <img
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              alt=""
              className="pic-p"
            />
          </div>
        </div>
        <div className="col-7 d-flex align-items-center fs-3">{read.from}</div>
        <div className="col-3 d-flex align-items-center fs-6">{read.time}</div>
      </div>
      <div className="row">
        <div className="col-12 text-cartoon fs-5 my-2">
          <div className="row">
            <span className="ms-2">Subject: {read.subject}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <p>{read.text}</p>
        <p>Pozdrav</p>
      </div>
    </>
  );
};

export default Mail;
