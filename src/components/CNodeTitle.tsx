import React, { FC } from "react";
import { Editor, VerticalLayout } from "@fineui/react";
import { menuLink } from "../common/cnode";
import styles from "./CNodeTitle.module.scss";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
}
const CNodeTitle: FC<Props> = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles["cnode-title"]}>
      <div className={styles["cnode-title-search"]}>
        <div className={styles["cnode-icon"]}>
          <a href="/">
            <img
              src="//static2.cnodejs.org/public/images/cnodejs_light.svg"
              alt="网不好"
            />
          </a>
        </div>
        <div className={styles["cnode-input"]}>
          <VerticalLayout vgap={10}>
            <Editor.SearchEditor
              height={30}
              width={200}
              value={searchValue}
              watermark={"请输入内容"}
              onChange={(v) => {
                setSearchValue(v);
              }}
              onEnter={(e) => {
                console.log(e);
              }}
            />
          </VerticalLayout>
        </div>
      </div>
      <div className={styles["cnode-title-menu"]}>
        {menuLink.map((item) => {
          return (
            <div key={item.label} className={styles["cnode-title-menu-link"]}>
              <a
                href={item.href}
                target="_blank"
                className={styles["link-label"]}
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CNodeTitle;
