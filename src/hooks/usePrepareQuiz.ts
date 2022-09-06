import { useState } from "react";
import { READ_CHOICE } from "../types/features";

export const usePrepareQuiz = () => {
  const [targetChoices, setTargetChoices] = useState<READ_CHOICE[]>();
  const [targetAnswer, setTargetAnswer] = useState<READ_CHOICE>();

  const prepareQuiz = (candidateChoices: READ_CHOICE[], stateIndex: number) => {
    if (candidateChoices[0].quiz !== "") {
      const tmpAnswerChoice = candidateChoices[stateIndex];
      let tmpTargetChoices: READ_CHOICE[] = [tmpAnswerChoice];

      //answerChoiceと同じ発音の同音異義語をchoicesより抽出
      for (const choice of candidateChoices) {
        if (
          choice["quiz_question_text"] ===
            tmpAnswerChoice["quiz_question_text"] &&
          choice["choice_alphabet"] !== tmpAnswerChoice["choice_alphabet"]
        ) {
          tmpTargetChoices.push(choice);

          //tmpTargetChoices内をシャッフル
          //(常に右側(indexが低い側)が答えの選択となってしまうのを防ぐため)
          for (let i = tmpTargetChoices.length - 1; 0 < i; i--) {
            let r = Math.floor(Math.random() * (i + 1));
            var tmp = tmpTargetChoices[i];
            tmpTargetChoices[i] = tmpTargetChoices[r];
            tmpTargetChoices[r] = tmp;
          }
        }
      }
      setTargetAnswer(tmpAnswerChoice);
      setTargetChoices(tmpTargetChoices);
    }
  };
  return { targetChoices, targetAnswer, prepareQuiz };
};
