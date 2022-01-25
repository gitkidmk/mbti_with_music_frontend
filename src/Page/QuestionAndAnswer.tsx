import React from "react";
import styled from "styled-components";

const QuestionAndAnswerBox = styled.div``;

const NumberBox = styled.div`
  font-weight: bold;
`;

const QuestionBox = styled.div``;

const AnswerBox = styled.div``;

const AnswerUnit = styled.div``;

const ProgressBar = styled.progress``;

const Loading = () => {
  return <image></image>;
};

const QuestionAndAnswer = () => {
  return (
    <QuestionAndAnswerBox>
      <NumberBox />
      <QuestionBox />
      <AnswerBox>
        <AnswerUnit></AnswerUnit>
        <AnswerUnit></AnswerUnit>
      </AnswerBox>
      <ProgressBar />
    </QuestionAndAnswerBox>
  );
};

export default QuestionAndAnswer;
