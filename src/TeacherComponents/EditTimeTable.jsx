import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../components/Spinner";
import {
  changeFaculty,
  getTimeTables,
  removeClass,
  updateTimeTable,
} from "../slices/PanelSlice";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import AddModal from "./AddModal";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const EditTimeTable = () => {
  const [selected, setSelected] = useState(0);
  const [show, setShow] = useState(false);
  const {
    ttLoading,
    timeTables,
    selected: tt,
    editLoading,
  } = useSelector((store) => store.panel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimeTables());
  }, []);

  const changeDayUp = () => {
    if (selected === 4) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  };
  const changeDayDown = () => {
    if (selected === 0) {
      setSelected(4);
    } else {
      setSelected(selected - 1);
    }
  };
  if (ttLoading) {
    return (
      <h1 className="text-center">
        <Spin />
      </h1>
    );
  }

  return (
    <>
      <AddModal show={show} setShow={setShow} day={days[selected]} />
      <div className="row bcg text-light rounded">
        <div className="col-12 text-light fs-4 ">
          Edit Timetable{" "}
          <select
            className="ms-4 fs-5"
            value={selected.name}
            onChange={(e) => dispatch(changeFaculty(e.target.value))}
          >
            {timeTables.map((el, index) => {
              return (
                <option key={index} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12 fs-6 text-light">
          note* you can only edit one day at a time
        </div>
        <div className="col-12 text-center fs-4">
          <FaArrowAltCircleLeft
            className="me-2"
            size={30}
            cursor="pointer"
            onClick={() => changeDayDown()}
          />
          {days[selected]}
          <FaArrowAltCircleRight
            className="ms-2"
            size={30}
            cursor="pointer"
            onClick={() => changeDayUp()}
          />
        </div>
        <div className="col-12 underline mt-3"></div>

        {tt.tt[days[selected]].map((el, index) => {
          return (
            <div
              className="col-12 underline mt-3 fs-4 class py-2"
              style={{ border: "solid 2px white" }}
            >
              <div className="row" key={index}>
                <div className="col-8">{el.subject}</div>
                <div className="col-2 fs-5">{el.time}</div>
                <div className="col-2">
                  <MdOutlineRemoveCircleOutline
                    size={35}
                    onClick={() =>
                      dispatch(removeClass({ day: days[selected], cls: el }))
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="col-12 underline mt-3">
          <button
            className="btn btn-success"
            onClick={() => {
              dispatch(
                updateTimeTable({
                  name: tt.name,
                  tt: tt.tt,
                  subjects: tt.subjects,
                })
              );
            }}
            disabled={editLoading}
          >
            {editLoading ? <Spin /> : "Update"}
          </button>
          <button
            className="btn btn-light mx-4 my-2"
            onClick={() => setShow(true)}
          >
            Add new Class
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTimeTable;
