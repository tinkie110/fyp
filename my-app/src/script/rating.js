import endpoint from './endpoint';
import axios from "axios";

export default async function update_rating(userId, movieId, rating) {
    try {
        let msgResponse = await axios.post(`${endpoint}rating?user=${userId}&movie=${movieId}&rating=${rating}`);
        return msg.data;
    } catch (error) {
        console.log(error);
        return 'failed';
    }
}