export function screen(key) {
    switch (key) {
      case "1":
        return "星期一";
        break;
      case "2":
        return "星期二";
        break;
      case "3":
        return "星期三";
        break;

      case "4":
        return "星期四";
        break;

      case "5":
        return "星期五";
        break;

      case "6":
        return "星期六";
        break;
      case "7":
        return "星期日";
        break;
      default:
        return "";
        break;
    }
  }

  export function setItemDate(sum) {
    let count = sum / 2;
    let mCount = Math.ceil(count);
    if (sum % 2 == 0) {
      return `${count - 1}:30~${count}:00`;
    } else {
      return `${mCount - 1}:00~${mCount - 1}:30`;
    }
  }