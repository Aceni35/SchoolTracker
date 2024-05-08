import React from "react";

const NewElement = ({ url, name, time, text }) => {
  // const { text, time, title } = news;
  const source = url
    ? url
    : "https://www.shorttermprograms.com/images/cache/600_by_314/uploads/institution-logos/harvard-university.png";

  return (
    <div className="col-3 newEl mt-1 mb-3 mx-2">
      <div className="row">
        <div className="col-12 ">
          <div
            className="text-center mt-3 rounded"
            style={{ overflow: "hidden" }}
          >
            <img src={source} alt="" className="newsImg" />
          </div>
        </div>
        <div className="col-12 my-2 fs-4 ms-1">{name}</div>
        <div className="col-12 my-2">{time}</div>
      </div>
    </div>
  );
};

export default NewElement;
