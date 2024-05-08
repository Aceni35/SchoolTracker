import React from "react";
import NewElement from "../components/NewElement";
import { useSelector } from "react-redux";

const TeacherNews = () => {
  const { news } = useSelector((store) => store.home);
  return (
    <div className="row">
      <div className="col-12 news underline">
        <div className="row">
          <div className="col-12 my-1">
            <span className="text-cartoon text-white px-3 fs-2">
              - The latest News
            </span>
          </div>
        </div>
        <div className="row">
          {news.map((el, index) => {
            return (
              <NewElement
                key={index}
                name={el.title}
                text={el.text}
                time={el.time}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherNews;
