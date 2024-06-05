// import './index.css';

import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/details/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./lib/firebase";
import { userStore } from "./lib/userStore";
import UserInfo from "./components/list/userinfo/UserInfo";
import { usechatStore } from "./lib/usechatStore";

function App() {
  const { chatId } = usechatStore();

  const { currentuser, isLoading, fetchUserInfo } = userStore();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unsub();
    };
  }, [fetchUserInfo]);

  console.log(UserInfo);
  // const user = false ;

  if (isLoading) return <div className="loading">Loading</div>;
  return (
    <div className="container">
      {currentuser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
