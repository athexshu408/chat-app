import React from "react";

import "./detail.css";

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>jane does</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="options">
          <div className="title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Shered Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg"
                  alt=""
                />
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
              <img src="./download.png"  className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg"
                  alt=""
                />
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
              <img src="./download.png"  className="icon" alt="" />
            </div>
            
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button> Block User</button>
        <button className="logout"> Logout</button>

      </div>
    </div>
  );
};

export default Detail;
