import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Home";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";

import styled from "styled-components";

// import QuestionAndAnswer from "./Page/QuestionAndAnswer";
// import Result from "./Page/Result";
// import UserRecommendation from "./Page/UserRecommendation";
import TestPage from "Page/TestPage";
import ResultPage from "Page/ResultPage";
import MusicRecPage from "Page/MusicRecPage";

const OuterDiv = styled.div`
  position: absolute;
  @media screen and (max-width: 500px) {
    width: 80%;
    left: 10%;
  }
  height: 100vh;
  width: 60%;
  left: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  -ms-overflow-style: none;
  -webkit-appearance: none;
  justify-content: center;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

ReactDOM.render(
  <OuterDiv>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="question-and-answer" element={<TestPage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="user-recommendation" element={<MusicRecPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </OuterDiv>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
