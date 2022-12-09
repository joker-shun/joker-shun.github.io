import React, { FC } from "react";
import styles from "./CNodeCommunityItem.module.scss";

interface Props {
  title: string;
  imageUrl: string | any[];
}

const CNodeCommunityItem: FC<Props> = ({ title, imageUrl }) => {
  return (
    <div className={styles["cnode-group"]}>
      <div className={styles["cnode-group-title"]}>
        <div className={styles["cnode-group-title-text"]}>
          <span>{title}</span>
        </div>
      </div>
      {Array.isArray(imageUrl) ? (
        imageUrl.map((item) => {
          return (
            <div className={styles["cnode-group-title-image"]} key={item}>
              <img src={item} width="200" alt="" />
            </div>
          );
        })
      ) : (
        <div className={styles["cnode-group-title-image"]}>
          <img src={imageUrl} width="200" alt="" />
        </div>
      )}
    </div>
  );
};

export default CNodeCommunityItem;
