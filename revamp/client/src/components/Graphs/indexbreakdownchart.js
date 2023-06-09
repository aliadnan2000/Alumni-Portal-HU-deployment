import React from "react";
import { Box } from "@mui/material";
import BreakdownChart from "../Charts/breakdownchart";
const BreakDown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default BreakDown;
