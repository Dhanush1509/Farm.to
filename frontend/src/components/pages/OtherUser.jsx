import React,{useState, useContext, useEffect} from 'react'
import AuthContext from "../../components/context/Auth/AuthContext"
import {LinkContainer} from "react-router-bootstrap"
import farmersvg from "../../assets/farmer.svg"
const OtherUser = ({match}) => {
    const {getUserInfoOfOthers,otherUserDetails}=useContext(AuthContext)
    
    useEffect(() => {
getUserInfoOfOthers(match.params.userid)
//eslint-disable-next-line
    },[])
    return otherUserDetails ? (
      <div className="divInProfile">
        <div className="cardInProfile m-5">
          <div className="banner">
            <div className="svgimage">
              <img src={farmersvg} alt="farmersvg" />
            </div>
          </div>

          <h2 className="name" style={{ marginTop: "75px" }}>
            {otherUserDetails.name}
          </h2>
          <div className="title">{otherUserDetails.role}</div>
          <div className="actions">
            <div className="follow-info">
              <h2>
                <a href="#">
                  <span>{otherUserDetails.followers.length}</span>
                  <small>Followers</small>
                </a>
              </h2>
              <h2>
                <a href="#">
                  <span>{otherUserDetails.following.length}</span>
                  <small>Following</small>
                </a>
              </h2>
            </div>
            <div className="follow-btn mb-2">
              <button style={{ color: "white" }}>Follow</button>
            </div>{" "}
            <div className="follow-btn mb-2">
              <button style={{ backgroundColor: "#56cc9d", color: "white" }}>
                Read Articles
              </button>
            </div>{" "}
            <div className="follow-btn">
              <button style={{ backgroundColor: "#d9831f", color: "white" }}>
                Read Profile
              </button>
            </div>
          </div>
          <div className="desc">
            Morgan has collected ants since they were six years old and now has
            many dozen ants but none in their pants.
          </div>
        </div>
      </div>
    ) : (
      <></>
    );

  }

export default OtherUser
 
       