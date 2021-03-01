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
        const { status, payload } = data.data;
        if (status === 'succeeded') {
            const { members, isNew, _id } = payload;
            if (isNew) {
                //const memberIds = Helper.getArrayOfFieldValue(members, '_id', 'string');
                MySocket.emitJoinUsersToConversation(members, _id);
            }
        }
        return data.data;
    },
    getHomeConversation: async function () {
        const data = await Axios.get(`${prefix}/home`);
        return data.data;
    }
}
export default ConversationApi;