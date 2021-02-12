import Helper from './Helper';
import Socket from './Socket';
const MySocket = {
    emitConnected: function (user) {
        Socket.emit('john', { user });
    },
    emitLeave: function (user) {
        Socket.emit('leave', { user });
    },
    onOnlineUsers: function (callback) {
        Socket.on('onlineUsers', (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
}
export default MySocket