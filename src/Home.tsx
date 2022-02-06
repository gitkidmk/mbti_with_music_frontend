import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeImage = styled.img`
  width: 80%;
  height: 60%;
  margin: 20px;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  border-color: rgb(2, 90, 77);
`;

const StartButton = styled.button`
  border-radius: 10px;
  width: 80%;
  height: 10%;
  color: white;
  font-size: 20px;
  font-weight: bold;
  background-color: rgb(2, 90, 77);
`;

function Home() {
  let navigate = useNavigate();
  return (
    <>
      <HomeImage alt="home-image" />
      <StartButton onClick={() => navigate(`question-and-answer`)}>
        시작하기
      </StartButton>
    </>
  );
}

export default Home;
