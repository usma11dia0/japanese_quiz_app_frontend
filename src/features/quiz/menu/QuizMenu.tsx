import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { PrimaryButton } from "../../../components/button/PrimaryButton";

export const QuizMenu: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h2" mt="0.2vh">
        日本語
      </Typography>
      <Typography variant="h2" mt="1.5vh">
        同音異義語クイズ
      </Typography>

      <PrimaryButton
        onClick={() => navigate("/quizzes/questions")}
        customSx={{ marginTop: "6vh" }}
      >
        聞き分け練習
      </PrimaryButton>

      <PrimaryButton
        onClick={() => navigate("/quizzes/pronunciation")}
        customSx={{ marginTop: "6vh" }}
      >
        発声練習
      </PrimaryButton>
    </>
  );
};
