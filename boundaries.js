function getDate(string) {
  let [_, month, day, year] =
    /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
console.log(getDate("100-1-30000")); // 2999-12-01T00:00:00.000Z
