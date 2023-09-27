import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) return <div>Please Login</div>;


  return <div>Hello and welcome {user.username} </div>;


  
};

export default Profile;
