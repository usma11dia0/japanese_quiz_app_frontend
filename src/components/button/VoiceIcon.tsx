import { FC } from "react";
import { IconButton } from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";
import { BUTTON_PROPS } from "../../types/components";

import styles from "./VoiceIcon.module.css";

export const VoiceIcon: FC<BUTTON_PROPS> = (props) => {
  const { onClick, status, customSx } = props;
  return (
    <IconButton
      aria-label="record-voice"
      // disableRipple={true}
      onClick={onClick}
      className="voice-icon"
    >
      {status !== "recording" ? (
        <KeyboardVoiceIcon
          color="secondary"
          className={styles.voiceIcon}
          sx={customSx}
        />
      ) : (
        <StopIcon
          color="secondary"
          className={styles.voiceIcon}
          sx={customSx}
        />
      )}
    </IconButton>
  );
};
