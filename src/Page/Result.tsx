import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ResponsiveRadar } from "@nivo/radar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createData,
  MBTI_description,
  MBTI_unit_description,
} from "Asset/data";
import great from "Asset/image/great.png";
import axios from "axios";

const ResultTitle = styled.div``;

const DescriptionBox = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 6fr;
  align-items: center;
  justify-items: center;
`;

const TopMainDescription = styled.div``;

const TopDescription = styled.div``;

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
  }
`;

const RecommendedMusicBox = styled.div`
  width: 100%;
  height: 50%;
  background-color: #00800030;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 5fr 1fr;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: rgba(2, 90, 77, 0.089);
  color: black;
  align-items: center;
  justify-content: center;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / 3;
  grid-column: 1 / 2;
`;
const Title = styled.div`
  width: 100%;
  height: 100%;
  font-size: 13px;
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 10px;
  overflow: hidden;
  display: flex;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`;
const Description = styled.div`
  width: 100%;
  height: 40%;
  font-size: 10px;
  margin-left: 5px;
  margin-bottom: 10px;
  display: flex;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
`;

const ThumbsUpBox = styled.div`
  width: 100%;
  height: 100%;
  grid-row: 1 / 3;
  grid-column: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ThumbsUpCount = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 2 / 3;
  grid-column: 3 / 4;
`;

const ThumbsUpImage = styled.img`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / 2;
  grid-column: 3 / 4;
`;

const UserMusicRecommendButton = styled.button`
  font-weight: bold;
  width: 100%;
  height: 100%;
  margin: 10px;
  border-radius: 10px;
  background-color: rgb(2, 90, 77);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RetryAndShareBox = styled.div`
  font-weight: bold;
  width: 100%;
  height: 100%;
  margin: 10px;
  border-radius: 5px;
  background-color: #00000073;
  color: rgb(2, 90, 77);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 400px 2fr 0.6fr 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

const Rader = ({ data }: any) => (
  <ResponsiveRadar
    data={createData(data)}
    keys={["result"]}
    indexBy="mbti"
    valueFormat=">-.2f"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    borderColor={{ from: "color" }}
    gridLabelOffset={36}
    dotSize={10}
    dotColor={{ theme: "background" }}
    dotBorderWidth={2}
    colors={{ scheme: "nivo" }}
    blendMode="multiply"
    motionConfig="wobbly"
    legends={[
      {
        anchor: "top-left",
        direction: "column",
        translateX: -50,
        translateY: -40,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: "#999",
        symbolSize: 12,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

async function thumbsUpMusic(
  music_id: string,
  music_name: string,
  thumbnail: string,
  mbti_name: string
) {
  try {
    const response = await axios.post("/music/thumbs-up", {
      music_id: music_id,
      music_name: music_name,
      thumbnail: thumbnail,
      session_id: "aslfkdhsjdkflskdlf",
      mbti_name: mbti_name,
    });
    console.log("send-perfect");
  } catch (error) {
    console.error(error);
  }
}

const RecommendedMusic = ({ music, mbti }: any) => {
  // console.log(music);
  return music.map((m: any) => {
    const j = JSON.parse(m);

    const title = j.music_name;
    const description = j.artist;
    const thumbnailURL = j.thumbnail;
    const videoId = j.music_id;
    const great_count = j.great_count;

    return (
      <RecommendedMusicBox>
        <ThumbnailImage alt="thumbnail" src={thumbnailURL} />
        <Title
          className="title"
          dangerouslySetInnerHTML={{ __html: title }}
          onClick={() =>
            window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
          }
        ></Title>
        <Description
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></Description>
        <ThumbsUpBox>
          <ThumbsUpImage
            alt="thumbs-up-image"
            src={great}
            onClick={() => thumbsUpMusic(videoId, title, thumbnailURL, mbti)}
          />
          <ThumbsUpCount>{great_count}</ThumbsUpCount>
        </ThumbsUpBox>
      </RecommendedMusicBox>
    );
  });
};
const RetryAndShare = () => {
  return <RetryAndShareBox>다시하기/공유하기</RetryAndShareBox>;
};

const ResultDescription = ({ top, unit }: any) => {
  const top_description = MBTI_description[top];
  const unit_description = MBTI_unit_description;
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

const Result = () => {
  const [result, setResult] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {}, []);
  useEffect(() => {
    let r: any = location.state;
    setResult(r.result);
  }, [location]);

  return result !== null ? (
    <ResultDiv>
      <ResultTitle>{result.MBTI_result.top_result}</ResultTitle>
      <Rader data={result.MBTI_result.all_result} />
      <ResultDescription
        top={result.MBTI_result.top_result}
        unit={result.MBTI_result.top_result_detail}
      />
      <RecommendedMusic
        music={result.MBTI_music}
        mbti={result.MBTI_result.top_result}
      />
      <UserMusicRecommendButton
        onClick={() => navigate("/user-recommendation", { state: { result } })}
      >
        MBTI 음악 추천하기
      </UserMusicRecommendButton>
      <RetryAndShare />
    </ResultDiv>
  ) : null;
};

export default Result;
