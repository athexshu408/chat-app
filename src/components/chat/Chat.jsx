import React, { useEffect, useState } from "react";

import "./chat.css";

import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  documentId,
  getDoc,
  onSnapshot,
  onSnapshotsInSync,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { usechatStore } from "../../lib/usechatStore";
import { userStore } from "../../lib/userStore";
import { update } from "firebase/database";
import Upload from "../../lib/Upload";
// import { upload } from "@testing-library/user-event/dist/upload";
const Chat = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");

  const [image, setImage] = useState({
    file: null,
    url: "",
  });

  const endRef = useState(null);

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    usechatStore();
  const { currentuser } = userStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(chat);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  // console.log(text);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;
    try {
      if (image.file) {
        imgUrl = await Upload(image.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentuser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { image: imgUrl }),
        }),
      });

      const userIds = [currentuser.id, user.id];

      userIds.forEach(async (id) => {
        const userChatref = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatref);

        if (userChatsSnapshot.exists()) {
          const userChatData = userChatsSnapshot.data();

          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentuser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatref, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    setImage({
      file: null,
      url: "",
    });
    setText("");
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Atharv Ingale</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={
              message?.senderId === currentuser?.id
                ? "message Own "
                : "message "
            }
            key={message?.createAt}
          >
            <div className="texts">
              {message.image && <img src={message.image} alt="" />}
              <p>{message.text}</p>
              <span>1 min ago</span>
            </div>
          </div>
        ))}

        {image.url && (
          <div className="message Own">
            <div className="texts">
              <img src={image.url} alt="" />
            </div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            onChange={handleImage}
            style={{ display: "none" }}
          />
          <img src="./camera.png" alt="" />

          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "you can not send message"
              : "Type a message...."
          }
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
