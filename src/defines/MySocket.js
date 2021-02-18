import Helper from './Helper';
import MyTime from './MyTime';
import Socket from './Socket';
const MySocket = {
    emitConnected: function (user) {
        Socket.emit('john', { user });
    },
    emitLeave: function (user) {
        Socket.emit('leave', { user });
    },
    emitSendMessage: function (username, message) {
        Socket.emit('send-message', { username, message, time: MyTime.getUTCNow() });
    },
    onReceiveMessage: function (callback) {
        Socket.on('receive-message', (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onOnlineUsers: function (callback) {
        Socket.on('onlineUsers', (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
}
export default MySocket