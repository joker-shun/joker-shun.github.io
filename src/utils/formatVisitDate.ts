import moment from "moment";
export const formatVisitDate = (date) => {
  const now = moment();
  let result: string;
  const dateMoment = moment(date);
  const timeDiff = now.diff(dateMoment, "seconds");
  if (timeDiff < 60) {
    result = `${timeDiff}秒前`;
  } else if (timeDiff < 3600) {
    const timeMinute = Math.ceil(timeDiff / 60);
    result = `${timeMinute}分前`;
  } else if (timeDiff < 3600 * 24) {
    const timeH = Math.ceil(timeDiff / 3600);
    result = `${timeH}小时前`;
  } else if (timeDiff < 3600 * 24 * 30) {
    const timeD = Math.ceil(timeDiff / (3600 * 24));
    result = `${timeD}天前`;
  } else if (timeDiff < 3600 * 24 * 30 * 365) {
    const timeM = Math.ceil(timeDiff / (3600 * 24 * 30));
    result = `${timeM}月前`;
  } else {
    const timeY = Math.ceil(timeDiff / (3600 * 24 * 30 * 365));
    result = `${timeY}年前`;
  }

  return result;
};
