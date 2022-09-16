import { Container, Typography } from "@mui/material";
import { FC, memo } from "react";

import { SCOREBOARD_PROPS } from "../../types/components";
import styles from "./ScoreBoard.module.css";

export const ScoreBoard: FC<SCOREBOARD_PROPS> = memo((props) => {
  const { children } = props;
  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", marginTop: "1vh" }}
    >
      <div className={styles.wrapper}>
        <div className={styles.scorebox}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ margin: "0", padding: "0" }}
          >
            {children}
          </Typography>
        </div>
      </div>
    </Container>
  );
});
