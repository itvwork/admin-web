const datesec = function(arg) {
    var now = new Date(parseInt(arg) * 1000)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    month = month >= 10 ?
        month :
        '0' + month;
    var date = now.getDate();
    date = date >= 10 ?
        date :
        '0' + date;
    var hour = now.getHours();
    hour = hour >= 10 ?
        hour :
        '0' + hour;
    var minute = now.getMinutes();
    minute = minute >= 10 ?
        minute :
        '0' + minute;
    var second = now.getSeconds();
    second = second >= 10 ?
        second :
        '0' + second;
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}

const date = function(arg) {
    var now = new Date(parseInt(arg) * 1000)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    month = month >= 10 ?
        month :
        '0' + month;
    var date = now.getDate();
    date = date >= 10 ?
        date :
        '0' + date;

    return year + "-" + month + "-" + date;
}
export default {
    datesec,
    date
}
