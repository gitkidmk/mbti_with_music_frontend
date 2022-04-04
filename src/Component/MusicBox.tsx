import styled from "styled-components";
import axios from "axios";
import { ReactComponent as ThumbsUp } from "Asset/image/thumbsUp.svg";
import youTube from "Asset/image/youtube.png";
import { useState, useEffect, useRef } from "react";
import useColorThief, { FormatString } from "use-color-thief";

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
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [stringColor, setStringColor] = useState("#000000");
  const imgRef = useRef<any>();
  // https://lokeshdhakar.com/projects/color-thief/#getting-started
  let googleProxyURL =
    "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

  let test_src = googleProxyURL + encodeURIComponent(thumbnailURL);
  type Types = {
    color: any;
    palette: any;
  };
  const { color, palette }: Types = useColorThief(test_src, {
    format: FormatString.hex,
  });

  useEffect(() => {
    console.log("Color:", color);
    let white = 0xffffff;
    if (color !== null) {
      let now_color = parseInt(color.substr(1), 16);
      console.log(white, now_color, white - Number(now_color));
      let str_color = (white - Number(now_color)).toString(16);
      setStringColor("#" + str_color);
    }
  }, [palette, color]);

  return (
    <MusicListBox id={color?.toString()}>
      <YouTubeLinkBox
        id={mouseIsOver.toString()}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        {mouseIsOver && (
          <YouTubeImage
            id={stringColor}
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${videoId}`,
                "_blank"
              )
            }
          />
        )}
        <ThumbnailImage alt="thumbnail" src={test_src} ref={imgRef} />
        <Title
          className="title"
          dangerouslySetInnerHTML={{ __html: title }}
          id={stringColor}
        ></Title>
        <Description
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
          id={stringColor}
        ></Description>
      </YouTubeLinkBox>
      <ThumbsUpBox>
        <ThumbsUp
          fill={stringColor}
          style={{ height: "50px", width: "50px" }}
          onClick={() => thumbsUpMusic(videoId, title, thumbnailURL, mbti)}
        />
        {great_count && (
          <ThumbsUpCount id={stringColor}>{great_count}</ThumbsUpCount>
        )}
      </ThumbsUpBox>
    </MusicListBox>
  );
};

export default MusicBox;

const MusicListBox = styled.div`
  position: relative;
  width: 90%;
  padding: 10px;
  /* height: 50%; */
  background-color: ${(props) =>
    `${props.id === "null" ? "#00800030" : props.id}`};
  display: grid;
  grid-template-rows: 6fr 1fr;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const YouTubeImage = styled.div`
  position: absolute;
  width: 100%;
  height: 78%;
  z-index: 1;
  background-color: ${(props) => props.id + "55"};
  background-image: url(${youTube});
  background-position: center;
  background-repeat: no-repeat;
`;

const YouTubeLinkBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
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
  color: ${(props) => props.id};
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
  color: ${(props) => props.id};
`;

const ThumbsUpBox = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ThumbsUpCount = styled.div`
  margin-top: 10px;
  color: ${(props) => props.id};
`;
