import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
// import Checkbox from "@mui/material/Checkbox";

function Authentication() {
  let navigate = useNavigate();
  let [formState, setFormState] = useState(0);
  let [snackOpen, setSnackOpen] = useState(false);
  let [data, setData] = useState({
    success: "",
    message: "",
    token: "",
  });
  let [inpVal, setInpVal] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  let handleOnChange = (e) => {
    setInpVal({
      ...inpVal,
      [e.target.name]: e.target.value,
    });
  };

  let handleOnClose = () => {
    setTimeout(() => {
      setSnackOpen(false);
    }, 3000);
  };

  let handleOnSubmit = async (e) => {
    e.preventDefault();



    if (formState === 0) {
      const Data = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        { ...inpVal }
      );

      setData({
        ...data,
        success: Data.data.success,
        message: Data.data.message,
      });
      setSnackOpen(true);
      setFormState(1);
      setInpVal({
        name: "",
        username: "",
        email: "",
        password: "",
      });

    } 


    
    if (formState === 1){
      const Data = await axios.post("http://localhost:8000/api/v1/user/login", {
        ...inpVal,
      });
      // console.log(Data.data.token);
      setData({
        ...data,
        success: Data.data.success,
        message: Data.data.message,
        token: Data.data.token,
      });

      let mainToken = Data.data.token;

      if(mainToken !== undefined){
        localStorage.setItem("token",Data.data.token);
      }else{
        navigate("/auth");
      }

     

      setSnackOpen(true);
      setInpVal({
        username: "",
        password: "",
        email: "",
      });
      
      navigate("/home");
      
    }


    

  };

  return (
    <div className="Auth-container">
      
      <div className="auth-main-body">
        <div className="col1">
          <img
            style={{ width: "100%" }}
            src="https://plus.unsplash.com/premium_photo-1690164680142-701cf794a832?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fFZhbGNhbm98ZW58MHx8MHx8fDA%3D"
          ></img>
        </div>

        <div className="col2">
          <form className="auth-form" onSubmit={handleOnSubmit}>
            <div
              className="auth-forms-icon"
              style={{
                textAlign: "center",
                lineHeight: "2rem",
                marginBottom: "1.5rem",
                // lineHeight: "3rem",
              }}
            >
              <button
                type="disbaled"
                className="lock-icon"
                style={{ marginBottom: "1rem" }}
              >
                < LockOutlinedIcon/>
              </button>
              <br />
              <div style={{ marginRight: "1rem" }}>
                <Button
                  onClick={() => {
                    setFormState(0);
                  }}
                  variant={formState === 0 ? "contained" : "text"}
                >
                  Sign in
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  onClick={() => {
                    setFormState(1);
                  }}
                  variant={formState === 1 ? "contained" : "text"}
                >
                  Sign up
                </Button>
              </div>
            </div>

            
            <div className="auth-forms-inputs">
              {formState === 0 ? (
                <TextField
                  id="outlined-basic"
                  label="Name"
                  name="name"
                  variant="outlined"
                  type="name"
                  value={inpVal.name}
                  onChange={handleOnChange}
                  required
                />
              ) : <></>}

              <br />

              <TextField
                id="outlined-basic"
                label="Username"
                name="username"
                type="username"
                variant="outlined"
                value={inpVal.username}
                onChange={handleOnChange}
                required
              />

              <br />

              <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={inpVal.email}
                onChange={handleOnChange}
                required
              />

              <br />

              <TextField
                id="outlined-basic"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={inpVal.password}
                onChange={handleOnChange}
                required
              />

              <br />
            </div>

            {/* <div>
              <Checkbox />
              &nbsp;
              <span>Remember me</span>
            </div> */}

            <button
              style={{
                padding: "0.7rem",
                width: "100%",
                backgroundColor: "#0d6efd",
                color: "white",
                fontSize: "1.2rem",
                // fontWeight: "bold",
                border: "none",
              }}
            >
              {formState === 0 ? "Sign in" : "Sign up"}
            </button>
          </form>
        </div>
      </div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleOnClose}
      >
        <Alert onClose={handleOnClose} severity={data.success} variant="filled">
          {data.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Authentication;
