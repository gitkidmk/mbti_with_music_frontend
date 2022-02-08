import { useEffect, useState } from "react";
import styled from "styled-components";
import question from "Asset/question";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { questionSetState, answerState } from "Store/stateStore";

function chooseQuestionSet() {
  const keys = Object.keys(question);
  const rnd_idx = Math.floor(Math.random() * keys.length);
  const question_set: string = keys[rnd_idx];

  return question_set;
}

const TestPage = () => {
  const [index, setIndex] = useState<number>(0);
  const [answer, setAnswer] = useRecoilState<number[]>(answerState);
  const [questionSet, setQuestionSet] =
    useRecoilState<string>(questionSetState);
  let navigate = useNavigate();

  const percentage = ((index / 12) * 100).toString();

  useEffect(() => {
    const q_set = chooseQuestionSet();
    setQuestionSet(q_set);
    setAnswer([]);
    console.log("초기화");
  }, [setQuestionSet, setAnswer]);

  useEffect(() => {
    if (index >= 12) {
      navigate(`/result`);
    }
  }, [index, navigate]);

  return (
    <QuestionAndAnswerBox>
      <QuestionNumber>
        {index + 1}/{question[questionSet].length}
      </QuestionNumber>
      <Question>{question[questionSet][index]}</Question>
      <Answer>
        <AnswerUnit
          id="yes"
          onClick={() => {
            setIndex(index + 1);
            setAnswer((answer): number[] => [...answer, 1]);
          }}
        >
          YES
        </AnswerUnit>
        <AnswerUnit
          id="no"
          onClick={() => {
            setIndex(index + 1);
            setAnswer((answer): number[] => [...answer, -1]);
          }}
        >
          NO
        </AnswerUnit>
      </Answer>
      <ProgressBar value={percentage} max={100} />
    </QuestionAndAnswerBox>
  );
};

export default TestPage;

const QuestionAndAnswerBox = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 5fr 2fr 0.6fr;
  justify-items: center;
  align-items: center;
`;

const QuestionNumber = styled.div`
  font-weight: bold;
  font-size: 25px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Question = styled.div`
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Answer = styled.div`
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
