import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Footer() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      className="text-center fixed-bottom"
      bgcolor="#b3e5fc"
    >
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
