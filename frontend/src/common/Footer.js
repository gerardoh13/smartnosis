import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="right" position="absolute" bottom="10px">
      {"Powered by "}
      <Link color="inherit" href="https://smartnosismd.com/">
        {"Smartnosis LLC."}
      </Link>{" "}
      {"All Rights Reserved. Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default Footer;
