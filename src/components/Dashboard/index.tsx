import { useEffect, useState } from "react";
import SearchInput from "../../Common/SearchInput";
import ThumbNailList from "./ThumbNailList";
import { useFetchLatestBooks } from "../../apiCalls/useFetchLatestBooks";
import { useAppSelector } from "../../Redux/hooks";
import { ImageObjectProp } from "../../Types/types";
import styles from './index.module.css'
import BookBestSellersList from "../../Common/BookBestSellersList";

type PageProps = {
  pageName: string;
}

const DashboardPage = ({ pageName }: PageProps) => {
  const favBookList = useAppSelector(state => state.booListStore.bookFavoriteList);
  const list = useAppSelector(state => state.booListStore.bookList);
  const { data, error, isLoading, isSuccess } = useFetchLatestBooks();
  const [latestBooksList, setLatestBooksList] = useState<Array<ImageObjectProp> | []>();
  const [secondPage, setSecondPage] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      let bookList: Array<ImageObjectProp>[] = [];
      data?.results?.lists.forEach((ele) => bookList.push(ele.books));
      getUniqueBookList(bookList.flat());
    }
  }, [isSuccess]);

  const getUniqueBookList = (list: Array<ImageObjectProp>) => {
    const prods = list.filter((value, index, array) => index == array
      .findIndex(item => item.primary_isbn13 == value.primary_isbn13));
    setLatestBooksList(prods);
  }
  return (
    <div className={styles.Wrapper}>
      {!secondPage ?
        <><SearchInput placeholder='What books would you like to find?' />
          <ThumbNailList linkName="New York Times Bestsellers" imageListProp={latestBooksList || []} pageChanged={setSecondPage} />
          <ThumbNailList linkName="Favorites" imageListProp={favBookList} /></>
        : <BookBestSellersList setPage={setSecondPage} title="New York Times Bestsellers" list={list} favBookList={favBookList} />}
    </div>
  );
};

export default DashboardPage;