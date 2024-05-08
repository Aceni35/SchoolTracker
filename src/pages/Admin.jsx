import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ReturnShow from "../TeacherComponents/ReturnShow";

const options = [
  { name: "Add Student", value: 0 },
  { name: "Add teacher", value: 1 },
  { name: "Add material", value: 2 },
  { name: "Share news", value: 3 },
  { name: "Edit Timetable", value: 4 },
  { name: "Remove User", value: 5 },
];

const Admin = () => {
  const [show, setShow] = useState(0);
  return (
    <>
      <Navbar />
      <div className="container-lg">
        <div className="row">
          {options.map((el, index) => {
            return (
              <div className="col-4" key={index}>
                <div className="row p-1">
                  <div
                    className="col-12 text-center text-white fs-5 options mt-2"
                    onClick={() => setShow(el.value)}
                  >
                    {el.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ReturnShow show={show} />
      </div>
    </>
  );
};

export default Admin;
