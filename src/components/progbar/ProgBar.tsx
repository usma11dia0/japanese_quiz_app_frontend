import { FC } from "react";
import { PROGBAR_PROPS } from "../../types/components";
import styles from "./ProgBar.module.css";

export const ProgBar: FC<PROGBAR_PROPS> = (props) => {
  const { customSx } = props;
  return (
    <>
      <div className={styles.progBar} style={customSx}>
        <p className={styles.bar}></p>
      </div>
    </>
  );
};
