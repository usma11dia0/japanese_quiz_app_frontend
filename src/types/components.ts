import { ReactNode } from "react";

export interface BUTTON_PROPS {
  children?: ReactNode;
  customSx?: STYLE_PROPATY;
  status?: string;
  onClick?: () => void;
}

export interface CARD_PROPS {
  children: ReactNode;
  customSx?: STYLE_PROPATY;
  imgSrc?: string;
  isCorrect?: boolean;
  isClicked?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  // onClick?: () => void;
}

export interface SCOREBOARD_PROPS {
  children: ReactNode;
  customSx?: STYLE_PROPATY;
  onClick?: () => void;
}

export interface PROGBAR_PROPS {
  customSx: STYLE_PROPATY;
}

export interface STYLE_PROPATY {
  [propaty: string]: string | number;
}
