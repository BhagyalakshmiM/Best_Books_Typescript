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
  // getting both favlist and booklist from redux store
  const favBookList = useAppSelector(state => state.booListStore.bookFavoriteList);
  const list = useAppSelector(state => state.booListStore.bookList);
  // making api call
  const { data, isLoading, isSuccess, isError, refetch } = useFetchLatestBooks();
  const [latestBooksList, setLatestBooksList] = useState<Array<ImageObjectProp> | []>();
  const [secondPage, setSecondPage] = useState(false);

  // rendering components based status of api call (Error, loader, data)
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
  // on success setting the data to be displayed in UI
  useEffect(() => {
    if (isSuccess) {
      let bookList: Array<ImageObjectProp>[] = [];
      data?.results?.lists.forEach((ele) => bookList.push(ele.books));
      getUniqueBookList(bookList.flat());
    }
  }, [isSuccess]);

  // There were some repeated elements in books list from api, creating unique list
  // there were few repetitive isbn number so used combination of author and title to get unique list
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