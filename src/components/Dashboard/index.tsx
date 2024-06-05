import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
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
  const { data, isLoading, isSuccess, isError, refetch } = useFetchLatestBooks();
  const [latestBooksList, setLatestBooksList] = useState<Array<ImageObjectProp> | []>();
  const [secondPage, setSecondPage] = useState(false);

  const getComponent = () => {
    let ele;
    if (isSuccess) {
      ele = (<>
        <ThumbNailList linkName="New York Times Bestsellers" refetchAPI={refetch} imageListProp={latestBooksList || []} pageChanged={setSecondPage} />
        <ThumbNailList linkName="Favorites" imageListProp={favBookList} />
      </>);
    } else if (isLoading) {
      ele = (<div className={styles.LoadErrorContainer}><CircularProgress /></div>);
    } else if (isError) {
      ele = (<div className={styles.LoadErrorContainer}>
        <Alert severity="error" variant="filled" action={<Button variant="text" size="small" onClick={() => refetch()} sx={{ color: '#ffff', fontWeight: '700'}}>Retry</Button>}>
          Best seller books API call failed
        </Alert>
      </div>);
    }
    return ele;
  }

  useEffect(() => {
    if (isSuccess) {
      let bookList: Array<ImageObjectProp>[] = [];
      data?.results?.lists.forEach((ele) => bookList.push(ele.books));
      getUniqueBookList(bookList.flat());
    }
  }, [isSuccess]);

  const getUniqueBookList = (list: Array<ImageObjectProp>) => {
    const prods = list.filter((value, index, array) => index == array
      .findIndex(item => item.title === value.title && item.author === value.author));
    setLatestBooksList(prods);
  }
  return (
    <div className={styles.Wrapper}>
      {!secondPage ?
        <><SearchInput placeholder='What books would you like to find?' />
          {getComponent()}
        </>
        : <BookBestSellersList setPage={setSecondPage} title="New York Times Bestsellers" list={list} favBookList={favBookList} />}
    </div>
  );
};

export default DashboardPage;