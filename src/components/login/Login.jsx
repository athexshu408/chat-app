import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";

import { auth, db } from "../../lib/firebase";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// import { upload } from "@testing-library/user-event/dist/upload";
import Upload from "../../lib/Upload";

const Login = () => {
  // const user = false;

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLog = async(e) => {
    setLoading(true)
    const formData = new FormData(e.target);

    const {  email, password } = Object.fromEntries(formData);
    console.log( email, password);
    e.preventDefault(); // Prevents the default action of the event (e.g., form submission)
    // Displays an error toast notification with the message "hello"
    try{
            await signInWithEmailAndPassword(auth,email,password);
            toast.success("login success");
    }catch(err){
      console.log(err);
      toast.error("somthing wrong");
    }finally{
      setLoading(false)
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
     setLoading(true)
    // e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    console.log(username, email, password);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await Upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
        // avatar:res.user.photoURL,
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
        // avatar:res.user.photoURL,
      });

      toast.success("sucessfully registered");
    } catch (err) {
      console.log(err);
      toast.error("somthing wrong");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcom Back</h2>
        <form onSubmit={handleLog}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "LogIn"}</button>
        </form>
      </div>
      <div className="separatore"></div>
      <div className="item">
        <h2>Create And Acoount </h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Add A phot
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
