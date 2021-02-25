import Axios from "axios";
import { API_ADDRESS } from "../Config";

const prefix = `${API_ADDRESS}/conversation`;

const ConversationApi = {
    findConversationById: async function (id) {
        const data = await Axios.get(`${prefix}/getConversationById`, {
            params: {
                id
            }
        });
        return data.data;
    },
    findConversationIdByUserIdsOrCreateIfNotExist: async function (ids) {
        const data = await Axios.post(`${prefix}/getConversationIdByUserIdsOrCreateIfNotExist`, { ids });
        return data.data;
    },
    getHomeConversation: async function () {
        const data = await Axios.get(`${prefix}/home`);
        return data.data;
    }
}
export default ConversationApi;