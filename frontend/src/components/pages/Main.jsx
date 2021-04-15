import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Happy } from "react-happytext";
import Reveal from "react-reveal/Reveal";
import Lottie from "react-lottie";
import animationData from "../../assets/raisingLand.json";
import TextyAnim from "rc-texty";
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
 
const Main = () => {
  return (
  <div>
      <div className="Home__center">
        <center>
          <h1 className="Home__h1">
            Welcome to <Happy value="Farm.to" />
          </h1>

          <h3 className="Home__h3">
            <TextyAnim style={{ display: "inline-block" }}>
              A community for Farmers
            </TextyAnim>
          </h3>
        </center>
      </div>

      <Lottie
        options={defaultOptions}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      </div>
  );
};

export default Main;
