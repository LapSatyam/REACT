import axios from "axios";

export const getData = async (page) => {
    const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=25`,
    );

    return response.data;
};