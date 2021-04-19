import endpoint from './endpoint';
import axios from "axios";

export default async function setRating(userId, newRating, movieId) {
    try {
        let result = (await axios.post(`${endpoint}rating?user=${userId}&movie=${movieId}&rating=${newRating}`)).data;
        if (result.localeCompare('success') === 0) {
            console.log("Update rating success");
        } else {
            throw result;
        }
    } catch (error) {
        console.log(error);
    }
}