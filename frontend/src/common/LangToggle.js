import React from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function LangToggle({
  language = "english",
  setLanguage,
  langOptions = ["english", "spanish", "chinese", "armenian"],
}) {
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
      {langOptions.includes("spanish") ? (
        <>
          <Button
            variant="dark"
            disabled={language === "spanish"}
            active={language === "spanish"}
            onClick={() => setLanguage("spanish")}
          >
            Espanol
          </Button>
        </>
      ) : null}
      {langOptions.includes("chinese") ? (
        <>
          <Button
            variant="dark"
            disabled={language === "chinese"}
            active={language === "chinese"}
            onClick={() => setLanguage("chinese")}
          >
            Chinese
          </Button>
        </>
      ) : null}
      {langOptions.includes("armenian") ? (
        <>
          <Button
            variant="dark"
            disabled={language === "armenian"}
            active={language === "armenian"}
            onClick={() => setLanguage("armenian")}
          >
            Armenian
          </Button>
        </>
      ) : null}
    </ButtonGroup>
  );
}

export default LangToggle;
