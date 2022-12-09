import React, { FC, useCallback } from "react";
import styles from "./CNodeJumper.module.scss";

interface Props {
  jumpElementId: string;
  title: string;
}

const CNodeJumper: FC<Props> = ({ jumpElementId, title }) => {
  const jumpTop = useCallback(() => {
    document
      .getElementById(jumpElementId)
      .scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={styles.jumper} onClick={jumpTop}>
      <span>{title}</span>
    </div>
  );
};

export default CNodeJumper;
