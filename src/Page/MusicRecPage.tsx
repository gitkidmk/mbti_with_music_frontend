import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MusicBox from "Component/MusicBox";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  mbtiResultState,
  musicListState,
  thumbsUpState,
} from "Store/stateStore";
import useFetch from "Component/useFetch";
import Loading from "Component/Loading";
import Modal from "Component/Modal";
import NotFoundPage from "Page/NotFoundPage";
import { Link } from "react-router-dom";

async function searchMusic(q: string, setMusicList: Function) {
  try {
    const response = await axios.get("/musics/search", {
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
  const [musicList, setMusicList] = useRecoilState(musicListState);
  const mbti_result: any = useRecoilValue(mbtiResultState);
  const [thumbsUp] = useRecoilState<number | null>(thumbsUpState);

  const { loading, error } = useFetch(
    "get",
    "/musics/search",
    {
      params: {
        music_name: musicName,
      },
    },
    setMusicList
  );

  return loading ? (
    <Loading />
  ) : error || musicList.musics.length === 0 ? (
    <NotFoundPage err_type="50x" />
  ) : (
    <MusicRecBox>
      <Header>
        <MusicRecTitle>
          <h1>내가 추천하는 {mbti_result.mbti.topType} 음악😍</h1>
        </MusicRecTitle>
        <Link to="/result">{mbti_result.mbti.topType} 결과페이지로</Link>
      </Header>
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
      {thumbsUp === null ? null : <Modal isThumbsUped={thumbsUp} />}
      <MusicListBox id={musicList.musics.length.toString()}>
        {musicList.musics.map((music: any) => (
          <MusicBox
            key={music.music_id}
            title={music.music_name}
            description={music.description}
            thumbnailURL={music.thumbnail}
            videoId={music.music_id}
            mbti={mbti_result.mbti.topType}
            great_count={null}
          />
        ))}
      </MusicListBox>
    </MusicRecBox>
  );
};

export default MusicRecPage;

const MusicRecBox = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 120px 80px calc(90vh - 200px);
  justify-items: center;
  align-items: center;
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const MusicRecTitle = styled.div`
  width: 90%;
  font-weight: bold;
  height: 50px;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  border-color: rgb(2, 90, 77);
  display: flex;
  align-items: center;
  justify-content: center;
  & > h1 {
    @media screen and (max-width: 560px) {
      font-size: 20px;
    }
    @media screen and (max-width: 300px) {
      font-size: 15px;
    }
  }
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
    width: 60%;
  }
  & > button {
    font-weight: bold;
    font-size: 15px;
    width: 80px;
    height: 45%;
    border-radius: 10px;
    background-color: rgb(2, 90, 77);
    color: white;
    width: 20%;
    cursor: pointer;
  }
`;

const MusicListBox = styled.div`
  width: 90%;
  height: calc(90vh - 250px);
  position: relative;
  margin-top: 50px;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  & > div {
    margin-left: 5px;
    margin-right: 5px;
  }
  @media screen and (max-height: 1000px) and (max-width: 765px) {
    & > div {
      margin-left: 0px;
      margin-right: 0px;
    }
  }
`;

const Title = styled.div`
  width: 90%;
  font-weight: bold;
  height: 50px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
`;
