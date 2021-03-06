import Helper from '../Helper';
import MyTime from '../MyTime';
import Socket from '../Socket';
import SocketEventName from './SocketEventName';
const MySocket = {
    // EMIT
    emitSignIn: function (user) {
        Socket.emit(SocketEventName.signIn, { user });
    },
    emitSignOut: function (user) {
        Socket.emit(SocketEventName.signOut, { user });
    },
    emitGetOnlineUsers: function () {
        Socket.emit(SocketEventName.getOnlineUsers);
    },
    emitUpdateUserById: function (id) {
        Socket.emit(SocketEventName.updateUser, { id });
    },
    emitSendMessage: function (user, message, conversationId) {
        Socket.emit(SocketEventName.sendMessage, { user, message, conversationId });
    },
    emitTyping: function (user, conversationId) {
        Socket.emit(SocketEventName.typing, { user, conversationId });
    },
    emitStopTyping: function (username, conversationId) {
        Socket.emit(SocketEventName.stopTyping, { username, conversationId });
    },
    emitJoinUsersToConversation: function (ids, conversationId) {
        Socket.emit(SocketEventName.joinUsersToConversation, { ids, conversationId });
    },
    emitJoinRoom: function (roomName) {
        Socket.emit(SocketEventName.joinRoom, { roomName });
    },
    emitLeaveRoom: function (roomName) {
        Socket.emit(SocketEventName.leaveRoom, { roomName });
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
    onNewOnlineUser: function (callback) {
        Socket.on(SocketEventName.newOnlineUser, callback);
    },
    onOnlineUserLeft: function (callback) {
        Socket.on(SocketEventName.onlineUserLeft, callback);
    },

    onUpdateUser: function (callback) {
        Socket.on(SocketEventName.updateUser, callback);
    },
    onReceiveMessage: function (callback) {
        Socket.on(SocketEventName.receiveMessage, callback);
    },
    onOnlineUsers: function (callback) {
        Socket.on(SocketEventName.onlineUsers, callback);
    },
    onTyping: function (callback) {
        Socket.on(SocketEventName.typing, callback);
    },
    onStopTyping: function (callback) {
        Socket.on(SocketEventName.stopTyping, callback)
    },

    // NOTIFICATION
    onNewMessageNotification: function (callback) {
        Socket.on(SocketEventName.newMessageNotification, callback)
    },

    // FRIEND ACTIONS
    onFriendAccepted: function (callback) {
        Socket.on(SocketEventName.friendAccepted, callback)
    },
    onFriendRequested: function (callback) {
        Socket.on(SocketEventName.friendRequested, callback)
    },
    onFriendUnFriend: function (callback) {
        Socket.on(SocketEventName.friendUnfriend, callback)
    },
    onFriendRequestCanceled: function (callback) {
        Socket.on(SocketEventName.friendRequestCanceled, callback)
    },
    onFriendRejected: function (callback) {
        Socket.on(SocketEventName.friendRejected, callback)
    },
    off: function (eventName) {
        Socket.off(eventName);
    },
}
export default MySocket