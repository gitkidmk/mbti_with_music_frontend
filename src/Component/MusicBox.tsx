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

export default MusicBox;

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

const ThumbsUpImage = styled.img`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / 3;
  grid-column: 1 / 2;
`;

const ThumbsUpCount = styled.div``;
