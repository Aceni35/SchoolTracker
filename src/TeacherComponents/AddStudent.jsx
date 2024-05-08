import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../components/Spinner";
import { getFaculties } from "../slices/AdminSlice";
import { addStudent } from "../slices/PanelSlice";
import { toast } from "react-toastify";

const AddStudent = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    faculty: "electro",
    password: "",
  });
  const { studentLoading } = useSelector((store) => store.panel);
  const { facultiesLoading, faculties } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(getFaculties());
  }, []);
  if (facultiesLoading) {
    return (
      <h1 className="text-center">
        <Spin />
      </h1>
    );
  }
  return (
    <div className="row bcg mt-2 rounded">
      <div className="col-12 fs-3 text-white">Add Student</div>
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
        Faculty{" "}
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setData({ ...data, faculty: e.target.value });
          }}
        >
          {faculties.map((el, index) => {
            return (
              <option key={index} value={el}>
                {el}
              </option>
            );
          })}
        </select>
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
      <div className="col-12">
        <button
          className="btn btn-outline-light px-4 mt-2"
          onClick={() => {
            if (
              !data.faculty ||
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
              faculty: "electro",
              password: "",
            });
          }}
        >
          {studentLoading ? <Spin /> : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
