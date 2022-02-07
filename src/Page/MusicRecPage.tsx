import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MusicBox from "Component/MusicBox";
import { useRecoilValue } from "recoil";
import { mbtiResultState } from "Store/stateStore";

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
  const mbti_result: any = useRecoilValue(mbtiResultState);
  const mbti = mbti_result.MBTI_result.top_result;

  return (
    <MusicRecBox>
      <MusicRecTitle>내가 직접 추천하는 {mbti} 음악😍</MusicRecTitle>
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
      <MusicListBox id={musicList.length.toString()}>
        {musicList.map((m: any) => {
          return (
            <MusicBox
              title={m.snippet.title}
              description={m.snippet.description}
              thumbnailURL={m.snippet.thumbnails.high.url}
              videoId={m.id.videoId}
              mbti={mbti}
              great_count={null}
            />
          );
        })}
      </MusicListBox>
    </MusicRecBox>
  );
};

export default MusicRecPage;

const MusicRecBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MusicRecTitle = styled.div`
  font-weight: bold;
  width: 90%;
  height: 50px;
  font-size: 25px;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  border-color: rgb(2, 90, 77);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled.div`
  position: relative;
  height: 100px;
  grid-template-columns: 5fr 1fr;
  display: flex;
  align-items: center;
  justify-content: center;
  & > input {
    border-radius: 5px;
    font-size: 18px;
    height: 40%;
  }
  & > button {
    font-weight: bold;
    font-size: 20px;
    width: 80px;
    height: 45%;
    border-radius: 10px;
    background-color: rgb(2, 90, 77);
    color: white;
  }
`;

const MusicListBox = styled.div`
  position: relative;
  height: ${(props) => `${props.id === "0" ? "auto" : "calc(100vh - 200px)}"}`};
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  background: linear-gradient(
    0deg,
    #85a78571,
    white,
    white,
    white,
    white,
    white,
    white,
    white,
    white,
    #85a78571
  );
`;
