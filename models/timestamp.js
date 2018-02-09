module.exports = class Timestamp {

  constructor() {
    this.mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }

  matchExact(r, str) {
    var match = str.match(r);
    return match != null && str == match[0];
  }

  getTimeObjFromDate(date) {
    var d = date.replace(",", "").split(" ")
    var month = this.mL.indexOf(d[0])+1
    var ts = (new Date(month + "." + d[1] + "." + d[2]).getTime() / 1000|0) + 3600
    return {unix: ts, natural: date }
  }

  getTimeObjFromTimestamp(unix_timestamp) {
    var a = new Date(parseInt(unix_timestamp) * 1000)
    var year = a.getFullYear()
    var month = this.mL[a.getMonth()]
    var date = a.getDate()
    return {unix: parseInt(unix_timestamp), natural: month + " " + date + ", " + year}
  }

  getNullTimestamp() {
    return {unix: null, natural: null}
  }

}
