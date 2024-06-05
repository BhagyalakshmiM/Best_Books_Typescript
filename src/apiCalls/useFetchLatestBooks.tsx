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
// API key can be set to node ENV using export REACT_APP_MY_API_KEY=yourkey
const URL = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.REACT_APP_MY_API_KEY}`;

// fetching the latest books using axios and returning data
const fetchLatestBooks = async (): Promise<Response> => {
    const { data } = await axios.get<Response>(URL);
    return data;
}

// used useQuery hook for api call to handle state of api call
export const useFetchLatestBooks = () => {
    const { data, isLoading, isSuccess, isError, refetch } = useQuery({queryKey: ['fetchLatestBooks'], queryFn: fetchLatestBooks, refetchOnWindowFocus: false});
    return { data, isLoading, isSuccess, isError, refetch };
}