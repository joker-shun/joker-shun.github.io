import request from "../utils/request";

export const apiGetHomePageTopic = (params) => {
  return request({
    url: "/topics",
    method: "get",
    params,
  });
};
