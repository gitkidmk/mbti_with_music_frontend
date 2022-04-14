import styled from "styled-components";
import { ReactComponent as ThumbsUp } from "Asset/image/thumbsUp.svg";
import { useRecoilState } from "recoil";
import { thumbsUpState } from "Store/stateStore";

type ModalProps = {
  isThumbsUped: number; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};
const Modal = ({ isThumbsUped }: ModalProps) => {
  const [thumbsUp, setThumbsUp] = useRecoilState<number | null>(thumbsUpState);
  const passMessage = "노래를 추천했어요!😍👍";
  const failMessage = "추천을 이미 하셨어요~🙌✨";
  const errorMessage = "서버에 문제가 발생했어요...👀";
  return (
    <ModalOuterBox>
      <ModalBox id={thumbsUp?.toString()}>
        <ThumbsUp fill="#ffffff" style={{ height: "100px", width: "100px" }} />
        <MessageBox>
          {isThumbsUped === 1
            ? passMessage
            : isThumbsUped === 0
            ? failMessage
            : errorMessage}
        </MessageBox>
        <CloseButton onClick={() => setThumbsUp(null)}>OK</CloseButton>
      </ModalBox>
    </ModalOuterBox>
  );
};

const ModalOuterBox = styled.div`
  width: 100vw;
  height: 90vh;
  background: #ffffff9e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
`;

const ModalBox = styled.div`
  width: 50vw;
  height: 200px;
  background: ${(props) =>
    props.id === "1" ? "rgb(243 105 105 / 82%)" : "rgb(105 141 243 / 82%)"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  font-weight: bold;
  font-size: 20px;
`;

const MessageBox = styled.div`
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background-color: white;
  border-radius: 10px;
  color: black;
  font-size: 20px;
  font-weight: bold;
`;
export default Modal;
