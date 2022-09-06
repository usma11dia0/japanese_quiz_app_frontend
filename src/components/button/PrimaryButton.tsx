import { FC } from "react";

import { BUTTON_PROPS } from "../../types/components";
import styles from "./PrimaryButton.module.css";

export const PrimaryButton: FC<BUTTON_PROPS> = (props) => {
  const { children, onClick, customSx } = props;
  return (
    <div className={styles.button} onClick={onClick} style={customSx}>
      {children}
    </div>
  );
};
