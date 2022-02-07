import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import MusicBox from "Component/MusicBox";

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

const SearchBox = styled.div`
  width: 100%;
  height: 10%;
  background-color: beige;
  display: grid;
  grid-template-columns: 5fr 1fr;
`;
