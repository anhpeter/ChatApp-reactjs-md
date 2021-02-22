import Helper from '../Helper';
import MyTime from '../MyTime';
import Socket from '../Socket';
import SocketEventName from './SocketEventName';
const MySocket = {
    // EMIT
    emitConnected: function (user) {
        Socket.emit(SocketEventName.join, { user });
    },
    emitGetOnlineUsers: function () {
        Socket.emit(SocketEventName.getOnlineUsers);
    },
    emitUpdateUserById: function (id) {
        Socket.emit(SocketEventName.updateUser, { id });
    },
    emitLeave: function (user) {
        Socket.emit(SocketEventName.leave, { user });
    },
    emitSendMessage: function (user, message) {
        Socket.emit(SocketEventName.sendMessage, { user, message, time: MyTime.getUTCNow() });
    },
    emitTyping: function (user) {
        Socket.emit(SocketEventName.typing, { user });
    },
    emitStopTyping: function (username) {
        Socket.emit(SocketEventName.stopTyping, { username });
    },

    // FRIEND ACTION
    emitAddFriend: function (user, friendId) {
        Socket.emit(SocketEventName.addFriend, { user, friendId });
    },
    emitAcceptFriend: function (user, friendId) {
        Socket.emit(SocketEventName.acceptFriend, { user, friendId });
    },
    emitUnfriend: function (user, friendId) {
        Socket.emit(SocketEventName.unfriend, { user, friendId });
    },
    emitCancelFriendRequest: function (user, friendId) {
        Socket.emit(SocketEventName.cancelFriendRequest, { user, friendId });
    },
    emitDeleteFriendRequest: function (user, friendId) {
        Socket.emit(SocketEventName.deleteFriendRequest, { user, friendId });
    },

    // ON
    onUpdateUser: function (callback) {
        Socket.on(SocketEventName.updateUser, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onReceiveMessage: function (callback) {
        Socket.on(SocketEventName.receiveMessage, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },

    onOnlineUsers: function (callback) {
        Socket.on(SocketEventName.onlineUsers, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onNewJoiner: function (callback) {
        Socket.on(SocketEventName.newJoiner, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onTyping: function (callback) {
        Socket.on(SocketEventName.typing, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onStopTyping: function (callback) {
        Socket.on(SocketEventName.stopTyping, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onUserLeft: function (callback) {
        Socket.on(SocketEventName.userLeft, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },

    // FRIEND ACTIONS
    onFriendAccepted: function (callback) {
        Socket.on(SocketEventName.friendAccepted, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onFriendRequested: function (callback) {
        Socket.on(SocketEventName.friendRequested, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onFriendUnFriend: function (callback) {
        Socket.on(SocketEventName.friendUnfriend, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onFriendRequestCanceled: function (callback) {
        Socket.on(SocketEventName.friendRequestCanceled, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    onFriendRejected: function (callback) {
        Socket.on(SocketEventName.friendRejected, (data) => {
            if (Helper.isFn(callback)) callback(data);
        })
    },
    off: function (eventName) {
        Socket.off(eventName);
    }
}
export default MySocket