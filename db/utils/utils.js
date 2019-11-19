const formatDates = list => {
  if (list.length === 0) return [];
  return list.map(obj => {
    newObj = { ...obj };
    const newTime = new Date(newObj.created_at);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const year = newTime.getFullYear();
    const month = months[newTime.getMonth()];
    const date = newTime.getDate();
    const hour =
      newTime.getHours() < 10
        ? "0" + newTime.getHours() - 1
        : newTime.getHours() - 1;
    const min =
      newTime.getMinutes() < 10
        ? "0" + newTime.getMinutes()
        : newTime.getMinutes();
    const sec =
      newTime.getSeconds() < 10
        ? "0" + newTime.getSeconds()
        : newTime.getSeconds();
    newObj.created_at = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
    return newObj;
  });
};

const makeRefObj = list => {
  if (list.length === 0) return {};
  const newObj = {};
  list.forEach(obj => {
    newObj[obj.title] = obj.article_id;
    return obj;
  });
  return newObj;
};

const formatComments = (comments, articleRef) => {
  if (comments.length === 0) return [];
  let goodDateComments = formatDates(comments);
  return goodDateComments.map(obj => {
    const newObj = { ...obj };
    newObj.article_id = articleRef[newObj.belongs_to];
    delete newObj.belongs_to;
    newObj.author = newObj.created_by;
    delete newObj.created_by;
    return newObj;
  });
};
module.exports = { formatDates, makeRefObj, formatComments };
