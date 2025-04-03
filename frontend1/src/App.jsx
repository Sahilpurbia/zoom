import { useState } from "react";
import Landing from "./pages/landing";
import Authentication from "./pages/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VideoMeet from "./pages/VideoMeet";
import Home from "./pages/Home";
import {GeneralProvider} from "./context/GeneralContext";

function App() {
  return (
    <>
      
        <BrowserRouter>
        <GeneralProvider>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/Auth" element={<Authentication />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/:url" element={<VideoMeet />}></Route>
          </Routes>
          </GeneralProvider>
        </BrowserRouter>
      
    </>
  );
}

export default App;
