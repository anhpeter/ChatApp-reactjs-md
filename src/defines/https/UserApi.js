import Axios from "axios";
import { API_ADDRESS } from "../Config";

const prefix = `${API_ADDRESS}/user`;

const UserApi = {
    findByUsername: async function (username) {
        const data = await Axios.get(`${prefix}/getUserByUsername`, {
            params: {
                username
            }
        })
        return data.data;
    },
    findByUsernameAndPassword: async function (username, password) {
        const data = await Axios.post(`${prefix}/getUserByUsernameAndPassword`, { username, password })
        return data.data;
    },
    createAccount: async function (username, password) {
        const data = await Axios.post(`${prefix}/createAccount`, { username, password })
        return data.data;
    },
    findAllFriendsByUsername: async function (username) {
        const data = await Axios.get(`${prefix}/getFriendsByUsername`, {
            params: {
                username
            }
        })
        return data.data;
    },
    findSentRequestFriendById: async function (id) {
        const data = await Axios.get(`${prefix}/getSentRequestFriendById`, {
            params: {
                id
            }
        })
        return data.data;
    },
    findStrangerByUsername: async function (username) {
        const data = await Axios.get(`${prefix}/getStrangerByUsername`, {
            params: {
                username
            }
        })
        return data.data;
    },

    // FRIEND
    sentFriendRequest: async function (id, friendId) {
        const data = await Axios.post(`${prefix}/sentFriendRequest`, { id, friendId });
        return data.data;
    },
    unfriend: async function (id, friendId) {
        const data = await Axios.post(`${prefix}/unfriend`, { id, friendId });
        return data.data;
    },
    cancelFriendRequest: async function (id, friendId) {
        const data = await Axios.post(`${prefix}/cancelFriendRequest`, { id, friendId });
        return data.data;
    },
    deleteFriendRequest: async function (id, friendId) {
        const data = await Axios.post(`${prefix}/deleteFriendRequest`, { id, friendId });
        return data.data;
    },
    confirmFriendRequest: async function (id, friendId) {
        const data = await Axios.post(`${prefix}/confirmFriendRequest`, { id, friendId });
        return data.data;
    },
    findUsersByIds: async function (ids) {
        const data = await Axios.post(`${prefix}/getUsersByIds`, { ids });
        return data.data;
    },
    findReceivers: async function (username, exceptIds) {
        const data = await Axios.post(`${prefix}/getReceivers`, {
            username, exceptIds,
        });
        return data.data;
    },
    findFriends: async function (type, userId) {
        return [];
    },
}
export default UserApi;