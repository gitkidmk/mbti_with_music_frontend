import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

async function searchMusic(q: string, setMusicList: Function) {
  try {
    const response = await axios.get("/music/search", {
      params: {
        music_name: q,
      },
    });
    setMusicList(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
}

const MusicRecPage = () => {
  const [musicName, setMusicName] = useState("");
  const [musicList, setMusicList] = useState([]);
  // recoil에서 mbti 결과 가져오기
  // MusicBox 재활용하기
  // popup 구성

  // const title = music.snippet.title;
  // const description = music.snippet.description;
  // const thumbnailURL = music.snippet.thumbnails.high.url;
  // const videoId = music.id.videoId;

  console.log(musicList);
  return (
    <>
      <SearchBox>
        <input
          type={"text"}
          value={musicName}
          onKeyPress={(e) => {
            e.key === "Enter" && searchMusic(musicName, setMusicList);
          }}
          onChange={(e) => setMusicName(e.target.value!)}
        ></input>
        <button
          onClick={() => {
            searchMusic(musicName, setMusicList);
          }}
        >
          검색
        </button>
      </SearchBox>
    </>
  );
};

export default MusicRecPage;

const SearchBox = styled.div`
  width: 100%;
  height: 10%;
  background-color: beige;
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
  & > input {
    border-radius: 5px;
    font-size: 15px;
    height: 90%;
  }
  & > button {
    font-weight: bold;
    font-size: 20px;
    width: 100%;
    height: 90%;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: rgb(2, 90, 77);
    color: white;
  }
`;
