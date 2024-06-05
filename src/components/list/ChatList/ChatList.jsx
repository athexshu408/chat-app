import React, { useEffect, useState } from "react";

import "./chatlist.css";
import Adduser from "../../adduser/Adduser";
import { userStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot ,updateDoc} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { usechatStore } from "../../../lib/usechatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const { currentuser } = userStore();
  const { changeChat,chatId } = usechatStore();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentuser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return {
            ...item,
            user
          };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentuser.id]);



  console.log(chats);


  const handleSelect = async (chat) =>{
    const userChats = chats.map((item)=>{

      const {user, ...rest} = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId)
         

    userChats [chatIndex].isSeen=true;

     const userChatRef = doc(db,"userchats",currentuser.id);


     try{
         await updateDoc(userChatRef, {
          chats:userChats
        });
        changeChat(chat.chatId,chat.user);
     }catch (err){
  console.log(err)
     }

    changeChat(chat.chatId,chat.user);
  }

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {chats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)}
          style={{backgroundColor: chat?.isSeen ? "transparent" :"#608bfada"}}
        >
          <img src={chat.user?.avatar ||"./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user?.username || "somthing wrong"}</span>
            <p>{chat.lastMessage } </p>
          </div>
        </div>
      ))}

      {addMode && <Adduser />}
    </div>
  );
};

export default ChatList;
