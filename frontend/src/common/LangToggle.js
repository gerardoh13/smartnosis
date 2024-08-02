import React from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function LangToggle({
  language = "english",
  setLanguage,
  langOptions = ["spanish", "chinese", "armenian"],
}) {
  let options = langOptions.map((lang) => (
    <Button
      variant="dark"
      disabled={language === lang}
      active={language === lang}
      key={lang}
      onClick={() => setLanguage(lang)}
    >
      {lang[0].toUpperCase() + lang.slice(1)}
    </Button>
  ));
  return (
    <ButtonGroup aria-label="Language" size="sm">
      <Button
        variant="dark"
        disabled={language === "english"}
        active={language === "english"}
        onClick={() => setLanguage("english")}
      >
        English
      </Button>
      {options}
    </ButtonGroup>
  );
}

export default LangToggle;
