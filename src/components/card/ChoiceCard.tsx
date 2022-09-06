import { FC, memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { brown } from "@mui/material/colors";
import { Container } from "@mui/system";

import styles from "./ChoiceCard.module.css";
import { CARD_PROPS } from "../../types/components";

export const ChoiceCard: FC<CARD_PROPS> = memo((props) => {
  const { children, customSx, imgSrc, isCorrect, isClicked, onClick } = props;

  return (
    <Container maxWidth="sm">
      <Card sx={customSx} elevation={4}>
        <CardActionArea onClick={onClick}>
          <div
            className={
              isClicked ? styles.cardClicked + " " + styles.card : styles.card
            }
          >
            <div className={styles.back}>
              <CardMedia
                component="img"
                image={imgSrc}
                alt="choice image"
                sx={{
                  padding: "2em",
                }}
              />
              <CardContent sx={{ color: "white", backgroundColor: brown[400] }}>
                <Typography
                  variant="h5"
                  component="div"
                  textAlign="center"
                  // fontWeight="bold"
                >
                  {children}
                </Typography>
              </CardContent>
            </div>
            <div className={styles.front}>
              <CardMedia
                component="img"
                image={
                  isCorrect === true
                    ? "../../../assets/icon/correct_mark.jpg"
                    : isCorrect === false
                    ? "../../../assets/icon/incorrect_mark.jpg"
                    : "../../../assets/icon/card_default_white.jpg"
                }
                alt="correct_incorrect_icon"
                sx={{
                  padding: "2em",
                }}
              />
              <CardContent
                sx={{
                  color: "white",
                  backgroundColor:
                    isCorrect === true
                      ? "#ba2636"
                      : isCorrect === false
                      ? "#00558f"
                      : "white",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {isCorrect === true
                    ? "正解"
                    : isCorrect === false
                    ? "不正解"
                    : ""}
                </Typography>
              </CardContent>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Container>
  );
});
