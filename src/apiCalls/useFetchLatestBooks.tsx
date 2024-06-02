import axios from "axios";
import { useQuery } from "react-query";

type Response = {
    results: {
        lists: Array<{
            books: Array<{
                book_image: string,
                title: string
            }>
        }>
    }
}
const URL = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.REACT_APP_MY_API_KEY}`;

const fetchLatestBooks = async (): Promise<Response> => {
    const { data } = await axios.get<Response>(URL);
    return data;
}

export const useFetchLatestBooks = () => {
    const { data, error, isLoading, isSuccess } = useQuery(['fetchLatestBooks'], fetchLatestBooks);
    return { data, error, isLoading, isSuccess };
}