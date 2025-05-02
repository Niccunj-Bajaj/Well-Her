// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import ReactMarkdown from "react-markdown";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    loadingProgress,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Well-Her</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, User.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Who is a healthy women?</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>What are the common diseases?</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Percautions to take to minimize risks?</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>What does XOXO medicine do?</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="resultTitle">
              <img src={assets.user_icon} alt="" />
              <p className="white">{recentPrompt}</p>
            </div>
            <div className="resultData">
              <img src={assets.girly_ai_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <div className="progress-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              ) : (
                <div className="markdown-content white">
                  <ReactMarkdown>{resultData}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here..."
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img
                onClick={() => {
                  onSent();
                }}
                src={assets.send_icon}
                alt=""
              />
            </div>
          </div>
          {/* <p className="bottom-info">
                    Hello i will help
                </p> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
