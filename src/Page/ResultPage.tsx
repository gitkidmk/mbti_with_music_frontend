import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MBTI_description, MBTI_unit_description } from "Asset/data";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  answerState,
  questionSetState,
  mbtiResultState,
  thumbsUpState,
} from "Store/stateStore";
import Loading from "Component/Loading";
import Rader from "Component/Rader";
import MusicBox from "Component/MusicBox";
import useFetch from "Component/useFetch";
import Modal from "Component/Modal";
import NotFoundPage from "Page/NotFoundPage";

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
  return (
    <RecommendedMusicBox>
      {music.map((m: any) => {
        m = JSON.parse(m);

        return (
          <MusicBox
            key={m.music_id}
            title={m.music_name}
            description={m.description}
            thumbnailURL={m.thumbnail}
            videoId={m.music_id}
            mbti={mbti}
            great_count={m.great_count}
          />
        );
      })}
    </RecommendedMusicBox>
  );
};
const RetryAndShare = () => {
  return (
    <RetryAndShareBox>
      <div className="addthis_inline_share_toolbox"></div>
    </RetryAndShareBox>
  );
};

const Result = () => {
  const question_set = useRecoilValue(questionSetState);
  const answer = useRecoilValue(answerState);
  const navigate = useNavigate();
  const [mbtiResult, setMbtiResult] = useRecoilState(mbtiResultState);
  const [thumbsUp] = useRecoilState<number | null>(thumbsUpState);
  const { loading, error } = useFetch(
    "post",
    "/results",
    {
      data: {
        question_set: question_set,
        answers: answer,
      },
    },
    setMbtiResult
  );

  //TODO: error handing

  return loading ? (
    <Loading />
  ) : error || mbtiResult === undefined ? (
    <NotFoundPage />
  ) : (
    <ResultDiv>
      <ResultTitle>
        <h1>{mbtiResult.mbti.topType}</h1>
      </ResultTitle>
      <RaderBox>
        <Rader data={mbtiResult.mbti.entireTypeRough} />
      </RaderBox>
      <ResultDescription
        top={mbtiResult.mbti.topType}
        unit={mbtiResult.mbti.topTypeDetail}
      />
      <RecommendedMusicTitle>
        {mbtiResult.mbti.topType}를 위한 음악😊
      </RecommendedMusicTitle>
      {thumbsUp === null ? null : <Modal isThumbsUped={thumbsUp} />}
      <RecommendedMusic
        music={mbtiResult.musics}
        mbti={mbtiResult.mbti.topType}
      />
      <UserMusicRecommendButton
        onClick={() => navigate("/user-recommendation")}
      >
        나만의 MBTI 음악 추천하기
      </UserMusicRecommendButton>
      <RetryAndShare />
    </ResultDiv>
  );
};

const ResultPage = () => {
  return <Result />;
};

export default ResultPage;

const ResultDiv = styled.div`
  @media screen and (max-width: 768px) {
    grid-template-rows: 150px 350px 2fr;
  }
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 150px 500px 2fr;
  justify-items: center;
  align-items: center;
`;

const ResultTitle = styled.div`
  width: 90%;
  font-weight: bold;
  height: 50px;
  font-size: 25px;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  border-color: rgb(2, 90, 77);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
`;

const RaderBox = styled.div`
  @media screen and (max-width: 768px) {
    width: 85%;
  }
  @media screen and (max-width: 530px) {
    width: 80%;
  }
  width: 500px;
  margin-top: 0px;
  height: 400px;
`;

const DescriptionBox = styled.div`
  width: 85%;
  display: grid;
  grid-template-rows: 90px 2fr 4fr;
  align-items: center;
  justify-items: center;
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
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  grid-gap: 0px;
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
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #dfdfdf;
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
const RecommendedMusicBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 770px) {
    flex-direction: column;
  }
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
  cursor: pointer;
`;

const RetryAndShareBox = styled.div`
  font-weight: bold;
  width: 90%;
  height: 60px;
  margin: 10px 0px 100px 0px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
