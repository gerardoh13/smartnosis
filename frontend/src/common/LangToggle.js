import React from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function LangToggle({ language = "english", setLanguage }) {

  return (
    <ButtonGroup aria-label="Language">
      <Button
        variant="dark"
        disabled={language === "english"}
        active={language === "english"}
        onClick={() => setLanguage("english")}
      >
        English
      </Button>
      <Button
        variant="dark"
        disabled={language === "spanish"}
        active={language === "spanish"}
        onClick={() => setLanguage("spanish")}
      >
        Espanol
      </Button>
      <Button
        variant="dark"
        disabled={language === "chinese"}
        active={language === "chinese"}
        onClick={() => setLanguage("chinese")}
      >
        Chinese
      </Button>
      <Button
        variant="dark"
        disabled={language === "armenian"}
        active={language === "armenian"}
        onClick={() => setLanguage("armenian")}
      >
        Armenian
      </Button>
    </ButtonGroup>
  );
}

export default LangToggle;
