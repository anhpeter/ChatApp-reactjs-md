import Axios from "axios";
import { API_ADDRESS } from "../Config";

const UserApi = {
    findByUsername: async function (username) {
        const data = await Axios.get(`${API_ADDRESS}/user/getUserByUsername`, {
            params: {
                username
            }
        })
        return data.data;
    },
    findByUsernameAndPassword: async function (username, password) {
        const data = await Axios.get(`${API_ADDRESS}/user/getUserByUsernameAndPassword`, {
            params: {
                username, password
            }
        })
        return data.data;
    },
    createAccount: async function (username, password) {
        const data = await Axios.post(`${API_ADDRESS}/user/createAccount`, { username, password })
        return data.data;
    },
    findAllFriendsByUsername: async function (username) {
        const data = await Axios.get(`${API_ADDRESS}/user/getFriendsByUsername`, {
            params: {
                username
            }
        })
        return data.data;
    },
    findStrangerByUsername: async function (username) {
        const data = await Axios.get(`${API_ADDRESS}/user/getStrangerByUsername`, {
            params: {
                username
            }
        })
        return data.data;
    },

    // FRIEND
    sentFriendRequest: async function (id, friendId) {
        const data = await Axios.post(`${API_ADDRESS}/user/sentFriendRequest`, { id, friendId });
        return data.data;
    },
    findUsersByIds: async function (ids) {
        const data = await Axios.post(`${API_ADDRESS}/user/getUsersByIds`, {ids});
        return data.data;
    },
}
export default UserApi;