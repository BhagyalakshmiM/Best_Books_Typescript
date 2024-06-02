import { useEffect, useState } from "react";
import SearchInput from "../../Common/SearchInput";
import ThumbNailList from "./ThumbNailList";
import { useFetchLatestBooks } from "../../apiCalls/useFetchLatestBooks";
import styles from './index.module.css'

type PageProps = {
  pageName: string;
}

const DashboardPage = ({ pageName }: PageProps) => {
  const { data, error, isLoading, isSuccess } = useFetchLatestBooks();
  const [latestThreeImagesList, setLatestThreeImagesList] = useState<Array<{
    book_image: string,
    title: string
}>| undefined>();
  useEffect(() => { 
    if(isSuccess) {
      let bookList = data?.results?.lists.splice(0,1)[0].books?.splice(0,3);
      setLatestThreeImagesList(bookList);
    }
  },[isSuccess]);
  return (
  <div className={styles.Wrapper}>
    <SearchInput />
    <ThumbNailList linkName="New York Times Bestsellers" imageListProp={latestThreeImagesList || []} />
    <ThumbNailList linkName="Favorites" imageListProp={[]} />
  </div>
  );
};

export default DashboardPage;