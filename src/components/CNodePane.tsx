import React, { FC } from "react";
import {
  Button,
  Typography,
  VerticalLayout,
  HorizontalLayout,
  Layout,
} from "@fineui/react";
import {
  noReplyTopic,
  topScoreTopic,
  communityImageUrl,
} from "../common/cnode";
import {
  verticalLayoutProps,
  layoutIntroductionProps,
  verticalLoginOperatorProps,
  layoutRightLoginProps,
  layoutTextLoginProps,
  horizontalLayoutProps,
  verticalLayoutReplyProps,
} from "../common/cnodeStyleProps";
import CNodeCommunityItem from "../components/CNodeCommunityItem";
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
      <VerticalLayout {...verticalLayoutProps}>
        <Layout {...layoutIntroductionProps}>CNode: Node.js专业中文社区</Layout>
        <VerticalLayout {...verticalLoginOperatorProps}>
          <Layout {...layoutTextLoginProps}>
            您可以
            <a href="/">登录</a>或<a href="/">注册</a>
          </Layout>
          <Layout {...layoutRightLoginProps}>
            <Button level="common">通过gitHub登录</Button>
          </Layout>
        </VerticalLayout>
      </VerticalLayout>
      <div className={styles["cnode-reply"]}>
        <div className={styles["cnode-reply-title"]}>
          <div className={styles["cnode-reply-title-text"]}>无人回复的话题</div>
        </div>
        {noReplyTopic.map((item) => {
          return (
            <VerticalLayout {...verticalLayoutReplyProps} key={item.link}>
              <Link href={item.link} target="_blank">
                {item.label}
              </Link>
            </VerticalLayout>
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
            <HorizontalLayout {...horizontalLayoutProps} key={item.author}>
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
            </HorizontalLayout>
          );
        })}
      </div>
      <CNodeCommunityItem title={"友情社区"} imageUrl={communityImageUrl} />
      <CNodeCommunityItem
        title={"客户端二维码"}
        imageUrl={"https://static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU"}
      />
    </div>
  );
};

export default CNodePane;
