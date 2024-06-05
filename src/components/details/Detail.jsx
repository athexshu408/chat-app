import React from "react";

import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { userStore } from "../../lib/userStore";
import { usechatStore } from "../../lib/usechatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
  } = usechatStore();
  const { currentuser } = userStore();
  const handleBlock = async () => {

    if(!user)return;
         
    const userDocRed = doc(db,"users",currentuser.id);

    try {
            await updateDoc(userDocRed ,{
              blocked : isReceiverBlocked? arrayRemove(user.id): arrayUnion(user.id)
            })
            changeBlock()
    } catch (error) {
      
    }
     
  };
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
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
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg"
                  alt=""
                />
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}> {isCurrentUserBlocked? "you are block" : isReceiverBlocked? "User Blocked" : "Block User"}</button>
        <button className="logout" onClick={() => auth.signOut()}>
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
