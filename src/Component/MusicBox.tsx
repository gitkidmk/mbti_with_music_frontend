import styled from "styled-components";
import axios from "axios";
import great from "Asset/image/great.png";

// thumbsUpMusic store에 넣기?

async function thumbsUpMusic(
  music_id: string,
  music_name: string,
  thumbnail: string,
  mbti_name: string
) {
  try {
    await axios.post("/music/thumbs-up", {
      music_id: music_id,
      music_name: music_name,
      thumbnail: thumbnail,
      mbti_name: mbti_name,
    });
    console.log("send-perfect");
  } catch (error) {
    console.error(error);
  }
}

const MusicBox = ({
  title,
  description,
  thumbnailURL,
  videoId,
  mbti,
  great_count,
}: any) => {
  return (
    <MusicListBox>
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
        {great_count && <ThumbsUpCount>{great_count}</ThumbsUpCount>}
      </ThumbsUpBox>
    </MusicListBox>
  );
};

export default MusicBox;

const MusicListBox = styled.div`
  width: 90%;
  height: 100px;
  background-color: #00800030;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 2fr 4fr 1fr;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: rgba(2, 90, 77, 0.089);
  color: black;
  align-items: center;
  justify-content: center;
  padding: 10px;
  overflow: hidden;
`;
const ThumbnailImage = styled.img`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / 3;
  grid-column: 1 / 2;
`;
const Title = styled.p`
  height: 100%;
  font-size: 13px;
  font-weight: bold;
  padding: 0px 15px 0px 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  text-overflow: ellipsis;
`;
const Description = styled.div`
  height: 40%;
  font-size: 10px;
  padding: 0px 15px 0px 15px;
  display: flex;
  align-items: center;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  text-overflow: ellipsis;
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

const ThumbsUpImage = styled.img`
  height: 40%;
`;

const ThumbsUpCount = styled.div`
  margin-top: 10px;
`;
