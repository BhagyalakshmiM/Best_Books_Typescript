import axios from "axios";
import { ImageObjectProp } from "../Types/types";
import { useQuery } from "react-query";

type Response = {
    results: {
        lists: Array<{
            books: Array<ImageObjectProp>
        }>
    }
}
const URL = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.REACT_APP_MY_API_KEY}`;

const fetchLatestBooks = async (): Promise<Response> => {
    const { data } = await axios.get<Response>(URL);
    return data;
}

export const useFetchLatestBooks = () => {
    const { data, isLoading, isSuccess, isError, refetch } = useQuery({queryKey: ['fetchLatestBooks'], queryFn: fetchLatestBooks, refetchOnWindowFocus: false});
    return { data, isLoading, isSuccess, isError, refetch };
}