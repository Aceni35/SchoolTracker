import React from "react";
import NewElement from "./NewElement";
import { useSelector } from "react-redux";

const News = () => {
  const { news } = useSelector((store) => store.home);
  return (
    <div className="row">
      <div className="col-12 news underline">
        <div className="row">
          <div className="col-12 my-1">
            <span className="text-cartoon text-white px-3 fs-2">
              - Faculty News ...
            </span>
          </div>
        </div>
        <div className="row">
          {news.faculty.map((el, index) => {
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
      <div className="col-12 news">
        <div className="row">
          <div className="col-12 my-1">
            <span className="text-cartoon text-white px-3 fs-2">
              - News About Elektrotehnika ...
            </span>
          </div>
        </div>
        <div className="row">
          {news.field.map((el, index) => {
            console.log(el);
            return (
              <NewElement
                url="https://www.udg.edu.me/site_assets/img/logo.png"
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

export default News;
