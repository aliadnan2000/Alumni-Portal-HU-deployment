import React from "react";
import { Box } from "@mui/material";
import BarChart from "../Charts/barchart";

const barchart = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Box mt="40px" height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default barchart;
