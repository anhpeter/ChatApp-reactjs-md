import Helper from './Helper';
import MyTime from './MyTime';
import Socket from './Socket';
const MySocket = {
    // EMIT
    emitConnected: function (user) {
        Socket.emit('john', { user });
    },
    emitLeave: function (user) {
        Socket.emit('leave', { user });
    },
    emitSendMessage: function (user, message) {
        Socket.emit('send-message', { user, message, time: MyTime.getUTCNow() });
    },
    emitTyping: function (user) {
        console.log(`${user} typing`);
        Socket.emit('typing', { user });
    },
    emitStopTyping: function (username) {
        Socket.emit('stop-typing', { username });
    },
    // ON
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
    onNewJoiner: function (callback) {
        Socket.on('new-joiner', (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onTyping: function (callback) {
        Socket.on('typing', (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onStopTyping: function (callback) {
        Socket.on('stop-typing', (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onUserLeft: function (callback) {
        Socket.on('user-left', (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
}
export default MySocket