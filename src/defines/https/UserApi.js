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
    }
}
export default UserApi;