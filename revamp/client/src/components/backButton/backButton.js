import React from "react";
import { useHistory } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const BackButton = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <IconButton
      sx={{ position: "absolute", top: "10px", left: "10px" }}
      onClick={handleBack}
    >
      <ArrowBack />
    </IconButton>
  );
};

export default BackButton;