import moment from 'moment'
export const formatVisitDate = (date)=> {
  let now = moment();
  let result: string;
  let dateMoment = moment(date);
  let timeDiff = now.diff(dateMoment, 'seconds');
  if (timeDiff<60) {
    result=`${timeDiff}秒前`
  } else if (timeDiff<3600) {
    // 分钟
    let timeMinute = Math.ceil(timeDiff/60)
    result=`${timeMinute}分前`
  } else if (timeDiff<3600*24) {
    let timeH = Math.ceil(timeDiff / 3600)
    result=`${timeH}小时前`
  } else if (timeDiff<3600*24*30) {
    let timeD = Math.ceil(timeDiff / (3600*24))
    result=`${timeD}天前`
  } else if (timeDiff<3600*24*30*365) {
    let timeM = Math.ceil(timeDiff / (3600*24*30))
    result=`${timeM}月前`
  } else {
    let timeY = Math.ceil(timeDiff / (3600*24*30*365))
    result=`${timeY}年前`
  }
  console.log('result', result)
  return result
}