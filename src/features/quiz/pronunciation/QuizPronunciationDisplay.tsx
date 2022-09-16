import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { useAudio } from "../../../hooks/useAudio";
import { RESULT_PRONUNCIATION } from "../../../types/features";
import {
  resetState,
  selectResultPronunciation,
  selectScore,
  selectSelectedAnswerChoice,
} from "../quizSlice";
import { SoundIcon } from "../../../components/button/SoundIcon";
import styles from "./QuizPronunciationDisplay.module.css";
import { AppDispatch } from "../../../app/store";

export type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mediaBlobUrl: string | undefined;
};

export const QuizPronunciationDisplay = (props: Props) => {
  const { isOpen, setIsOpen, mediaBlobUrl } = props;
  const score = useSelector(selectScore);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const resultPronunciation: RESULT_PRONUNCIATION = useSelector(
    selectResultPronunciation
  );
  const selectedChoice = useSelector(selectSelectedAnswerChoice);
  const { playAudio } = useAudio();
  const rows = [
    { item: "設問", data: selectedChoice.choice_text },
    { item: "音声", data: selectedChoice.audio_choice_src },
    { item: "画像", data: selectedChoice.image_choice_src },
    { item: "解説", data: selectedChoice.answer_explanation },
  ];

  if (selectedChoice.quiz === "") {
    return null;
  }

  return (
    <>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vh",
            height: "95vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            overflowWrap: "break-word",
            p: 5,
          }}
        >
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              fontWeight="bold"
              component="h2"
              sx={{ mt: 0, ml: 0 }}
            >
              ◇判定　
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h3"
              fontWeight="bold"
              component="h1"
              color={score === 1 ? "#ba2636" : "#00558f"}
              sx={{ mt: 0, ml: 3 }}
            >
              {score === 1 ? `正解` : `不正解`}
            </Typography>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="flex-end"
            justifyContent="center"
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              fontWeight="bold"
              component="h1"
              sx={{ mt: 0, ml: 3 }}
            >
              ■合致率
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h4"
              fontWeight="bold"
              component="h1"
              color={"#3f312b"}
              sx={{ mt: "5vh", ml: 5 }}
            >
              {`${parseFloat(resultPronunciation.proba.toFixed(2))} %`}
            </Typography>
          </Grid>
          <Table className={styles.table} sx={{ mt: "3vh" }}>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.item}>
                  <TableCell align="center" className={styles.table_head}>
                    <strong>{row.item}</strong>
                  </TableCell>
                  <TableCell align="center">
                    {row.item === "音声" ? (
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                      >
                        <Grid item>
                          <Typography variant="subtitle2">回答</Typography>
                          <SoundIcon
                            onClick={() => {
                              playAudio(mediaBlobUrl ? mediaBlobUrl : "", 1.0);
                            }}
                            customSx={{
                              top: "-5px",
                              fontSize: "2.5rem",
                              backgroundColor: "#8d6e63",
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">正答例</Typography>
                          <SoundIcon
                            onClick={() => {
                              playAudio(row.data, 1.0);
                            }}
                            customSx={{
                              top: "-5px",
                              fontSize: "2.5rem",
                              backgroundColor: "#8d6e63",
                            }}
                          />
                        </Grid>
                      </Grid>
                    ) : row.item === "画像" ? (
                      <img
                        src={`${row.data}`}
                        alt="選択肢画像データ"
                        className={styles.img}
                      />
                    ) : (
                      <div>{row.data}</div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid container direction="row" justifyContent="space-evenly">
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setIsOpen(false);
                // store内のRedux stateをリセット
                window.location.reload();
              }}
              sx={{ top: "1.8rem" }}
            >
              <Typography>再挑戦</Typography>
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                navigate("/quizzes/");
                // store内のRedux stateをリセット
                dispatch(resetState());
              }}
              sx={{ top: "1.8rem" }}
            >
              <Typography>戻る</Typography>
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
