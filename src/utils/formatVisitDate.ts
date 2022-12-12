import moment from "moment";
export const formatVisitDate = (date) => {
  const now = moment();
  let result: string;
  const dateMoment = moment(date);
  const timeDiff = now.diff(dateMoment, "seconds");
  const timeMap = {
    秒前: 1,
    分钟前: 60,
    小时前: 3600,
    天前: 3600 * 24,
    个月前: 3600 * 24 * 30,
    年前: 3600 * 24 * 30 * 365,
  };
  let tempKey = "秒前";
  for (const timeKey in timeMap) {
    if (timeDiff / timeMap[timeKey] < 1) {
      result = Math.round(timeDiff / timeMap[tempKey]) + tempKey;
      break;
    }
    tempKey = timeKey;
  }

  return result;
};
