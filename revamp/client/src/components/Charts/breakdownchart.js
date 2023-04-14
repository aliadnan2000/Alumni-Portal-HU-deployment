
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";

  let students = 0;
  let CS = 0;
  let CND = 0; 
  let SDP = 0;
  let CE = 0;
  let CH = 0;
  let EE = 0;

const sumData = {
  studentsByCategory: {
    CS: CS,
    CND: CND,
    SDP: SDP,
    CE: CE,
    EE: EE,
    CH: CH,
  },
  studentsTotal: students,
};

export function useGetStudentQuery() {
  return { data: sumData, isLoading: false };
}

const BreakdownChart = ({ isDashboard = false, majData}) => {
  //const { data = { studentsByCategory: {} }, isLoading = false } = useGetStudentQuery();
  const theme = useTheme();
  const isLoading = false;
  if(majData){
    
  for (var key of Object.keys(majData)) {
    if(parseInt(majData[key].batch) <= 2023) {
      sumData.studentsTotal++;
      if(majData[key].major === "CS")  {
        sumData.studentsByCategory.CS++;
      }
      else if(majData[key].major === "CND")  {
        sumData.studentsByCategory.CND++;
      }
      else if(majData[key].major === "SDP")  {
        sumData.studentsByCategory.SDP++;
      }
      else if(majData[key].major === "CE")  {
        sumData.studentsByCategory.CE++;
      }
      else if(majData[key].major === "CH")  {
        sumData.studentsByCategory.CH++;
      }
      else if(majData[key].major === "EE")  {
        sumData.studentsByCategory.EE++;
      }
    }
    
  }
  
}
const data = sumData;
  const colors = [  "#EB73B1",
  "#EBDE7F",
  "#C567EB",
  "#52EB50",
  "#745BEB",
  "#EB504E"
];
const formattedData = Object.entries(data.studentsByCategory).map(
  ([category, major], i) => ({
    id: category,
    label: category,
    value: major,
    color: colors[i],
  })
);


  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ResponsivePie
          data={formattedData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: "#a6a9be",
                },
              },
              legend: {
                text: {
                  fill: "#ffe3a3",
                },
              },
              ticks: {
                line: {
                  stroke: "#ffe3a3",
                  strokeWidth: 1,
                },
                text: {
                  fill: "#ffe3a3",
                },
              },
            },
            legends: {
              text: {
                fill: "#ffe3a3",
              },
            },
            tooltip: {
              container: {
                color: "#4d547d",
              },
            },
          }}
          colors={{ datum: "data.color" }}
          margin={
            isDashboard
              ? { top: 40, right: 80, bottom: 100, left: 50 }
              : { top: 40, right: 80, bottom: 80, left: 80 }
          }
          sortByValue={true}
          innerRadius={0.45}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={!isDashboard}
          arcLinkLabelsTextColor={"#4d547d"}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 55,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#ffffff",
                },
              },
            ],
          },
        ]}
      />
      )}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={"#111111"}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total Alumni:"} {data.studentsTotal}
        </Typography>
      </Box>
    </Box>

  );
};

export default BreakdownChart;

