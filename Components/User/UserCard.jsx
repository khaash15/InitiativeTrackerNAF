import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import Badge from "@mui/material/Badge";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import "./User.css";
import Rating from "../Rating/Rating";
import axios from "axios";
import DataContext from "../../Data/DataContext";
import React, { useLayoutEffect, useContext, useState, useEffect } from "react";

const Card = ({ name, email, rating, bio, id }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [starRating, setStarRating] = useState(0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  var newRole = 3;

  const [selectValueRole, setSelectValueRole] = useState();
  const onChange = (e) => {
    console.log(e.target.value, "roleId");
    setSelectValueRole(e.target.value);
    // setSelectValueRole(value);
  };
  const submitUser = () => {
    console.log(starRating, "rating");
    axios
      .put(`https://localhost:7265/api/User/Rating`, {
        id: id,
        rating: starRating,
      })
      .then((response) => {
        axios.get(`https://localhost:7265/api/User/${id}`).then((response) => {
          setIdeas2(response.data);
          console.log("line  36");
        });
        console.log(response);
      });

    axios
      .put(`https://localhost:7265/api/User`, {
        rId: selectValueRole,
        id: id,
      })
      .then((respon) => {
        console.log(respon.data);
      });
  };
  console.log(id, "khas");
  const { authMiddleware, auth } = useContext(DataContext);
  console.log(auth, "auth val");
  // console.log(auth.id);
  // useLayoutEffect(() => {
  //   authMiddleware();
  // }, []);

  const [role, setRole] = useState([]);
  const [ideas1, setIdeas1] = useState([]);
  const [ideas2, setIdeas2] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7265/api/User/${id}`).then((response) => {
      setIdeas2(response.data);
    });

    axios.get(`https://localhost:7265/api/Idea/get/${id}`).then((response) => {
      setIdeas1(response.data);
    });

    axios.get(`https://localhost:7265/api/Role`).then((response) => {
      console.log("Role Data", response.data);
      setRole(response.data);
    });
  }, []);

  return (
    <div className={`usercard-flip-container ${isFlipped ? "flipped" : ""}`}>
      <div className="usercard-flipper">
        <div className="usercard-front">
          <div className="usercard-name">
            <b>{name}</b>
          </div>
          <div className="usercard-mail">{email}</div>
          <div className="usercard-img">
            <img
              src="https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-picture-natural-light.jpg"
              className="usercard-userimg"
              alt="User"
            />
          </div>
          <div className="usercard-icon">
            <button className="usercard-icons">
              <Badge badgeContent={ideas2.rating} color="secondary">
                <StarOutlineIcon />
              </Badge>
            </button>
            <button className="usercard-icons">
              <Badge badgeContent={ideas1.length} color="secondary">
                <EmojiObjectsOutlinedIcon />
              </Badge>
            </button>
          </div>
          <div className="usercard-bio">{bio}</div>
          <div className="usercard-button">
            <button className="usercard-edit" onClick={handleFlip}>
              Edit
            </button>
          </div>
        </div>
        <div className="usercard-back">
          <div className="usercard-back-con">
            <div className="usercard-back-name">
              <b>{name}</b>
            </div>
            <div className="usercard-back-rating">
              Rating:
              <Rating
                starRating={starRating}
                setStarRating={setStarRating}
                val={ideas2.rating}
              />
            </div>
            <div className="usercard-back-Role">
              <select onChange={(e) => setSelectValueRole(e.target.value)}>
                <option defaultValue disabled>
                  Select Role
                </option>
                {role.map((rol) => (
                  <option value={rol.id} className="usercard-back-drop-down">
                    {rol.type}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="usercard-submit"
              onClick={() => {
                handleFlip();
                submitUser();
              }}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
