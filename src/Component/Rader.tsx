import { ResponsiveRadar } from "@nivo/radar";
import { createData } from "Asset/data";

const Rader = ({ data }: any) => {
  const mbti_data = createData(data);
  return (
    <ResponsiveRadar
      data={mbti_data}
      keys={["result"]}
      indexBy="mbti"
      valueFormat=">-.2f"
      margin={{ top: 70, right: 80, bottom: 50, left: 80 }}
      borderColor={{ from: "color" }}
      gridLabelOffset={36}
      dotSize={5}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={{ scheme: "dark2" }}
      blendMode="darken"
      motionConfig="wobbly"
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "rgb(2,90,77)",
          symbolSize: 25,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Rader;
