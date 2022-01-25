import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import styled from "styled-components";

import QuestionAndAnswer from "./Page/QuestionAndAnswer";
import Result from "./Page/Result";
import UserRecommendation from "./Page/UserRecommendation";

const OuterDiv = styled.div`
  position: absolute;
  height: 93vh;
  width: 90%;
  margin: 2% 5% 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  -ms-overflow-style: none;
  -webkit-appearance: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

ReactDOM.render(
  <OuterDiv>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="question-and-answer" element={<QuestionAndAnswer />} />
        <Route path="result" element={<Result />} />
        <Route path="user-recommendation" element={<UserRecommendation />} />
      </Routes>
    </BrowserRouter>
  </OuterDiv>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
