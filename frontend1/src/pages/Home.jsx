import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
// import TextField from '@mui/icons-material/TextField';

import WithAuth from "../utils/WithAuth";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { GeneralContext } from "../context/GeneralContext";

import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';


import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Home() {
  let { getHistory } = useContext(GeneralContext);
  let token = localStorage.getItem("token");
  let [meetingCode, setMeetingCode] = useState("");
  let [showHistory, setShowHistory] = useState(false);
  let [meetingHistory, setMeetingHistory] = useState([]);
  let routerTo = useNavigate();

  let handleMeetingCode = async () => {
    let val = await axios.post(
      "http://localhost:8000/api/v1/user/add_to_activity",
      {
        token,
        meetingCode,
      }
    );

    let isTrue = val.data.success;
    setMeetingCode("");

    if (isTrue) {
      routerTo(`/${meetingCode}`);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let getVal = await getHistory();
        setMeetingHistory(getVal.data.getMeetings);
      } catch (e) {
        console.log(e);
      }
    };
    fetchHistory();
  }, []);

  let handleHistory = async () => {
    setShowHistory(!showHistory);
  };

  let formateDate = (dateString) =>{
    let date = new Date(dateString);
    let day = date.getDate().toString().padStart(2,"0");
    let month = (date.getMonth()+1).toString().padStart(2,"0");
    let year = date.getFullYear();

    return `${day}/${month}/${year}`

  }

  return (
    <div className="home-body">
      {showHistory === true ? (
        <div className="History-body">
          <h3 style={{ textAlign: "center" }}> Your History </h3>
          <div>
            {meetingHistory.map((e, index) => {
              return (
                <>
                  <div key={index} >
                  <Card variant="outlined"  style={{backgroundColor:"#0d6efd", color:"white", border:"none"}}>
                    <CardContent>
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }} style={{color:"white"}}>
                        Code: {e.meetingCode}
                      </Typography>
                      <Typography variant="body2">
                       Date: {formateDate(e.date)}
                      </Typography>
                    </CardContent>

                  </Card>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      <nav className="navBar-body-container">
        <div className="navbar-heading-container">
          <h2>Zoom Video Call</h2>
        </div>
        <div className="navBar-options">
          <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
            <Button variant="contained" onClick={handleHistory}>
              <HistoryIcon />
              <p>History</p>
            </Button>
          </div>

          <div
            style={{ display: "flex", gap: "5px", cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("token");
              routerTo("/auth");
            }}
          >
            <Button>
              <LogoutIcon />
              <p>Logout</p>
            </Button>
          </div>
        </div>
      </nav>

      <div className="home-inner-body">
        <div className="home-inner-part1">
          <h2>
            <i>Providing Quality Video Call Just Like Education</i>
          </h2>
          <TextField
            id="outlined-basic"
            label="Meeting code"
            variant="outlined"
            value={meetingCode}
            type="Number"
            onChange={(e) => {
              setMeetingCode(e.target.value);
            }}
            required
          />{" "}
          &nbsp; &nbsp;
          <Button
            variant="contained"
            id="Button-basic"
            onClick={handleMeetingCode}
          >
            Send
          </Button>
        </div>

        <div className="home-png-part">
          <img
            src="../public/logo.png"
            className="home-png-img"
            alt="mobile-img"
          />
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Home);
