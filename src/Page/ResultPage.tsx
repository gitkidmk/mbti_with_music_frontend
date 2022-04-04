import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MBTI_description, MBTI_unit_description } from "Asset/data";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  answerState,
  questionSetState,
  mbtiResultState,
} from "Store/stateStore";
import Loading from "Component/Loading";
import Rader from "Component/Rader";
import MusicBox from "Component/MusicBox";
import useFetch from "Component/useFetch";

const ResultDescription = ({ top, unit }: any) => {
  const top_description = MBTI_description[top];

  return (
    <DescriptionBox>
      <TopMainDescription>{top_description[0]}</TopMainDescription>
      <TopDescription>{top_description[1]}</TopDescription>
      <UnitDescBox>
        {unit.map((u: number, index: number) => {
          const percentage = Math.round(u * 100);
          const strength =
            percentage < 10
              ? "low"
              : percentage < 40
              ? "midLow"
              : percentage < 60
              ? "mid"
              : percentage < 90
              ? "midHigh"
              : "high";
          return (
            <UnitBox id={String(index)} key={index} className={strength}>
              <div id={strength} className="unit">
                {top[index]}
              </div>
              <div id={top[index]} className="percentage">
                {percentage}%
              </div>
              <div id={top[index]} className="description">
                {MBTI_unit_description[top[index]]}
              </div>
            </UnitBox>
          );
        })}
      </UnitDescBox>
    </DescriptionBox>
  );
};
const RecommendedMusic = ({ music, mbti }: any) => {
  return music.map((m: any) => {
    m = JSON.parse(m);

    return (
      <MusicBox
        key={m.music_id}
        title={m.music_name}
        description={m.artist}
        thumbnailURL={m.thumbnail}
        videoId={m.music_id}
        mbti={mbti}
        great_count={m.great_count}
      />
    );
  });
};
const RetryAndShare = () => {
  return (
    <RetryAndShareBox>카카오톡, 인스타 공유 + 다시하기 img</RetryAndShareBox>
  );
};

const Result = () => {
  const question_set = useRecoilValue(questionSetState);
  const answer = useRecoilValue(answerState);
  const navigate = useNavigate();
  const [mbtiResult, setMbtiResult] = useRecoilState(mbtiResultState);
  const { loading, error } = useFetch(
    "post",
    "/mbti-results",
    {
      data: {
        question_set: question_set,
        answer: answer,
      },
    },
    setMbtiResult
  );

  //TODO: error handing

  console.log("result page...", loading, error, mbtiResult);

  return loading ? (
    <Loading />
  ) : error || mbtiResult === undefined ? (
    <ResultDiv>이런... 에러가 발생했어요ㅜㅜ{error}</ResultDiv>
  ) : (
    <ResultDiv>
      <ResultTitle>{mbtiResult.MBTI_result.top_result}</ResultTitle>
      <Rader data={mbtiResult.MBTI_result.all_result} />
      <ResultDescription
        top={mbtiResult.MBTI_result.top_result}
        unit={mbtiResult.MBTI_result.top_result_detail}
      />
      <RecommendedMusicTitle>
        {mbtiResult.MBTI_result.top_result}를 위한 음악😊
      </RecommendedMusicTitle>
      <RecommendedMusic
        music={mbtiResult.MBTI_music}
        mbti={mbtiResult.MBTI_result.top_result}
      />
      <UserMusicRecommendButton
        onClick={() => navigate("/user-recommendation")}
      >
        MBTI 음악 추천하기
      </UserMusicRecommendButton>
      <RetryAndShare />
    </ResultDiv>
  );
  // return <div>test</div>;
};

const ResultPage = () => {
  return <Result />;
};

export default ResultPage;

const ResultDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 400px 2fr;
  justify-items: center;
  align-items: center;
`;

const ResultTitle = styled.div`
  font-weight: bold;
  width: 90%;
  height: 50px;
  margin: 30px;
  font-size: 25px;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  border-color: rgb(2, 90, 77);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DescriptionBox = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 4fr;
  align-items: center;
  justify-items: center;
  width: 90%;
`;

const TopMainDescription = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const TopDescription = styled.div`
  line-height: 25px;
  margin-bottom: 10px;
`;

const UnitDescBox = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
`;

const UnitBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  justify-items: center;
  align-items: center;
  grid-row: ${(props) => `${Number(props.id) + 1} / ${Number(props.id) + 2}`};
  & > .unit {
    color: ${(props) =>
      `${
        props.className === "midLow"
          ? "rgb(255 0 0 / 20%)"
          : props.className === "midLow"
          ? "rgb(255 0 0 / 30%)"
          : props.className === "mid"
          ? "rgb(255 0 0 / 50%)"
          : props.className === "midHigh"
          ? "rgb(255 0 0 / 70%)"
          : "rgb(255 0 0 / 100%)"
      }`};
    grid-column: 1 / 2;
    font-size: 30px;
    font-weight: bold;
  }
  & > .percentage {
    grid-column: 2 / 3;
  }
  & > .description {
    grid-column: 3 / 4;
    text-align: center;
    margin: 0px 10px 10px 0px;
  }
`;

const RecommendedMusicTitle = styled.div`
  font-weight: bold;
  width: 90%;
  height: 50px;
  margin: 30px;
  font-size: 25px;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  border-color: rgb(2, 90, 77);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserMusicRecommendButton = styled.button`
  font-weight: bold;
  width: 90%;
  height: 100px;
  margin: 10px 0px 10px 0px;
  border-radius: 10px;
  background-color: rgb(2, 90, 77);
  font-size: 30px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RetryAndShareBox = styled.div`
  font-weight: bold;
  width: 90%;
  height: 60px;
  margin: 10px 0px 100px 0px;
  border-radius: 5px;
  background-color: #00000073;
  display: flex;
  align-items: center;
  justify-content: center;
`;
