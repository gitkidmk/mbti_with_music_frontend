import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  return (
    <>
      <image></image>
      <p>TEST</p>
      <div onClick={() => navigate(`user-recommendation`)}>시작하기</div>
    </>
  );
}

export default App;
