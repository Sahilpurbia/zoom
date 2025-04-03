import React from "react";
import {Link, useNavigate} from 'react-router-dom';

function Landing() {
  let navigate = useNavigate();

  let handleGetStarted = () =>{
    navigate("/auth");
  }
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="tag-navBar">
          <h1 className="m-h">Zoom video call</h1>
        </div>
        <div className="auth-nav-setting">
          <Link to="/:fjdj">Join as Guest</Link>
          <Link to="/auth" >Register</Link>
          <Link to="/auth" style={{ width: "6rem" }}>
            Login
          </Link>
        </div>
      </nav>
      <div className="main-body">
        <div className="text-part">
          <h1><span style={{color:"orange"}}>Connect </span>with your Loves Ones</h1>
          <h3>Cover a distance by Zoom video call</h3>
          <button
            style={{
              padding: "0.65rem",
              borderRadius: "5px",
              width: "7.5rem",
              fontSize: "1rem",
              fontWeight:"bold",
              color:"white",
              backgroundColor:"orange",
            }}
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
        <div className="png-part">
          <img
            src="../public/mobile.png"
            className="mobile-img"
            alt="mobile-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
