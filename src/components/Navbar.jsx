import React from "react";
import { FaSchool } from "react-icons/fa";
import { RiNumbersLine } from "react-icons/ri";
import { FaRegNewspaper } from "react-icons/fa";
import { IoMailUnreadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const role = localStorage.getItem("role");

let options = [
  { name: "Home", icon: <FaSchool size={25} className="ms-2" />, to: "/" },
  {
    name: "Grades",
    icon: <RiNumbersLine size={25} className="ms-2" />,
    to: "/grades",
  },
  {
    name: "Subjects",
    icon: <FaRegNewspaper size={25} className="ms-2" />,
    to: "/subjects",
  },
  {
    name: "Message",
    icon: <IoMailUnreadOutline size={25} className="ms-2" />,
    to: "/message",
  },
];
if (role === "teacher") {
  options = [
    { name: "Home", icon: <FaSchool size={25} className="ms-2" />, to: "/" },
    {
      name: "Students",
      icon: <RiNumbersLine size={25} className="ms-2" />,
      to: "/students",
    },
    {
      name: "Admin",
      icon: <FaRegNewspaper size={25} className="ms-2" />,
      to: "/admin",
    },
    {
      name: "Message",
      icon: <IoMailUnreadOutline size={25} className="ms-2" />,
      to: "/message",
    },
  ];
}

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-dark text-white">
      <div className="row">
        {options.map((el, index) => {
          return (
            <div
              className="col-3 text-center py-3 fs-6 navbar-item"
              key={index}
              onClick={() => navigate(el.to)}
            >
              {el.name}
              {el.icon}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
