import React, { useState, useEffect } from "react";
import styled from "styled-components";
import question from "Asset/question";
import { createData } from "Asset/data";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuestionAndAnswerBox = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 5fr 2fr 0.6fr;
  justify-items: center;
  align-items: center;
`;

const NumberBox = styled.div`
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionBox = styled.div`
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnswerBox = styled.div`
  font-weight: bold;
  width: 100%;
  height: 100%;
`;

const AnswerUnit = styled.div`
  font-weight: bold;
  width: 100%;
  height: 40%;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: rgb(2, 90, 77);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressBar = styled.progress`
  color: rgb(2, 90, 77);
`;

type LoadingType = {
  type: string;
  answer: number[];
};

const Loading = ({ type, answer }: LoadingType) => {
  const [load, setLoad] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);
  let navigate = useNavigate();

  async function getMbtiResult(question_set: string, answer: number[]) {
    try {
      const response = await axios.post("/mbti-results", {
        question_set: question_set,
        answer: answer,
      });
      setResult(response.data);
      setLoad(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMbtiResult(type, answer);
  }, []);
  useEffect(() => {
    console.log(load, result);
    if (load === false) {
      console.log(result);
      navigate(`/result`, { state: { result } });
    }
  }, [load, navigate, result]);
  return <img alt="loading" />;
};

const QuestionAndAnswer = () => {
  const [index, setIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<number[]>([]);
  const keys = Object.keys(question);
  const rnd_idx = Math.floor(Math.random() * keys.length);
  const type: string = keys[rnd_idx];

  const rnd_question = question[type];

  const p = ((index / 12) * 100).toString();
  console.log("p: ", p);

  return index >= 12 ? (
    <Loading type={type} answer={answer} />
  ) : (
    <QuestionAndAnswerBox>
      <NumberBox>
        {index + 1}/{rnd_question.length}
      </NumberBox>
      <QuestionBox>{rnd_question[index]}</QuestionBox>
      <AnswerBox>
        <AnswerUnit
          onClick={() => {
            setIndex(index + 1);
            let tmp_ans = answer;
            tmp_ans.push(1);
            setAnswer(tmp_ans);
          }}
        >
          YES
        </AnswerUnit>
        <AnswerUnit
          onClick={() => {
            setIndex(index + 1);
            let tmp_ans = answer;
            tmp_ans.push(-1);
            setAnswer(tmp_ans);
          }}
        >
          NO
        </AnswerUnit>
      </AnswerBox>
      <ProgressBar id={p} value={p} max={100} />
    </QuestionAndAnswerBox>
  );
};

export default QuestionAndAnswer;
