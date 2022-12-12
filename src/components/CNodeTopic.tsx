import React, { FC, useState, useCallback } from "react";
import { cNodeSearchTabs } from "../common/cnode";
import { topicDataType } from ".././common/type";
import { Tabs, PopCombo, Label, Pagination, Typography } from "@fineui/react";
import { formatVisitDate } from "../utils/formatVisitDate";
import styles from "./CNodeTopic.module.scss";

interface Props {
  topicData: topicDataType[];
  getHomePageData: (currentTab: string, pageValue: number) => void;
}

const { TabPane } = Tabs;
const { Link } = Typography;
const CNodeTopic: FC<Props> = ({ topicData, getHomePageData }) => {
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [tabValue, setTabValue] = useState(cNodeSearchTabs[0].key);

  const changePagination = useCallback(
    (page) => {
      getHomePageData(tabValue, page);
      setPageCurrent(page);
    },
    [getHomePageData, setPageCurrent, tabValue]
  );

  const onChangeTab = useCallback(
    (key: string) => {
      const curTab = cNodeSearchTabs.find((item) => item.key === key)?.key;
      setTabValue(curTab);
      //  切换tab的话返回第一页
      getHomePageData(curTab, 1);
      setPageCurrent(1);
    },
    [setTabValue, getHomePageData]
  );

  return (
    <div className={styles["main-content-left"]}>
      <div className={styles["cnode-tab"]}>
        <Tabs defaultActiveKey={tabValue} onChange={onChangeTab}>
          {cNodeSearchTabs.map((item) => {
            return <TabPane tab={item.label} key={item.key}></TabPane>;
          })}
        </Tabs>
      </div>
      <div className={styles["main-content-container"]}>
        {topicData.map((item) => {
          return (
            <div className={styles["main-content-topic"]} key={item.id}>
              <div className={styles["main-content-user"]}>
                <PopCombo
                  trigger="hover"
                  overlay={() => {
                    return <Label height={20}>{item.author.loginname}</Label>;
                  }}
                  width={100}
                  style={{
                    marginTop: "-5px",
                    marginLeft: "-35px",
                  }}
                  placement="bottom"
                >
                  <div
                    onClick={() => {
                      window.location.href = `https://cnodejs.org/user/${item.author.loginname}`;
                    }}
                  >
                    <img
                      src={item.author.avatar_url}
                      height="30"
                      width="30"
                      alt=""
                    />
                  </div>
                </PopCombo>
              </div>
              <div className={styles["main-content-topic-count"]}>
                <span className={styles["main-content-topic-reply-text"]}>
                  {item.reply_count}
                </span>
                /
                <span className={styles["main-content-topic-visit-text"]}>
                  {item.visit_count}
                </span>
              </div>
              <div className={styles["main-content-topic-tag"]}>
                {item.top && (
                  <div className={styles["main-content-topic-good-title"]}>
                    置顶
                  </div>
                )}
                {!item.top && item.good && (
                  <div className={styles["main-content-topic-good-title"]}>
                    精华
                  </div>
                )}
                {!item.top && !item.good && (
                  <div className={styles["main-content-topic-common-title"]}>
                    {
                      cNodeSearchTabs.find(
                        (tabItem) => tabItem.key === item.tab
                      ).label
                    }
                  </div>
                )}
              </div>
              <div className={styles["main-content-topic-link"]}>
                <Link
                  href={`https://cnodejs.org/topic/${item.id}`}
                  target="_blank"
                >
                  {item.title}
                </Link>
              </div>
              <div className={styles["main-content-topic-last-reply"]}>
                <span>{formatVisitDate(item.last_reply_at)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles["main-content-pagination"]}>
        {topicData.length > 0 && (
          <Pagination
            current={pageCurrent}
            defaultPageSize={40}
            total={746}
            onChange={changePagination}
          />
        )}
      </div>
    </div>
  );
};

export default CNodeTopic;
