import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import darami from "Asset/image/darami.png";

const HomeImage = styled.img`
  width: 200px;
  margin: 10% 20px 20px 20px;
  border-style: solid;
  border-radius: 10px;
  border-width: 3px;
  border-color: rgb(2, 90, 77);
`;

const StartButton = styled.button`
  border-radius: 10px;
  width: 200px;
  height: 10%;
  color: white;
  font-size: 20px;
  font-weight: bold;
  background-color: rgb(2, 90, 77);
  line-height: 26px;
  cursor: pointer;
`;

function Home() {
  let navigate = useNavigate();
  return (
    <>
      <HomeImage alt="home-image" src={darami} />
      <StartButton onClick={() => navigate(`question-and-answer`)}>
        MBTI with Music <br />
        시작하기
      </StartButton>
    </>
  );
}

export default Home;
