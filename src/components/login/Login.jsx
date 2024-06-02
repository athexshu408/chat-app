import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
const Login = () => {
  // const user = false;

  const [avatar,setAvatar] = useState({

      file:null,
      url:""
    }
  )
 
   const handleAvatar = e =>{
    if(e.target.files[0]){

        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
    }
   }

   const handleLog = (e) => {
    e.preventDefault(); // Prevents the default action of the event (e.g., form submission)
    toast.error("hello"); // Displays an error toast notification with the message "hello"
};


  return (
    <div className="login">
      <div className="item">
        <h2>Welcom Back</h2>
        <form action="">
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="password" />
          <button>Login </button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create And Acoount </h2>
        <form onSubmit={handleLog}>
            <label htmlFor="file">
                <img src={avatar.url || "./avatar.png"} alt="" />Add A phot</label>
            <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
            <input type="text" placeholder="Username" />
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="password" />
          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
