import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Mail from "../components/Mail";
import { IoIosSend } from "react-icons/io";
import { IoIosMailOpen } from "react-icons/io";
import WriteMail from "../components/WriteMail";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { changeDisplay, getMails, setRead } from "../slices/MailSlice";
import SearchModal from "../components/SearchModal";

const Message = () => {
  const { mailLoading, display } = useSelector((store) => store.mail);
  const [show, setShow] = useState("write");
  const [showSearch, setShowSearch] = useState(false);
  const [selected, setSelected] = useState(0);
  const [selectedMail, setSelectedMail] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMails());
  }, []);
  if (mailLoading) {
    return (
      <>
        <Navbar />
        <h1 className="text-center my-2">
          <Spinner />
        </h1>
      </>
    );
  }
  const class2 = "col-6 text-center py-2 bg-white text-dark";
  const class1 = "col-6 text-center py-2";
  return (
    <>
      {showSearch && <SearchModal show={showSearch} setShow={setShowSearch} />}
      <Navbar />
      <div className="container-lg mt-3">
        <div className="row message-box rounded">
          <div
            className="col-3 test px-0"
            style={{ borderRight: "solid 2px white", overflow: "hidden" }}
          >
            <div className="row underline">
              <div
                className={selected === 0 ? class1 : class2}
                style={{ borderRight: "solid 3px white" }}
                onClick={() => {
                  dispatch(changeDisplay(0));
                  setSelected(1);
                }}
              >
                Sent <IoIosSend />
              </div>
              <div
                className={selected === 1 ? class1 : class2}
                onClick={() => {
                  dispatch(changeDisplay(1));
                  setSelected(0);
                }}
              >
                Received <IoIosMailOpen />
              </div>
            </div>
            <div
              className="hide-scroll"
              style={{ overflowY: "scroll", height: "510px" }}
            >
              {display.map((el, index) => {
                let color = "#3d4557";
                if (selectedMail === el) {
                  color = "#1c1e25";
                }
                return (
                  <div
                    className="row new-message py-2 mx-0 "
                    key={index}
                    style={{ backgroundColor: color, height: "70px" }}
                    onClick={() => {
                      dispatch(setRead(el));
                      setSelectedMail(el);
                      setShow("read");
                    }}
                  >
                    <div className="col-8">
                      <div className="col-12 fs-5">{el.from}</div>
                      <div className="col-12 fs-6">{el.subject}</div>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                      24.12.2024
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-9 ">
            {show === "write" ? (
              <WriteMail show={showSearch} setShow={setShowSearch} />
            ) : (
              <Mail />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-3 text-center">
            <div className="row">
              <button className="btn btn-dark" onClick={() => setShow("write")}>
                Write a mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
