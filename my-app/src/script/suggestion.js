import endpoint from './endpoint';
import axios from "axios";

export default async function getSuggestion(userId) {
    try {
        let suggestionData = await axios.get(`${endpoint}suggest?user=${userId}`);
        return suggestionData.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}