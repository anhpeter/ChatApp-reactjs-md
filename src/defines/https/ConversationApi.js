import Axios from "axios";
import { API_ADDRESS } from "../Config";
import Helper from "../Helper";
import MySocket from '../Socket/MySocket';

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
    findConversationByMemberIds: async function (ids) {
        const data = await Axios.post(`${prefix}/getConversationByMemberIds`, {
            ids
        });
        return data.data;
    },
    findSidebarConversationById: async function (id) {
        const data = await Axios.get(`${prefix}/getSidebarConversationById`, {
            params: {
                id
            }
        });
        return data.data;
    },
    listConversationsForListDisplay: async function (id) {
        const data = await Axios.get(`${prefix}/listConversationsForListDisplay`, {
            params: {
                id
            }
        });
        return data.data;
    },
    findConversationInfoByUserIdsOrCreateIfNotExist: async function (ids) {
        const data = await Axios.post(`${prefix}/getConversationInfoByUserIdsOrCreateIfNotExist`, { ids });
        return data.data;
    },
    getHomeConversation: async function () {
        const data = await Axios.get(`${prefix}/home`);
        return data.data;
    },
    createConversationWithMemberIds: async function (ids, messageParams = null) {
        const data = await Axios.post(`${prefix}/createConversationWithMemberIds`, { ids, messageParams });
        return data.data;
    }
}
export default ConversationApi;