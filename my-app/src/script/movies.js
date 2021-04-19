import endpoint from './endpoint';
import axios from "axios";

export default async function getMovies() {
    try {
        let moviesData = await axios.get(`${endpoint}movies`);
        return moviesData.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}