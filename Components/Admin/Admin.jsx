import React, { useContext, useEffect,useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../Data/DataContext";
import UserCard from "../User/UserCard";
import { useState } from "react";
import axios from "axios";
const Admin = () => {
  // const navigate = useNavigate();
  // const {auth} = useContext(DataContext);
  // useEffect(() => {
  // if(auth!=="Admin")
  // {
  //   navigate("/")
  // }

  // }, []);
  const { authMiddleware, auth, checkValues } = useContext(DataContext);
  useLayoutEffect(() => {
    authMiddleware();
  }, []);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7265/api/User`).then((response) => {
      console.log(response.data);
      setUserList(response.data.value);
    });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {userList.map((p) => {
        return (
          <UserCard
            id={p.id}
            name={p.userName}
            email={p.email}
            rating={p.rating}
            bio={p.bio}
            title={p.title}
            shortdescription={p.shortdescription}
            longdescription={p.longdescription}
            createdTime={p.createdTime}
          />
        );
      })}
    </div>
  );
};

export default Admin;
