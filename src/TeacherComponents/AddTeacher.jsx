import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../components/Spinner";
import { addStudent } from "../slices/PanelSlice";
import { toast } from "react-toastify";

const AddTeacher = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    password: "",
    subjects: "",
  });
  const dispatch = useDispatch();
  const { teacherLoading } = useSelector((store) => store.panel);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="row bcg mt-2 rounded">
      <div className="col-12 fs-3 text-white">Add Teacher</div>
      <div className="col-12 fs-6 text-light">
        note* all subjects need to be written between a comma with no spaces in
        between
      </div>
      <div className="col-12 text-light my-1">
        Name{" "}
        <input
          type="text"
          className="add-inp"
          onChange={handleChange}
          name="name"
          value={data.name}
        />
      </div>
      <div className="col-12 text-light my-1">
        Surname{" "}
        <input
          type="text"
          className="add-inp"
          value={data.surname}
          onChange={handleChange}
          name="surname"
        />
      </div>
      <div className="col-12 text-light my-1">
        Password{" "}
        <input
          type="text"
          className="add-inp"
          value={data.password}
          onChange={handleChange}
          name="password"
        />
      </div>
      <div className="col-12 text-light my-1">
        Subjects{" "}
        <input
          type="text"
          className="add-inp"
          value={data.subjects}
          onChange={handleChange}
          name="subjects"
        />
      </div>
      <div className="col-12">
        <button
          className="btn btn-outline-light px-4 mt-2"
          onClick={() => {
            if (
              !data.subjects ||
              !data.name ||
              !data.password ||
              !data.surname
            ) {
              toast.error("please fill all the details");
              return;
            }
            dispatch(addStudent(data));
            setData({
              name: "",
              surname: "",
              password: "",
              subjects: "",
            });
          }}
        >
          {teacherLoading ? <Spin /> : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddTeacher;
