import React from "react";
import AddStudent from "./AddStudent";
import AddTeacher from "./AddTeacher";
import AddMaterial from "./AddMaterial";
import ShareNews from "../pages/ShareNews";
import Remove from "./Remove";
import EditTimeTable from "./EditTimeTable";

const ReturnShow = ({ show }) => {
  if (show === 0) {
    return <AddStudent />;
  } else if (show === 1) {
    return <AddTeacher />;
  } else if (show === 2) {
    return <AddMaterial />;
  } else if (show === 3) {
    return <ShareNews />;
  } else if (show === 5) {
    return <Remove />;
  } else if (show === 4) {
    return <EditTimeTable />;
  }
};

export default ReturnShow;
