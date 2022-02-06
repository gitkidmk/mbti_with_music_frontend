import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import great from "Asset/image/great.png";

import styled from "styled-components";

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
`;

const ThumbsUpCount = styled.div``;

const ThumbsUpImage = styled.img`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / 3;
  grid-column: 1 / 2;
`;
const SearchBox = styled.div`
  width: 100%;
  height: 10%;
  background-color: beige;
  display: grid;
  grid-template-columns: 5fr 1fr;
`;
const SearchResult = styled.div`
  width: 100%;
  height: 10%;
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

const MusicBox = ({ music, mbti }: { music: any; mbti: string }) => {
  const title = music.snippet.title;
  const description = music.snippet.description;
  const thumbnailURL = music.snippet.thumbnails.high.url;
  const videoId = music.id.videoId;
  return (
    <SearchResult>
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
        <ThumbsUpCount></ThumbsUpCount>
      </ThumbsUpBox>
    </SearchResult>
  );
};

const UserRecommendation = () => {
  const [musicName, setMusicName] = useState("");
  const [result, setResult] = useState([]);
  const [mbti, setMBTI] = useState("");
  let location: any = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      console.log(location.state.result);
      setMBTI(location.state.result.MBTI_result.top_result);
    }
  }, [location]);

  async function searchMusic(q: string) {
    try {
      const response = await axios.get("/music/search", {
        params: {
          music_name: q,
        },
      });
      console.log(response);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SearchBox>
        <input
          type={"text"}
          value={musicName}
          onChange={(e) => setMusicName(e.target.value!)}
        ></input>
        <button onClick={() => searchMusic(musicName)}>search</button>
      </SearchBox>
      {result.map((r: any) => {
        return <MusicBox music={r} mbti={mbti} />;
      })}
    </>
  );
};

export default UserRecommendation;
