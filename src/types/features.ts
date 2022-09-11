/* AuthSlice.tsx */
export interface LOGIN_USER {
  id: number;
  username: string;
}
//fileを扱うための型定義
export interface FILE extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
export interface PROFILE {
  id: number;
  user_profile: number;
}
// CRED:CREDENTIALの略
export interface CRED {
  username: string;
  password: string;
}
export interface JWT {
  refresh: string;
  access: string;
}
export interface USER {
  id: number;
  username: string;
}
export interface AUTH_STATE {
  isLoginView: boolean;
  loginUser: LOGIN_USER;
  error: string | null | undefined;
}
export interface ValidationErrors {
  detail: string;
  username: string[];
  password: string[];
}

/* quizSlice.tsx */
export interface READ_CHOICE {
  quiz: string; //question_id (foreign_key)
  quiz_question_text: string;
  choice_text: string;
  choice_alphabet: string;
  answer_explanation: string;
  image_choice_src: string;
  audio_choice_src: string;
  created_at: string;
  updated_at: string;
  is_correct?: boolean;
}
export interface READ_QUIZ {
  question_id: string;
  question_text: string;
  created_at: string;
  updated_at: string;
}
export interface QUIZ_STATE {
  choices: READ_CHOICE[];
  selectedQuestionChoices: READ_CHOICE[];
  selectedAnswerChoice: READ_CHOICE;
  selectedCard: SELECT_CARD;
  isloading: boolean;
  score: number;
  resultPronunciation: RESULT_PRONUNCIATION;
}
export interface SELECT_CARD {
  right?: boolean;
  left?: boolean;
}
export interface RESULT_PRONUNCIATION {
  result: string;
  proba: number;
  isJudging: boolean;
}
export interface UPLOAD_DATA {
  audioBlob: BlobPart;
  choiceText: string;
}
