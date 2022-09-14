/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { VoiceIcon } from "../../../components/button/VoiceIcon";
import { ProgBar } from "../../../components/progbar/ProgBar";
import { ChoiceCard } from "../../../components/card/ChoiceCard";
import { AppDispatch } from "../../../app/store";
import { useAudio } from "../../../hooks/useAudio";
import {
  fetchAsyncGetChoices,
  fetchAsyncPostAudio,
  isJudging,
  resetState,
  resetResultPronunciation,
  selectChoices,
  selectAnswerChoice,
  selectSelectedAnswerChoice,
  selectResultPronunciation,
  selectIsLoading,
  incrementScore,
} from "../quizSlice";
import { READ_CHOICE, RESULT_PRONUNCIATION } from "../../../types/features";
import { QuizPronunciationDisplay } from "./QuizPronunciationDisplay";

export const QuizPronunciation = () => {
  const dispatch: AppDispatch = useDispatch();
  const choices: READ_CHOICE[] = useSelector(selectChoices);
  const answerChoice: READ_CHOICE = useSelector(selectSelectedAnswerChoice);
  const resultPronunciation: RESULT_PRONUNCIATION = useSelector(
    selectResultPronunciation
  );
  const isloading = useSelector(selectIsLoading);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { playAudio } = useAudio();
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: false,
      audio: true,
      onStart: () => {
        //stateの初期化
        setIsCorrect(undefined);
        dispatch(resetResultPronunciation());
      },
      onStop: (blobUrl, blob) => {
        dispatch(
          fetchAsyncPostAudio({
            audioBlob: blob,
            choiceText: answerChoice.choice_text,
          })
        );
        dispatch(isJudging());
      },
    });

  // 外部APIよりChoiceデータ読込(初回のみ)
  useLayoutEffect(() => {
    // Stateの初期化
    dispatch(resetState());
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
  }, []);

  // 対象Choice選択 (if文は再レンダリング対策)
  useLayoutEffect(() => {
    if (!isloading && answerChoice.choice_text === "") {
      dispatch(selectAnswerChoice(choices[0]));
    }
  }, [isloading]);

  //onStart&onStopで上手く動作しなかったため代用
  useLayoutEffect(() => {
    if (status === "recording") {
      setTimer(
        setTimeout(() => {
          const targetIcon = document.querySelector<HTMLElement>(".voice-icon");
          targetIcon?.click();
        }, 3000)
      );
    }
    if (status === "stopped") {
      clearTimeout(timer);
    }
  }, [status]);

  //正誤判定
  useLayoutEffect(() => {
    if (resultPronunciation.result !== "") {
      if (resultPronunciation.result === answerChoice.choice_text) {
        setIsCorrect(true);
        dispatch(incrementScore());
        playAudio("../../../../assets/audio/seikai_1.mp3", 0.1);
      } else {
        setIsCorrect(false);
        playAudio("../../../../assets/audio/huseikai_2.mp3", 0.1);
      }
      setTimeout(() => {
        setIsOpen(true);
        playAudio("../../../../assets/audio/bamenntennkann-2.mp3", 0.1);
      }, 2500);
    }
  }, [resultPronunciation.result]);

  if (isloading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={-1.2}>
        問. {answerChoice.choice_text}と正しく発音してください。
      </Typography>
      <Typography variant="h6" mt={0} mb={0}>
        {resultPronunciation.isJudging
          ? "判定中"
          : status === "recording"
          ? "※３秒以内に録音してください"
          : "～ボタンをクリックして録音を開始します～"}
      </Typography>
      <Grid container sx={{ width: "auto" }}>
        {!resultPronunciation.isJudging ? (
          <VoiceIcon
            onClick={status !== "recording" ? startRecording : stopRecording}
            status={status}
            customSx={{
              fontSize: "3.0rem",
              backgroundColor: status !== "recording" ? "#8d6e63" : "#ba2636",
            }}
          />
        ) : (
          ""
        )}
        {status === "recording" ? (
          <ProgBar customSx={{ marginTop: "18px" }} />
        ) : (
          ""
        )}
        {resultPronunciation.isJudging ? (
          <Box mt={1.2} mb={1.2}>
            <CircularProgress />
          </Box>
        ) : (
          ""
        )}
      </Grid>
      <Grid container sx={{ width: "auto" }}>
        <ChoiceCard
          customSx={{ mt: 0.5, width: "20rem", alignItems: "center" }}
          imgSrc={answerChoice.quiz !== "" ? answerChoice.image_choice_src : ""}
          isCorrect={isCorrect}
          isClicked={resultPronunciation.result !== "" ? true : undefined}
        >
          {answerChoice.quiz !== "" ? answerChoice.choice_text : ""}
        </ChoiceCard>
      </Grid>
      <QuizPronunciationDisplay
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mediaBlobUrl={mediaBlobUrl}
      />
    </>
  );
};
