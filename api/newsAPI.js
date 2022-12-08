import axios from "axios";


export const newsApi = {
    getNews() {
        return axios.get("https://638f40a89cbdb0dbe3217472.mockapi.io/api/v1/title")
    },
    getPost(id) {
        return axios.get(`https://638f40a89cbdb0dbe3217472.mockapi.io/api/v1/title/${id}`)
    }
}
