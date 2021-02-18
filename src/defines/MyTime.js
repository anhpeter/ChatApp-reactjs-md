const MyTime = {

    getUTCNow: function () {
        var now = new Date();
        var time = now.getTime();
        var offset = now.getTimezoneOffset();
        offset = offset * 60000;
        return time - offset;
    }
}
export default MyTime;