import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Home";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import axios from "axios";

import styled from "styled-components";

import TestPage from "Page/TestPage";
import ResultPage from "Page/ResultPage";
import MusicRecPage from "Page/MusicRecPage";
import NotFoundPage from "Page/NotFoundPage";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/" : "api/";

const OuterDiv = styled.div`
  @media screen and (max-width: 768px) {
    width: 95vw;
  }
  height: 100%;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
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
          <Route path="/question-and-answer" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/user-recommendation" element={<MusicRecPage />} />
          <Route path="*" element={<NotFoundPage err_type="404" />} />
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
