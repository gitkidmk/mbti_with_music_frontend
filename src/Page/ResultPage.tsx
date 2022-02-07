import styled from "styled-components";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { MBTI_description, MBTI_unit_description } from "Asset/data";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { answerState, questionSetState } from "Store/stateStore";
import Loading from "Component/Loading";
import Rader from "Component/Rader";
import MusicBox from "Component/MusicBox";

const queryClient = new QueryClient();

const ResultDescription = ({ top, unit }: any) => {
  const top_description = MBTI_description[top];
  console.log(top, unit, top[0]);

  // percentage에 따라 UNIT 색깔 다르게 표출

  return (
    <DescriptionBox>
      <TopMainDescription>{top_description[0]}</TopMainDescription>
      <TopDescription>{top_description[1]}</TopDescription>
      <UnitDescBox>
        {unit.map((u: number, index: number) => {
          return (
            <>
              <div id={top[index]} className="unit">
                {top[index]}
              </div>
              <div id={top[index]} className="percentage">
                {Math.round(u * 100)}%
              </div>
              <div id={top[index]} className="description">
                {MBTI_unit_description[top[index]]}
              </div>
            </>
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

  const { isLoading, error, data }: any = useQuery(
    ["getMBTIResult", question_set, answer],
    () => {
      return axios.post("/mbti-results", {
        question_set: question_set,
        answer: answer,
      });
    }
  );

  //TODO: error handing
  return isLoading ? (
    <Loading />
  ) : (
    <ResultDiv>
      <ResultTitle>{data.data.MBTI_result.top_result}</ResultTitle>
      <Rader data={data.data.MBTI_result.all_result} />
      <ResultDescription
        top={data.data.MBTI_result.top_result}
        unit={data.data.MBTI_result.top_result_detail}
      />
      <RecommendedMusicTitle>
        {data.data.MBTI_result.top_result}를 위한 음악😊
      </RecommendedMusicTitle>
      <RecommendedMusic
        music={data.data.MBTI_music}
        mbti={data.data.MBTI_result.top_result}
      />
      <UserMusicRecommendButton
        onClick={() => navigate("/user-recommendation")}
      >
        MBTI 음악 추천하기
      </UserMusicRecommendButton>
      <RetryAndShare />
    </ResultDiv>
  );
};

const ResultPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Result />
    </QueryClientProvider>
  );
};

export default ResultPage;

const ResultDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 400px 2fr 1fr 150px 150px;
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
  grid-template-rows: 1fr 2fr 6fr;
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
  grid-template-columns: 1fr 1fr 4fr;
  align-items: center;
  justify-items: center;
  & > .unit {
    grid-column: 1 / 2;
    font-size: 30px;
    font-weight: bold;
    color: red;
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
