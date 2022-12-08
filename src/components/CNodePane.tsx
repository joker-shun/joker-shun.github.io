import React from "react";
import { Button, Typography } from "@fineui/react";
import { noReplyTopic, topScoreTopic } from "../common/cnode";
import styles from "./CNodePane.module.scss";
interface Props {
  topicData: any[];
  getHomePageData: (currentTab: string, pageValue: number) => void;
}

const { Link } = Typography;
const visitTopScore = () => {
  window.location.href = "https://cnodejs.org/users/top100";
};
const CNodePane: FC<Props> = () => {
  return (
    <div className={styles["main-content-right"]}>
      <div className={styles["cnode-login"]}>
        <p className={styles["cnode-login-introduction"]}>
          CNode: Node.js专业中文社区
        </p>
        <div className={styles["cnode-login-operator"]}>
          <p>
            您可以
            <a href="/">登录</a>或<a href="/">注册</a>
          </p>
          <div className={styles["main-content-right-login"]}>
            <Button level="common">通过gitHub登录</Button>
          </div>
        </div>
      </div>
      <div className={styles["cnode-reply"]}>
        <div className={styles["cnode-reply-title"]}>
          <div className={styles["cnode-reply-title-text"]}>无人回复的话题</div>
        </div>
        {noReplyTopic.map((item) => {
          return (
            <div className={styles["cnode-reply-topic"]} key={item.link}>
              <Link href={item.link} target="_blank">
                {item.label}
              </Link>
            </div>
          );
        })}
      </div>
      <div className={styles["cnode-score"]}>
        <div className={styles["cnode-score-title"]}>
          <div className={styles["cnode-score-title-text"]}>
            <span>积分榜</span>
            <span
              className={styles["cnode-score-topic-link"]}
              onClick={visitTopScore}
            >{`Top100 >>`}</span>
          </div>
        </div>
        {topScoreTopic.map((item) => {
          return (
            <div className={styles["cnode-score-topic"]} key={item.author}>
              <div className={styles["cnode-score-visit-number"]}>
                {item.visitNumber}
              </div>
              <div
                className={styles["cnode-score-topic-link"]}
                onClick={() => {
                  window.location.href = item.link;
                }}
              >
                {item.author}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles["cnode-group"]}>
        <div className={styles["cnode-group-title"]}>
          <div className={styles["cnode-group-title-text"]}>
            <span>友情社区</span>
          </div>
        </div>
        <div className={styles["cnode-group-title-image"]}>
          <img
            src="https://static2.cnodejs.org/public/images/ruby-china-20150529.png"
            width="150"
            height="50"
            alt=""
          />
        </div>
        <div className={styles["cnode-group-title-image"]}>
          <img
            src="https://static2.cnodejs.org/public/images/golangtc-logo.png"
            width="150"
            height="50"
            alt=""
          />
        </div>
        <div className={styles["cnode-group-title-image"]}>
          <img
            src="https://static2.cnodejs.org/public/images/phphub-logo.png"
            width="150"
            height="50"
            alt=""
          />
        </div>
      </div>
      <div className={styles["cnode-group"]}>
        <div className={styles["cnode-group-title"]}>
          <div className={styles["cnode-group-title-text"]}>
            <span>客户端二维码</span>
          </div>
        </div>
        <div className={styles["cnode-group-title-image"]}>
          <img
            src="https://static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU"
            width="200"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CNodePane;
