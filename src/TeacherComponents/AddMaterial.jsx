import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../components/Spinner";
import { addStudent, getSubjects, sendMaterial } from "../slices/PanelSlice";
import { toast } from "react-toastify";

const AddMaterial = () => {
  const [data, setData] = useState({
    title: "",
    text: "",
    subject: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjects({ setData }));
  }, []);
  const { subjectsLoading, materialLoading, subjects } = useSelector(
    (store) => store.panel
  );
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  if (subjectsLoading) {
    return (
      <h1 className="text-center">
        <Spin />
      </h1>
    );
  }

  return (
    <div className="row bcg mt-2 rounded">
      <div className="col-12 fs-3 text-white">Add Material</div>
      <div className="col-12 text-light my-1">
        Title{" "}
        <input
          type="text"
          className="add-inp"
          onChange={handleChange}
          name="title"
          value={data.title}
        />
      </div>
      <div className="col-12 text-light my-1">
        Text{" "}
        <input
          type="text"
          className="add-inp"
          value={data.text}
          onChange={handleChange}
          name="text"
        />
      </div>
      <div className="col-12 text-light my-1">
        Subject{" "}
        <select onChange={(e) => setData({ ...data, subject: e.target.value })}>
          {subjects.map((el, index) => {
            return (
              <option value={el} key={index}>
                {el}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-12">
        <button
          className="btn btn-outline-light px-4 mt-2"
          onClick={() => {
            if (!data.subject || !data.title || !data.text) {
              toast.error("please fill all the details");
              return;
            }
            dispatch(sendMaterial(data));
            setData({
              title: "",
              text: "",
              subject: subjects[0],
            });
          }}
        >
          {materialLoading ? <Spin /> : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddMaterial;
