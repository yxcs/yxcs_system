const formatTime = (dateTime, type = 1) => {
  const dt = new Date(dateTime);
  const y = dt.getFullYear();
  let m = dt.getMonth() + 1;
  let d = dt.getDate();
  let H = dt.getHours();
  let M = dt.getMinutes();
  let S = dt.getSeconds();
  if (m < 10) {
    m = `0${m}`;
  }
  if (d < 10) {
    d = `0${d}`;
  }
  if (H < 10) {
    H = `0${H}`;
  }
  if (M < 10) {
    M = `0${M}`;
  }
  if (S < 10) {
    S = `0${S}`;
  }
  if (type === 1) {
    return `${y}-${m}-${d} ${H}:${M}:${S}`
  } else if (type === 2) {
    return `${y}年${m}月${d}日 ${H}:${M}:${S}`
  }

  return `${y}年${m}月${d}日`
}

export default {
  formatTime
}