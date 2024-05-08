import React from "react";
import { LuCalendarClock } from "react-icons/lu";
import { FaChartPie } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Options = ({ setShowTime, setShowAttendance }) => {
  const { role } = useSelector((store) => store.home);
  return (
    <div className="row underline  ">
      <div className="col-6 mb-3">
        <div className="options fs-5" onClick={() => setShowTime(true)}>
          TimeTable <LuCalendarClock size={30} className="ms-2" />
        </div>
      </div>
      {role != "teacher" && (
        <div className="col-6 fs-5 mb-3">
          <div className="options" onClick={() => setShowAttendance(true)}>
            Attendance <FaChartPie size={30} className="ms-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
