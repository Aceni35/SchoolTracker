import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../components/Spinner";
import {
  addStudent,
  getSubjects,
  sendMaterial,
  sendNews,
} from "../slices/PanelSlice";
import { toast } from "react-toastify";
import { getFaculties } from "../slices/AdminSlice";

const ShareNews = () => {
  const [data, setData] = useState({
    title: "",
    text: "",
    type: "faculty",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjects());
    dispatch(getFaculties());
  }, []);
  const {
    subjectsLoading,
    subjects,

    newsLoading,
  } = useSelector((store) => store.panel);
  const { faculties, facultiesLoading } = useSelector((store) => store.admin);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  if (subjectsLoading || facultiesLoading) {
    return (
      <h1 className="text-center">
        <Spin />
      </h1>
    );
  }

  return (
    <div className="row bcg mt-2 rounded">
      <div className="col-12 fs-3 text-white">Share News</div>
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
        Type{" "}
        <select
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
        >
          <option value="faculty">faculty</option>
          {faculties.map((el, index) => {
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
            if (!data.text || !data.title || !data.type) {
              toast.error("please fill all the details");
              return;
            }
            dispatch(sendNews(data));
            setData({
              title: "",
              text: "",
              type: "faculty",
            });
          }}
        >
          {newsLoading ? <Spin /> : "Add"}
        </button>
      </div>
    </div>
  );
};

export default ShareNews;
