import React, { useState, useCallback } from 'react';
import { useMount } from 'ahooks';
import { Editor, VerticalLayout, Tabs, Button, PopCombo, Label, Typography, Spin, Pagination } from '@fineui/react';
import { apiGetHomePageTopic } from './apis/homePage';
import { menuLink, cNodeSearchTabs, noReplyTopic, topScoreTopic } from './common/cnode';
import { formatVisitDate } from './utils/formatVisitDate';
import './App.css';

const { TabPane } = Tabs;
const { Link } = Typography;
let flag = false;
let isFetchingTopicData:boolean = false;
const visitTopScore = ()=> {
  window.location.href = 'https://cnodejs.org/users/top100'
}
const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [topicData, setTopicData] = useState<any[]>([]);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [tabValue, setTabValue] = useState(cNodeSearchTabs[0].key);
  const getHomePageData = useCallback(
    async(currentTab=tabValue, pageValue=pageCurrent) => {
      const params = {
        page: pageValue,
        tab: currentTab,
        limit: 40,
      };
      try {
        isFetchingTopicData=true;
        const res = await apiGetHomePageTopic(params);
        if (res.success) {
          setTopicData(res.data)
        }
        console.log('res:', res)
      } catch (e) {
        console.error(e);
      } finally {
        isFetchingTopicData=false
      }
    },
    [tabValue, setTopicData, pageCurrent]
  );
  const onChangeTab = useCallback((key: string)=> {
    console.log(key);
    const curTab = cNodeSearchTabs.find(item=>item.key===key)?.key;
    setTabValue(curTab);
    //切换tab的话返回第一页
    getHomePageData(curTab, 1);
    setPageCurrent(1)
  },
  [setTabValue, getHomePageData]);

  const changePagination = useCallback((page, pageSize)=> {
    console.log('test', page, pageSize)
    getHomePageData(tabValue, page)
    setPageCurrent(page)
  },
  [getHomePageData, setPageCurrent, tabValue])

  useMount(()=>{
    if (!flag) {
      getHomePageData()
      flag = true
    }
  })
  return (
    <div className="App">
      <header className="App-header">
        <div className='cnode-title'>
          <div className='conde-title-search'>
            <div className='cnode-icon'>
              <a href="/">
                <img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt="网不好" />
              </a>
            </div>
            <div className='cnode-input'>
              <VerticalLayout vgap={10}>
                <Editor.SearchEditor
                  height={30}
                  width={200}
                  value={searchValue}
                  watermark={'请输入内容'}
                  onChange={(v) => {
                    console.log('wwww', v)
                    setSearchValue(v);
                  }}
                  onEnter={
                    (e)=> {
                      console.log(e)
                    }
                  }
                />
              </VerticalLayout>
            </div>
          </div>
          <div className='cnode-title-menu'>
            {
              menuLink.map((item)=> {
                return (
                  <div key={item.label} className='cnode-title-menu-link'>
                    <a href={item.href} target='_blank' className='link-label'>{item.label}</a>
                  </div>
                )
              })
            }
          </div>
        </div>
      </header>
      <main className='main-content'>
        <Spin size='large' spinning={isFetchingTopicData}>
          <div className='main-content-left'>
            <div className='cnode-tab'>
              <Tabs defaultActiveKey={tabValue} onChange={onChangeTab}>
                {
                  cNodeSearchTabs.map((item, index)=>{
                    return (
                      <TabPane tab={item.label} key={item.key}>
                      </TabPane>
                    )
                  })
                }
              </Tabs>
            </div>
            <div className='main-content-container'>
              {
                  topicData.map((item, index)=>{
                    return (
                      <div className='main-content-topic' key={item.id}>
                        <div className='main-content-user'>
                          <PopCombo
                            trigger="hover"
                            overlay={() => {
                              return <Label height={20}>{item.author.loginname
                              }</Label>;
                            }}
                            width={100}
                            style={
                              {
                                marginTop: '-5px',
                                marginLeft: '-35px'
                              }
                            }
                            placement="bottom"
                          >
                            <div onClick={
                              ()=>{
                                window.location.href = 'https://cnodejs.org/user/'+ item.author.loginname
                            }}>
                              <img src={item.author.avatar_url} height="30" width="30" alt="" />
                            </div>
                          </PopCombo>
                        </div>
                        <div className='main-content-topic-count'>
                          <span className='main-content-topic-reply-text'>{item.reply_count}</span>
                          /
                          <span className='main-content-topic-visit-text'>{item.visit_count}</span>
                        </div>
                        <div className='main-content-topic-tag'>
                          {
                            item.top && (
                              <div className='main-content-topic-good-title'>置顶</div>
                            )
                          }
                          {
                            !item.top && item.good && (
                              <div className='main-content-topic-good-title'>精华</div>
                            )
                          }
                          {
                            !item.top && !item.good && (
                              <div className='main-content-topic-common-title'>
                                {
                                  cNodeSearchTabs.find(tabItem=>
                                    tabItem.key === item.tab
                                  ).label
                                }
                              </div>
                            )
                          }
                        </div>
                        <div className='main-content-topic-link'>
                          <Link href={"https://cnodejs.org/topic/"+item.id} target="_blank">
                            {item.title}
                          </Link>
                        </div>
                        <div className='main-content-topic-last-reply'>
                          <span>{formatVisitDate(item.last_reply_at)}</span>
                        </div>
                      </div>

                    )
                  })
              }
            </div>
            <div className='main-content-pagination'>
              {
                topicData.length > 0 &&
                <Pagination
                  current={pageCurrent}
                  defaultPageSize={40}
                  total={746}
                  onChange={changePagination}
                />
              }
            </div>
          </div>
        </Spin>

        <div className='main-content-right'>
          <div className='cnode-login'>
            <p className='cnode-login-introduction'>CNode: Node.js专业中文社区</p>
            <div className='cnode-login-operator'>
              <p>
                您可以
                <a href='/'>登录</a>
                或
                <a href='/'>注册</a>
              </p>
              <div className='main-content-right-login'>
                <Button level="common">通过gitHub登录</Button>
              </div>
            </div>
          </div>
          <div className='cnode-reply'>
            <div className='cnode-reply-title'>
              <div className='cnode-reply-title-text'>无人回复的话题</div>
            </div>
            {
              noReplyTopic.map(item=> {
                return (
                  <div className='cnode-reply-topic' key={item.link}>
                    <Link href={item.link} target="_blank">
                      {item.label}
                    </Link>
                  </div>
                )
              })
            }
          </div>
          <div className='cnode-score'>
            <div className='cnode-score-title'>
              <div className='cnode-score-title-text'>
                <span>积分榜</span>
                <span className='cnode-score-topic-link' onClick={visitTopScore}>{`Top100 >>`}</span>
              </div>
            </div>
            {
              topScoreTopic.map(item=> {
                return (
                  <div className='cnode-score-topic'>
                    <span className='cnode-score-visit-number'>{item.visitNumber}</span>
                    <span className='cnode-score-topic-link' 
                    onClick={()=> {
                      window.location.href = item.link
                    }}>{item.author}</span>
                  </div>
                )
              })
            }
          </div>
          <div className='cnode-group'>
            <div className='cnode-group-title'>
              <div className='cnode-group-title-text'>
                <span>友情社区</span>
              </div>
            </div>
            <div className='cnode-group-title-image'>
                <img src="https://static2.cnodejs.org/public/images/ruby-china-20150529.png" width="150" height="50" alt="" />
            </div>
            <div className='cnode-group-title-image'>
              <img src="https://static2.cnodejs.org/public/images/golangtc-logo.png" width="150" height="50" alt="" />
            </div>
            <div className='cnode-group-title-image'>
              <img src="https://static2.cnodejs.org/public/images/phphub-logo.png" width="150" height="50" alt="" />
            </div>
          </div>
          <div className='cnode-group'>
            <div className='cnode-group-title'>
              <div className='cnode-group-title-text'>
                <span>客户端二维码</span>
              </div>
            </div>
            <div className='cnode-group-title-image'>
                <img src="https://static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU" width="200" alt="" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
