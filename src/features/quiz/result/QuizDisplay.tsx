import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

import { selectSelectedAnswerChoice } from "../quizSlice";
import { useAudio } from "../../../hooks/useAudio";
import { SoundIcon } from "../../../components/button/SoundIcon";
import styles from "./QuizDisplay.module.css";

export const QuizDisplay = () => {
  const selectedChoice = useSelector(selectSelectedAnswerChoice);
  const { playAudio } = useAudio();
  const rows = [
    { item: "設問", data: selectedChoice.quiz_question_text },
    { item: "正答", data: selectedChoice.choice_text },
    { item: "音声", data: selectedChoice.audio_choice_src },
    { item: "画像", data: selectedChoice.image_choice_src },
    { item: "解説", data: selectedChoice.answer_explanation },
  ];

  if (selectedChoice.quiz === "") {
    return null;
  }

  return (
    <>
      <h2>詳細画面</h2>
      <Table className={styles.table}>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item}>
              <TableCell align="center" className={styles.table_head}>
                <strong>{row.item}</strong>
              </TableCell>
              <TableCell align="center">
                {row.item === "音声" ? (
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
                ) : row.item === "画像" ? (
                  <img
                    src={`${row.data}`}
                    alt="音階画像データ"
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
    </>
  );
};
