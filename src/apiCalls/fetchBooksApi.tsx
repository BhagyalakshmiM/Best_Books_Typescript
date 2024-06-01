import axios from "axios";

interface Response {
    lists: []
}

const fetchLatestBooks = async (): Promise<Response[]> => {
    const { data } = await axios.get<Response[]>(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=Q1oI6D81usjZ0Qo42s4PyIu8OeyEQnBc`);
    console.log(data, process.env.PRIVATE_API_KEY);
    return data
}

export default fetchLatestBooks;