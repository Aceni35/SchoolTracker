import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../components/Spinner";
import { addStudent, removeUser } from "../slices/PanelSlice";
import { toast } from "react-toastify";

const Remove = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const { removeLoading } = useSelector((store) => store.panel);

  return (
    <div className="row bcg mt-2 rounded">
      <div className="col-12 fs-3 text-white">Remove User</div>
      <div className="col-12 text-light my-1">
        Index{" "}
        <input
          type="text"
          className="add-inp"
          onChange={(e) => setData(e.target.value)}
          name="name"
          value={data}
        />
      </div>
      <div className="col-12">
        <button
          className="btn btn-outline-light px-4 mt-2"
          onClick={() => {
            if (!data) {
              toast.error("please fill all the details");
              return;
            }
            dispatch(removeUser(data));
            setData("");
          }}
        >
          {removeLoading ? <Spin /> : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default Remove;
