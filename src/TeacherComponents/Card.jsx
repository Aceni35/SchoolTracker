import React from "react";
import { IoCalendar } from "react-icons/io5";
import { GiWhiteBook } from "react-icons/gi";
import { TbListNumbers } from "react-icons/tb";
import { IoManOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Card = () => {
  const { cardInfo } = useSelector((store) => store.home);
  return (
    <div className="profile-container">
      <div className="row">
        <div className="col-12 text-center text-cartoon fs-4 my-3 text-light">
          Your Profile
        </div>
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ height: "160px" }}
        >
          <div className="profile-pic">
            <img
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              alt=""
              className="pic-p"
            />
          </div>
        </div>
        <div className="row  fs-5 my-2 text-light text-cartoon">
          <div className="col-12 my-3">
            <IoManOutline size={30} className="me-2 ms-2" />
            Full Name : {cardInfo.name} {cardInfo.surname}
          </div>
          <div className="col-12 my-3 b">
            <GiWhiteBook size={30} className="me-2 ms-2" />
            Role : {cardInfo.role}
          </div>
          <div className="col-12 my-3 b">
            <TbListNumbers size={30} className="me-2 ms-2" />
            Index : {cardInfo.index}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
