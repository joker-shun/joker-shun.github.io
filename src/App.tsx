import React, { useState, useCallback } from "react";
import { useMount } from "ahooks";
import { Spin } from "@fineui/react";
import { apiGetHomePageTopic } from "./apis/homePage";
import { cNodeSearchTabs } from "./common/cnode";
import CNodeTitle from "./components/CNodeTitle";
import CNodeTopic from "./components/CNodeTopic";
import CNodePane from "./components/CNodePane";
import styles from "./App.module.scss";

const App = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [topicData, setTopicData] = useState<any[]>([]);
  const [isFetchingHomePage, setIsFetchingHomePage] = useState<boolean>(false);
  const getHomePageData = useCallback(
    async (currentTab = cNodeSearchTabs[0].key, pageValue = 1) => {
      const params = {
        page: pageValue,
        tab: currentTab,
        limit: 40,
      };
      try {
        setIsFetchingHomePage(true);
        const res = await apiGetHomePageTopic(params);
        if (res.success) {
          setTopicData(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetchingHomePage(false);
      }
    },
    [setTopicData]
  );

  useMount(() => {
    getHomePageData();
  });

  return (
    <div className={styles.App}>
      <header className={styles["App-header"]}>
        <CNodeTitle searchValue={searchValue} setSearchValue={setSearchValue} />
      </header>
      <main className={styles["main-content"]}>
        <Spin size="large" spinning={isFetchingHomePage}>
          <CNodeTopic topicData={topicData} getHomePageData={getHomePageData} />
        </Spin>
        <CNodePane />
      </main>
    </div>
  );
};

export default App;
