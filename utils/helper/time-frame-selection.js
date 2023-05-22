//Time frame Selection:
function getDateRangeOffset(dateRange) {
  switch (dateRange) {
    case "1week":
      return 7;
    case "1month":
      return 30;
    case "3months":
      return 90;
    case "6months":
      return 180;
    case "1year":
      return 365;
    default:
      return 7;
  }
}
module.exports = getDateRangeOffset;