function dateFormat(date: Date) {
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return date.getFullYear().toString().substring(2) + month + day;
}

export { dateFormat };
